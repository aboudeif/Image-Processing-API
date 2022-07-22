import express from 'express'
import path from 'path'
import fs from 'fs'
import { errormsg } from '../handlers/errorMessage'

// middleware to check if image is provided
export const checkFileName = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (!req.query.filename || req.query.filename === '') {
    res.status(400).send(errormsg('no image provided', 'missing file name', 'try to use "filename=image-name" in url'))
  } else {
    next()
  }
}

// middleware to check if image is exists
export const existImage = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const filename = req.query.filename as string
  if (!fs.existsSync(path.join(__dirname, `../../storage/images/${filename}`))) {
    res
      .status(400)
      .send(errormsg('image not found', 'there is no image with name: ' + filename, 'try to upload it first'))
  } else {
    next()
  }
}

// middleware to check if image size is provided
export const checkSize = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (!req.query.width || !req.query.height || req.query.width === '' || req.query.height === '') {
    res
      .status(400)
      .send(errormsg('no image size provided', 'missing image width or height', 'try to add width=400&height=400'))
  } else {
    next()
  }
}

// middleware to check if image size is equal to or greater than 100x100
export const validSize = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const width = (req.query.width as unknown) as number
  const height = (req.query.height as unknown) as number
  if (width < 100 || height < 100) {
    res
      .status(400)
      .send(
        errormsg(
          'image size is not valid',
          'image width or height must be greater than or equal to 100',
          'try to add width=100&height=100'
        )
      )
  } else {
    next()
  }
}

// middleware to check if image width and height are numbers
export const sizeIsNumber = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const width = (req.query.width as unknown) as number
  const height = (req.query.height as unknown) as number
  if (isNaN(width) || isNaN(height)) {
    res
      .status(400)
      .send(
        errormsg('image size is not valid', 'image width or height is not a number', 'try to add width=100&height=100')
      )
  } else {
    next()
  }
}
