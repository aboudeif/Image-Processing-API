import express from 'express'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import multer from 'multer'
import {
  checkImage,
  existImage,
  checkSize,
  validSize
} from '../middlewares/middleware'

const routes = express.Router()
const upload = multer({ dest: 'uploads/' })
const middlewares = [checkImage, existImage, checkSize, validSize]

// home page
routes.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../public/home.html'))
})

// resize image then send it to client
routes.get(
  '/images',
  middlewares,
  async (req: express.Request, res: express.Response) => {
    const filename = (req.query.filename as string).split('.')[0]
    const extension = (req.query.filename as string).split('.')[1]
    const thumb = path.join(
      __dirname,
      `../../storage/thumb/${filename}_${req.query.width}x${req.query.height}.${extension}`
    )
    if (!fs.existsSync(thumb)) {
      const image = path.join(
        __dirname,
        `../../storage/images/${req.query.filename}`
      )
      const imageWidth = parseInt(req.query.width as string)
      const imageHeight = parseInt(req.query.height as string)
      sharp(image)
        .resize(imageWidth, imageHeight)
        .toFile(thumb)
        .finally(() => {
          res.sendFile(thumb)
        })
    } else {
      res.sendFile(thumb)
    }
  }
)

// return a list of images names to home.html page
routes.get(
  '/api/images',
  async (req: express.Request, res: express.Response) => {
    const imagesList: string[] = await fs.readdirSync(
      path.join(__dirname, '../../storage/images')
    )
    res.json(imagesList)
  }
)

// return the selected image to home.html page
routes.get('/api/show', async (req: express.Request, res: express.Response) => {
  if (
    fs.existsSync(
      path.join(__dirname, '../../storage/images', `${req.query.img}`)
    )
  ) {
    res.sendFile(
      path.join(__dirname, '../../storage/images', `${req.query.img}`)
    )
  } else {
    res.sendFile(path.join(__dirname, '../../storage/images', `404.jpg`))
  }
})

// upload image to storage/images folder
routes.post('/upload', upload.single('uploaded_file'), function (
  req: express.Request,
  res: express.Response
) {
  const originalname = req.file?.originalname || ('' as string)
  const extension = originalname.split('.').pop()
  //  replace spaces, dots, underscoures with hiphens
  const imageName = originalname.slice(0, -4).replace(/[\s._]/g, '-')
  fs.rename(
    req.file?.path || '',
    path.join(
      __dirname,
      '../../storage/images',
      Date.now() + '-' + imageName + '.' + extension
    ),
    function (err) {
      if (err) throw err
    }
  )
  res.redirect('/')
})

export default routes
