import supertest from 'supertest'
import api from '../index'
import path from 'path'
import { getRandomImageInfo, resizeImage } from '../handlers/imageProcess'

const request = supertest(api)

// test the home route
describe('Test endpoint service', (): void => {
  it('should return 200 status code', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

// test image processing
describe('test image processing function', (): void => {
  it('should resize randomlly selected image with random size', async () => {
    const [fileName, extension, width, height] = getRandomImageInfo()
    const image = path.join(__dirname, `../../storage/images/${fileName}.${extension}`)
    const thumb = path.join(__dirname, `../../storage/thumb/${fileName}_${width}x${height}.${extension}`)
    expect(async () => {
      await resizeImage([thumb, image, width, height])
    }).not.toThrow()
  })
})

// test show images list
describe('test show images list', (): void => {
  it('should show images list', async () => {
    const response = await request.get('/api/images')
    expect(response.status).toBe(200)
  })
})

// test show image
describe('test show image', (): void => {
  it('should show image', async () => {
    const [fileName, extension] = getRandomImageInfo()
    const response = await request.get('/api/show?img=' + fileName + '.' + extension)
    expect(response.status).toBe(200)
  })
})
