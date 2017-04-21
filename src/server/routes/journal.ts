import { Router } from 'express';
import { startOfToday, startOfTomorrow, addDays } from 'date-fns';
import Journal from '../model/journal';
import { tint, errorHandler, noAccessRightHandler, checkUserIdentity } from '../utils';

const router = Router();

router.use(checkUserIdentity);

// post a new journal
router.post('/', async (req, res) => {
  try {
    const newJournal = Object.assign(new Journal(), req.body);
    const journal = await newJournal.save();

    console.log(`${tint.date()} new journal saved successfully`);
    res.status(201).send({
      success: true,
      result: journal,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

// update a specific journal
router.patch('/:id', async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body);

    console.log(`${tint.date()} journal updated successfully`);
    res.status(201).send({
      success: true,
      result: journal,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

// get a specific user's journal of that day
router.get('/:username', async (req, res) => {
  try {
    const journal = await Journal.findOne({
      username: req.params.username,
      date: {
        $gte: startOfToday(),
        $lt: startOfTomorrow(),
      },
    });

    if (journal) {
      res.status(200).send({
        success: true,
        result: journal,
      });
    } else {
      res.status(200).send({
        success: false,
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

// get all users' journal of that day
router.get('/', async (req, res) => {
  try {
    if (req.cookies.usergroup < 2) {
      return noAccessRightHandler(res);
    }

    const date = new Date(req.query.date);
    const journals = await Journal.find({
      date: {
        $gte: date,
        $lt: addDays(date, 1),
      },
    });

    return res.status(200).send({
      success: true,
      result: journals,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

export default router;
