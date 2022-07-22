import express from 'express'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { nextTick } from 'process'

// get the image info from the request
export function getThumbInfo(req: express.Request): string[]{
  const filename = (req.query.filename as string).split('.')[0]
    const extension = (req.query.filename as string).split('.')[1]
    const thumb = path.join(
      __dirname,
      `../../storage/thumb/${filename}_${req.query.width}x${req.query.height}.${extension}`
    )
    const image = path.join(
      __dirname,
      `../../storage/images/${req.query.filename}`
    )
    const width = req.query.width as string
    const height = req.query.height as string
    return [thumb, image, width, height]
}

// get the image info from random image
export function getRandomImageInfo(): string[] {
  // make an array of thumbnail images
  const images = fs.readdirSync(
    path.join(__dirname, '../../storage/images')
  )
  // select random image to be tested
  const randomImage =  images[Math.floor(Math.random() * images.length)]
  // extract parameters from the random image
  const extension = randomImage.split('.')[1]
  const fileName = randomImage.split('.')[0]
  const width = (Math.floor(Math.random() * 800) + 100 as unknown) as string
  const height = (Math.floor(Math.random() * 800) + 100 as unknown) as string
  
  return [fileName, extension, width, height]

}

// resize image and return the path of the new image
export async function resizeImage ([thumb, image, width, height]: string[]): Promise<boolean> {
   await sharp(image)
    .resize(parseInt(width), parseInt(height))
    .toFile(thumb)

    return await fs.existsSync(thumb)
}

// upload image to uploads folder
export function uploadImage(req: express.Request): string{
  const originalname = req.file?.originalname || ('' as string)
  const extension = originalname.split('.').pop()
  const imageName = originalname.slice(0, -4).replace(/[\s._]/g, '-')

  fs.rename(
    req.file?.path || ('' as string),
    path.join(
      __dirname,
      '../../storage/images',
      Date.now() + '-' + imageName + '.' + extension
    ),
    function (err) {
      if (err) return ''
    }
  )
  return 'upload is done'
}