import { Router } from 'express'
import {
  createProductController,
  deleteProductController,
  deleteProductImagesController,
  getProductController,
  getProductsController,
  updateProductController,
  uploadProductImagesController
} from '~/controllers/product.controller'
import { wrapRequestHandler } from './../../utils/handler'
import uploadCloud from '~/utils/cloudinary'
import { paginationValidator, productIdValidator, productValidator } from '~/middlewares/product.middlewares'
import { UpdateProductReqBody } from '~/models/requests/Product.request'
import { filterMiddleware } from '~/middlewares/common.middleware'

const adminProductRouter = Router()

adminProductRouter.post('/', uploadCloud.array('images', 4), wrapRequestHandler(createProductController))

adminProductRouter.get('/', paginationValidator, wrapRequestHandler(getProductsController))

adminProductRouter.get('/:product_id', productIdValidator, wrapRequestHandler(getProductController))

adminProductRouter.put(
  '/:product_id',
  productValidator,
  filterMiddleware<UpdateProductReqBody>([
    'name',
    'description',
    'category',
    'price_for_customer',
    'price_for_seller',
    'stock',
    'point',
    'profit',
    'discount',
    'discount_for_seller',
    'sales',
    'destroy',
    'status'
  ]),
  wrapRequestHandler(updateProductController)
)

adminProductRouter.delete('/delete/:product_id', productIdValidator, wrapRequestHandler(deleteProductController))

adminProductRouter.delete(
  '/delete/:product_id/images',
  productIdValidator,
  wrapRequestHandler(deleteProductImagesController)
)

adminProductRouter.post(
  '/:product_id/images',
  uploadCloud.array('images'),
  wrapRequestHandler(uploadProductImagesController)
)
export default adminProductRouter
