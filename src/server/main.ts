/* tslint:disable no-var-requires */
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as history from 'connect-history-api-fallback';
import * as compression from 'compression';
import * as mongoose from 'mongoose';

import user from './routes/user';
import bug from './routes/bug';
import journal from './routes/journal';
import { port, secret, database } from '../config';
import { tint } from './utils';

const isProd = process.env.NODE_ENV === 'production';

/**
 * SERVER AND DATABASE BASIC SETTING
 */
const server = express();

server.set('port', port);
server.set('secret', secret);

(mongoose as any).Promise = global.Promise;
mongoose.connect(database)
  .then(() => console.log('Connected to database successfully'))
  .catch(error => console.log(tint.red(error)));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());

server.use(compression());

server.use(history({
  htmlAcceptHeaders: ['text/html'],
}));

if (isProd) {
  server.use(express.static(path.resolve(process.cwd(), 'dist/public')));
}
server.use(express.static(path.resolve(process.cwd(), 'node_modules')));
server.use(express.static(path.resolve(process.cwd(), 'uploads')));

/**
 * ROUTES
 */
server.use('/user', user);
server.use('/bug', bug);
server.use('/journal', journal);

/**
 * WEBPACK MIDDLEWARE FOR FRONT-END DEVELOPMENT
 */
if (!isProd) {
  const webpack = require('webpack');
  const clientConfig = require('../../build/webpack.client');
  const compiler = webpack(clientConfig);

  const devMiddleware = require('webpack-dev-middleware');
  server.use(devMiddleware(compiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
    },
    noInfo: true,
  }));

  const hotMiddleware = require('webpack-hot-middleware');
  server.use(hotMiddleware(compiler));
}

/**
 * START THE SERVER
 */
server.listen(server.get('port'), (err: any) => {
  if (!err) {
    console.log(`Express server listening on port ${tint.cyan(server.get('port'))}`);
  }
});
