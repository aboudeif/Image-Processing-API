import express, { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const routes = express.Router();

const checkImage: RequestHandler = (req ,res ,next) => {
  const { filename } = req.query;
  if(!filename || !fs.existsSync(path.join(__dirname, '../../storage/images', `${filename}.jpg`))){
    res.status(404).send('Image not found or missing file name, try to add ?filename=imageName');
  }
  next();
};

const checkSize: RequestHandler = (req ,res ,next) => {
  const { width, height } = req.query;
  if(!width || !height || width.valueOf() < 100 || height.valueOf() < 100){
    res.status(404).send('Image size is missing or not correct, try to add ?width=400&height=400');
  }
  next();
};

const middlewares = [checkImage, checkSize];

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

routes.get('/images', middlewares, async (req: express.Request, res: express.Response) => {
  const thumb = path.join(__dirname, `../../storage/thumb/${req.query.filename}_${req.query.width}x${req.query.height}.jpg`);
    if(!fs.existsSync(thumb)) {
      let image = path.join(__dirname, `../../storage/images/${req.query.filename}.jpg`);
      const imageWidth = parseInt(req.query.width as string);
      const imageHeight = parseInt(req.query.height as string);
      sharp(image)
      .resize(imageWidth, imageHeight)
      .toFile(thumb).finally(() => {
        res.sendFile(thumb);
      });
    }
    else{
    res.sendFile(thumb);
    }
    
    });


export default routes;