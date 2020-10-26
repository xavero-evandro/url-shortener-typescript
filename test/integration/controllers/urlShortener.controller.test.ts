import request from 'supertest'
import app from '../../../src/app'
import connection from '../../../src/database/connections'

beforeAll(async () => {
  await connection.create()
})

afterAll(async () => {
  await connection.close()
})

describe('POST /api/v1/', () => {
  it('should get a URL and return a short version of it', async done => {
    const res = await request(app).post('/api/v1/').send({
      url: 'https://www.google.com',
    })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('shortUrl')
    done()
  })

  it('should return 400 with a invalid url parameter', async done => {
    const errorMessage = '{"status":"error","message":{"_original":{"url":"hps://.com"},"details":[{"message":"\\"url\\" must be a valid uri with a scheme matching the https|http pattern","path":["url"],"type":"string.uriCustomScheme","context":{"scheme":"https|http","value":"hps://.com","label":"url","key":"url"}}]}}'
    const res = await request(app).post('/api/v1/').send({
      url: 'hps://.com',
    })
    expect(res.status).toBe(400)
    expect(res.text).toBe(errorMessage)
    done()
  })
})

describe('GET /api/v1/', () => {
  it('should get a shortUrl and return the original URL', async done => {

    const res = await request(app).post('/api/v1/').send({
      url: 'https://www.google.com',
    })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('shortUrl')
    const res2 = await request(app).get('/api/v1/').query({
      url: res.body.shortUrl,
    })
    expect(res2.status).toBe(200)
    expect(res2.body).toHaveProperty('originalUrl')
    done()
  })

  it('should return 400 with a invalid url parameter', async done => {
    const errorMessage = '{"status":"error","message":"Url not Found"}'
    const res = await request(app).get('/api/v1/').send({
      url: 'hps://.com',
    })
    expect(res.status).toBe(404)
    expect(res.text).toBe(errorMessage)
    done()
  })
})
