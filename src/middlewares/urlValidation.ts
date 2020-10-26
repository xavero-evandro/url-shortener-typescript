import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import HttpException from '../errors/HttpException'

const schema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['https', 'http'] })
    .trim()
    .required()
})

export const validateUrl =
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync({ url: req.body.url })
      next()
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }
