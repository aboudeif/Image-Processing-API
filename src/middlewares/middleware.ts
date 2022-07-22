import express from 'express'
import path from 'path'
import fs from 'fs'

// middleware to check if image is provided
export const checkImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const { filename } = req.query
  if (!filename) {
    res.status(400).send('Missing file name, try to add ?filename=imageName')
  }
  next()
}

// middleware to check if image is exists
export const existImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const filename = req.query.filename as string
  if (
    !fs.existsSync(path.join(__dirname, `../../storage/images/${filename}`))
  ) {
    res.status(417).send('image not found, there is no image with name: '+filename+' , try to upload it first')
  } else {
    next()
  }
}

// middleware to check if image size is provided
export const checkSize = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const { width, height } = req.query
  if (!width || !height) {
    res
      .status(400)
      .send('Image size is missing, try to add ?width=400&height=400')
  }
  next()
}

// middleware to check if image size is equal to or greater than 100x100
export const validSize = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const width = (req.query.width as unknown) as number
  const height = (req.query.height as unknown) as number
  if (width < 100 || height < 100) {
    res.status(417).send('Image size must be greater than or equal to 100x100, try to add ?width=400&height=400')
  }
  next()
}
