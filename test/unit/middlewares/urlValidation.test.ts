import httpMocks from 'node-mocks-http'
import HttpException from '../../../src/errors/HttpException'
import { validateUrl } from '../../../src/middlewares/urlValidation'

let req: any
let res: any
let next: any

beforeEach(async () => {
  req = await httpMocks.createRequest()
  res = await httpMocks.createResponse()
  next = jest.fn()
})

afterAll(async () => {
  jest.clearAllMocks()
})

describe('Testing URL Validation', () => {
  it('should return no error', async done => {
    const url = 'https://www.google.com'
    req.body = { url }
    const validate = await validateUrl(req, res, next)
    expect(validate).toBe(undefined)
    done()
  })

  it('should return error with wrong URL', async done => {
    const url = 'htt://www.google.com'
    req.body = { url }
    try {
      await validateUrl(req, res, next)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toHaveProperty('statusCode', 400)
    }
    done()
  })
})
