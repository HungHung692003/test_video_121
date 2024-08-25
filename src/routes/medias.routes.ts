import { Router } from 'express'
import { uploadSingleImageController } from '../controllers/medias.controllers'
import { wrapRequestHandler } from '../../utils/handlerl'
const mediasRouter = Router()

mediasRouter.post('/upload-image', wrapRequestHandler(uploadSingleImageController))

export default mediasRouter
