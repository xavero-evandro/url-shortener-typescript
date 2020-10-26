import { NextFunction, Request, Response } from 'express'
import * as shortid from 'shortid'
import HttpException from '../errors/HttpException'
import { getMongoRepository } from 'typeorm'
import { UrlShort } from '../models/UrlShort.model'
import { baseUrl } from '../config/baseUrl'

const urlShortRepository = () => getMongoRepository(UrlShort)

const getExistUrl =
  async (originalUrl: string): Promise<UrlShort | undefined> => {

    const existUrl = await urlShortRepository().findOne({ originalUrl })
    return Promise.resolve(existUrl)
  }

const getOriginalUrlByGeneratedId =
  async (shortUrl: string): Promise<UrlShort | undefined> => {
    const existUrl = await urlShortRepository().findOne({
      where: {
        shortUrl: { $eq: shortUrl }
      }
    })
    return existUrl
  }

export const shortUrl =
  async (req: Request, res: Response): Promise<Response | HttpException> => {
    try {
      const { url: originalUrl } = req.body

      const existUrl = await getExistUrl(originalUrl)
      if (existUrl) {
        return res.status(200).json({ shortUrl: existUrl.shortUrl })
      }

      const generatedId = shortid.generate()

      const shortUrl = `${baseUrl}${generatedId}`

      const urlShorted = urlShortRepository().create({ generatedId, originalUrl, shortUrl })

      await urlShortRepository().save(urlShorted)

      return res.status(200).json({ shortUrl: urlShorted.shortUrl })
    } catch (error) {
      return new HttpException(error, 400)
    }
  }

export const getUrlByGeneratedId =
  async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { url } = req.query
      const originalUrl = await getOriginalUrlByGeneratedId((url ? url.toString() : ''))
      if (!originalUrl) {
        throw new HttpException('Url not Found', 404)
      }
      return res.status(200).json({ originalUrl: originalUrl.originalUrl })
    } catch (error) {
      next(error)
    }
  }

