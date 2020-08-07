import db from '../database/connection';
import { Request, response, Response } from 'express';

export default class ConnectionsController {
    async list(req: Request, res: Response) {
        const totalConnections = await db('connections').count('* as total');

        const {total} = totalConnections[0];

        return res.json({total})
    }

    async create(req: Request, res: Response) {
        const {
            user_id
        } = req.body;

        await db('connections').insert({
            user_id
        });

        res.status(201).send();
    }
}
