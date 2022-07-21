import supertest from 'supertest'
import api from '../index'
import path from 'path'
import fs from 'fs'

const request = supertest(api)

describe('Test endpoint service', () => {
  it('should return 200 status code', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Test images routes', () => {
  it('should show randomly selected thumb', async () => {
    // make an array of thumbnail images
    const images: string[] = await fs.promises.readdir(
      path.join(__dirname, '../../storage/thumb')
    )
    // select random image to be tested
    const randomImage = images[Math.floor(Math.random() * images.length)]
    // extract parameters from the random image
    const extension = randomImage.split('.')[1]
    const fileName = randomImage.split('_')[0]
    const width = randomImage.split('_')[1].split('x')[0]
    const height = randomImage.split('x')[1].split('.')[0]

    const response = await request.get(
      `/images?filename=${fileName}.${extension}&width=${width}&height=${height}`
    )

    expect(response.status).toBe(200)
  })
})

describe('test image processing function', () => {
  it('should resize randomlly selected image with random size', async () => {
    // make an array of thumbnail images
    const images: string[] = await fs.promises.readdir(
      path.join(__dirname, '../../storage/images')
    )
    // select random image to be tested
    const randomImage = images[Math.floor(Math.random() * images.length)]
    // input random size
    const extension = randomImage.split('.')[1]
    const fileName = randomImage.split('.')[0]
    const width = Math.floor(Math.random() * 1000)
    const height = Math.floor(Math.random() * 1000)

    await request.get(
      `/images?filename=${fileName}.${extension}&width=${width}&height=${height}`
    )
    expect(
      fs.existsSync(
        path.join(
          __dirname,
          `../../storage/thumb/${fileName}_${width}x${height}.${extension}`
        )
      )
    ).toBeTruthy()
  })
})
