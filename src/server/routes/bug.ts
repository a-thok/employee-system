import * as fs from 'fs';
import * as path from 'path';
import { Router } from 'express';
import * as multer from 'multer';
import * as WebSocket from 'ws';
import { startOfTomorrow, addDays, format } from 'date-fns';
import { tint, errorHandler, noAccessRightHandler, checkUserIdentity } from '../utils';
import { wsPort, uploadDir, bugImageDir } from '../../config';
import Bug from '../model/bug';

const formatter = (date: Date) => format(date, 'YYYY-MM-DD');

// establish a WebSocket connection
const ws = new WebSocket.Server({
  port: wsPort,
});

// use multer to handle image uploading
// if the specified dir doesn't exist, create one
const uploadPath = path.join(uploadDir, bugImageDir);
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
// multer settings
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null as any, uploadPath);
  },
  filename(req, file, cb) {
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null as any, filename);
  },
});
const upload = multer({ storage });

// router
const router = Router();

router.use(checkUserIdentity);

// get bug items
router.get('/', async (req, res) => {
  try {
    const { page, size = 10, keyword, ...query } = req.query;

    const searchReg = new RegExp(keyword);
    Object.assign(query, {
      $or: [
        { title: searchReg },
        { desc: searchReg },
      ],
    });

    const [total, items] = await Promise.all([
      Bug.count(query),
      Bug.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * size)
        .limit(+size),
    ]);

    if (keyword) {
      const reg = new RegExp(`(${keyword})`, 'g');
      const str = '<span class="highlight">$1</span>';
      items.forEach((bug) => {
        const { title, desc } = bug;
        bug.title = title.replace(reg, str);
        bug.desc = desc.replace(reg, str);
      });
    }

    res.status(200).send({
      success: true,
      result: {
        total,
        items,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

// get bug statistics
router.get('/stat', async (req, res) => {
  try {
    const { range } = req.query;
    const toDate = startOfTomorrow();
    const fromDate = addDays(toDate, -range);

    const analysis: any = {};
    for (let i = 0; i < range; i++) {
      const date = formatter(addDays(fromDate, i));
      analysis[date] = {
        add: 0,
        resolve: 0,
        close: 0,
      };
    }

    const findBugAndAnalyze = (dateProp: string, type: string) => (
      Bug.find({
        [dateProp]: {
          $gte: fromDate,
          $lt: toDate,
        },
      })
      .then((bugs) => {
        bugs.forEach((bug: any) => {
          const date = formatter(bug[dateProp]);
          analysis[date][type]++;
        });
      })
    );

    const [total, toBeResolve, toBeClose, closed] = await Promise.all([
      Bug.count({}),
      Bug.count({ state: 1 }),
      Bug.count({ state: 2 }),
      Bug.count({ state: 3 }),
      findBugAndAnalyze('createdAt', 'add'),
      findBugAndAnalyze('resolvedAt', 'resolve'),
      findBugAndAnalyze('closedAt', 'close'),
    ]);

    res.status(200).send({
      success: true,
      result: {
        counts: { total, toBeResolve, toBeClose, closed },
        analysis,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

// get a specific bug
router.get('/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id, {
      title: 1,
      project: 1,
      rank: 1,
      category: 1,
      desc: 1,
      images: 1,
    });

    res.status(200).send({
      success: true,
      result: bug,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

// post a new bug
router.post('/', upload.array('files[]', 10), async (req, res) => {
  try {
    const { username: presenter } = req.cookies;
    const newBug = Object.assign(new Bug(), req.body, { presenter });

    if (req.files) {
      (req as any).files.forEach((file: any) => newBug.images.push(`${bugImageDir}/${file.filename}`));
    }

    const bug = await newBug.save();

    console.log(`${tint.date()} new bug saved successfully`);
    res.status(201).send({
      success: true,
    });

    ws.clients.forEach((client) => {
      client.send(JSON.stringify(bug));
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

// update a specific bug
router.patch('/:id', upload.array('files[]', 10), async (req, res) => {
  try {
    let extra;
    switch (req.body.state) {
      case 1:
        extra = {
          $unset: {
            resolver: 1,
            message: 1,
            resolvedAt: 1,
            closedAt: 1,
          },
        };
        break;
      case 2:
        extra = {
          resolver: req.cookies.username,
          resolvedAt: Date.now(),
        };
        break;
      case 3:
        extra = {
          closedAt: Date.now(),
        };
        break;
      default:
        break;
    }

    const updated = { ...req.body, ...extra };

    const { files } = req;
    if (files) {
      const images = updated.images || [];
      const newImage = (files as any).map((file: any) => `${bugImageDir}/${file.filename}`);
      updated.images = images.concat(newImage);
    }

    const bug = await Bug.findByIdAndUpdate(req.params.id, updated, { new: true });

    console.log(`${tint.date()} bug updated successfully`);
    res.status(201).send({
      success: true,
      result: bug,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

// delete a specific bug
router.delete('/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (bug.presenter !== req.cookies.username) {
      return noAccessRightHandler(res);
    }

    await bug.remove();

    console.log(`${tint.date()} bug removed successfully`);
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

export default router;
