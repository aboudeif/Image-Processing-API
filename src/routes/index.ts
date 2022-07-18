import express from 'express';
import api from '../index';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export default routes;