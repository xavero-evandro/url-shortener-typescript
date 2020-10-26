import { Router } from 'express'
import { getUrlByGeneratedId, shortUrl } from '../controllers/urlShortener.controller'
import { validateUrl } from '../middlewares/urlValidation'

const urlRoutes = Router()

urlRoutes.post('/', validateUrl, shortUrl)
urlRoutes.get('/', getUrlByGeneratedId)

export default urlRoutes
