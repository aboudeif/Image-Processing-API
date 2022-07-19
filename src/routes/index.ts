import { error } from 'console';
import express, { RequestHandler } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const routes = express.Router();

const checkImage: RequestHandler = (req ,res ,next) => {
  const { filename } = req.query;
  if(!filename){
    throw new Error('Image name not specified, try to add ?filename=imageName');
  }
  next();
};

const checkSize: RequestHandler = (req ,res ,next) => {
  const { width, height } = req.query;
  if(!width || !height){
    throw new Error('Image size is required, try to add ?width=400&height=400');
  }
  next();
};

const middlewares = [checkImage, checkSize];

routes.get('/images', middlewares, (req: express.Request, res: express.Response): void => {
  
    if(!path.join(__dirname, `../../storage/thumbnail/${req.query.filename}_${req.query.width}x${req.query.height}.jpg`)) {
      
      res.send('image not resized');
    }
    else {
      const image = path.join(__dirname, `../../storage/thumbnail/${req.query.filename}_${req.query.width}x${req.query.height}.jpg`);
      res.sendFile(image);
    }
});


export default routes;