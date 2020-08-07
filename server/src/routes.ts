import express, { response } from 'express';
import db from './database/connection';
import convertHourToMinute from './util/convertHourToMinutes';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classesController.list);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.list);
routes.post('/connections', connectionsController.create);

export default routes;
