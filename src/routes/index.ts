import { Router } from 'express'
import urlRoutes from './url.routes'

const routes = Router()

routes.use('/api/v1/', urlRoutes)

export default routes
