import express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import { checkFileName, existImage, checkSize, sizeIsNumber, validSize } from '../middlewares/middleware'
import { getThumbInfo, resizeImage, uploadImage } from '../handlers/imageProcess'
import { errormsg } from '../handlers/errorMessage'

const routes = express.Router()
const upload = multer({ dest: 'uploads/' })
const middlewares = [checkFileName, existImage, checkSize, sizeIsNumber, validSize]

// home page
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).sendFile(path.join(__dirname, '../../public/home.html'))
})

// resize image then send it to client
routes.get(
  '/images',
  middlewares,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const info = getThumbInfo(req)
    if (!fs.existsSync(info[0])) {
      const response = await resizeImage(info)
      response ? res.status(200).sendFile(info[0]) : res.status(500).send(errormsg('image resize faild', 'could not resize image '+info[1], 'try to resize it again'))
    } else {
      res.status(200).sendFile(info[0])
    }
  }
)

// return a list of images names to home.html page
routes.get('/api/images', (req: express.Request, res: express.Response): void => {
  const imagesList: string[] = fs.readdirSync(path.join(__dirname, '../../storage/images'))
  res.json(imagesList)
})

// return the selected image to home.html page
routes.get('/api/show', (req: express.Request, res: express.Response): void => {
  const image = path.join(__dirname, '../../storage/images', `${req.query.img}`)
  image ? res.status(200).sendFile(image) : res.status(500).send(errormsg('image not found', 'there is no image with name: ' + req.query.img, 'try to upload it first'))
})

// upload image to storage/images folder
routes.post('/upload', upload.single('uploaded_file'), async function (req: express.Request, res: express.Response): Promise<void> {
  const response = uploadImage(req)
  response ? res.redirect('/') : res.status(500).send(errormsg('image upload faild', 'could not upload image', 'try to upload it again'))
} )

// not found page
routes.get('*', (req: express.Request, res: express.Response): void => {
  res.status(404).send(errormsg('page not found', 'there is no path lead to here', `try to back to <a href='/'>home</a> page` ))
})

export default routes
