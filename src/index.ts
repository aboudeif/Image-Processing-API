import express from 'express';
import routes from './routes/index';

const api = express();
const port = 3000;

api.use('/', routes);
api.listen(port)
export default api;