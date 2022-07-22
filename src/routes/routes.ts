import express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import {
  checkImage,
  existImage,
  checkSize,
  validSize
} from '../middlewares/middleware'
import { getThumbInfo, resizeImage, uploadImage } from '../handlers/imageProcess'

const routes = express.Router()
const upload = multer({ dest: 'uploads/' })
const middlewares = [checkImage, existImage, checkSize, validSize]

// home page
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.sendFile(path.join(__dirname, '../../public/home.html'))
})

// resize image then send it to client
routes.get(
  '/images',
  middlewares,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const info = getThumbInfo(req)
    if (!fs.existsSync(info[0])) {
      const response = resizeImage(info)
        await response ? res.sendFile(info[0]) : res.status(500).send('error, cannot resize image')
      } else {
      res.sendFile(info[0])
    }
  }
)

// return a list of images names to home.html page
routes.get(
  '/api/images',
  (req: express.Request, res: express.Response): void => {
    const imagesList: string[] = fs.readdirSync(
      path.join(__dirname, '../../storage/images')
    )
    res.json(imagesList)
  }
)

// return the selected image to home.html page
routes.get('/api/show', (req: express.Request, res: express.Response): void => {
    const image = path.join(__dirname, '../../storage/images', `${req.query.img}`)
    image ? res.sendFile(image) : res.send('image not found')
  })

// upload image to storage/images folder
routes.post('/upload', upload.single('uploaded_file'), function (
  req: express.Request,
  res: express.Response
): void {
  const result = uploadImage(req)
  result ? res.redirect('/') : res.status(500).send('cannot upload image')
})

export default routes
