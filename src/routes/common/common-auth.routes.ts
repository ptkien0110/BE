import { Router } from 'express'
import {
  checkSellerController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  registryController
} from '~/controllers/auth.controller'
import {
  accessTokenValidator,
  loginValidator,
  phoneValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from './../../utils/handler'

const commonAuthRouter = Router()

commonAuthRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

commonAuthRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

commonAuthRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

commonAuthRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

commonAuthRouter.post('/check-seller', wrapRequestHandler(checkSellerController))

commonAuthRouter.post('/registry', registerValidator, wrapRequestHandler(registryController))
export default commonAuthRouter
