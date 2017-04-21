import { format } from 'date-fns';
import { RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { secret } from '../config';

interface Colours {
  reset: string;
  [key: string]: string;
}

const colours: Colours = {
  reset: '\x1b[0m',
  hicolor: '\x1b[1m',
  underline: '\x1b[4m',
  inverse: '\x1b[7m',

  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

export const tint = {
  tinted(colour: string, str: any) {
    return colours[colour] + str + colours.reset;
  },
  red(str: string) {
    return this.tinted('red', str);
  },
  green(str: any) {
    return this.tinted('green', str);
  },
  yellow(str: any) {
    return this.tinted('yellow', str);
  },
  blue(str: any) {
    return this.tinted('blue', str);
  },
  magenta(str: any) {
    return this.tinted('magenta', str);
  },
  cyan(str: any) {
    return this.tinted('cyan', str);
  },
  white(str: any) {
    return this.tinted('white', str);
  },
  bgBlack(str: any) {
    return this.tinted('bgBlack', str);
  },
  bgRed(str: any) {
    return this.tinted('bgRed', str);
  },
  bgGreen(str: any) {
    return this.tinted('bgGreen', str);
  },
  bgYellow(str: any) {
    return this.tinted('bgYellow', str);
  },
  bgBlue(str: any) {
    return this.tinted('bgBlue', str);
  },
  bgMagenta(str: any) {
    return this.tinted('bgMagenta', str);
  },
  bgCyan(str: any) {
    return this.tinted('bgCyan', str);
  },
  bgWhite(str: any) {
    return this.tinted('bgWhite', str);
  },
  date() {
    const dateStr = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    return this.tinted('blue', dateStr);
  },
};

export const errorHandler = (res: Response, error: any) => {
  console.log(tint.red(error.message || error));
  res.status(500).send({
    success: false,
    error: '服务器错误，请通知管理员或稍后重试',
  });
};

export const noAccessRightHandler = (res: Response) => {
  res.status(403).send({
    success: false,
    error: '权限不足',
  });
};

export const checkUserIdentity: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, secret, (error: any) => {
      if (error) {
        console.log(tint.red(error.message));
        res.status(401).send({
          success: false,
          error: '授权过期，请尝试重新登陆',
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({
      success: false,
      error: '此操作需要登陆',
    });
  }
};

export const encryptPassword = (password: string) => crypto.createHash('md5').update(password).digest('hex');
