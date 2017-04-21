import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../model/user';
import { secret } from '../../config';
import { tint, errorHandler, noAccessRightHandler, checkUserIdentity, encryptPassword } from '../utils';

const router = Router();

// register a new user
router.post('/', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (user) {
      return res.status(200).send({
        success: false,
        error: '该用户名已被注册',
      });
    }

    // create a new user and save it to database
    const newUser = new User({
      name,
      password: encryptPassword(password),
    });
    await newUser.save();

    console.log(`${tint.date()} new user saved successfully`);
    return res.status(201).send({
      success: true,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

// user log in
router.post('/login', async (req, res) => {
  try {
    const { name, password, remember } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(200).send({
        success: false,
        error: '该用户不存在',
      });
    }

    if (encryptPassword(password) !== user.password) {
      return res.status(200).send({
        success: false,
        error: '密码错误',
      });
    }

    // if the login info is correct, create a token and write it into cookies
    const TWO_DAYS = 60 * 60 * 24 * 2;
    const A_MONTH = 60 * 60 * 24 * 30;
    const expiresIn = remember ? A_MONTH : TWO_DAYS;

    const token = jwt.sign(user, secret, {
      expiresIn,
    });

    const options = remember ? {
      maxAge: expiresIn * 1000, // expiresIn is in seconds, whereas maxAge is in milliseconds
    } : {};
    res.cookie('username', user.name, options);
    res.cookie('usergroup', user.group, options);
    res.cookie('token', token, Object.assign({ httpOnly: true }, options));

    console.log(`${tint.date()} user ${tint.cyan(name)} has logged in`);
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

// user log out
router.get('/logout', (req, res) => {
  try {
    const maxAge = 0;
    res.cookie('username', '', { maxAge });
    res.cookie('usergroup', '', { maxAge });
    res.cookie('token', '', { maxAge, httpOnly: true });

    console.log(`${tint.date()} user ${tint.cyan(req.cookies.username)} has logged out`);
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.use(checkUserIdentity);

// update user password
router.patch('/', async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await User.findOne({
      name: req.cookies.username,
      password: encryptPassword(password),
    });

    if (user) {
      await user.update({ password: encryptPassword(newPassword) });
      console.log(`${tint.date()} user updated successfully`);
      res.status(201).send({
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        error: '当前密码不正确',
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

// get names of all users
router.get('/', async (req, res) => {
  try {
    if (req.cookies.usergroup < 2) {
      return noAccessRightHandler(res);
    }

    const users = await User.find({}, { name: 1 });
    return res.status(200).send({
      success: true,
      result: users.map(user => user.name),
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

export default router;
