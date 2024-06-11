import { NextFunction, Request, Response } from 'express'
import { sellerService } from '~/services/seller.services'

export const createCustomerController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization
  const payload = req.body
  const data = await sellerService.createCustomer(user_id, payload)
  return res.json({
    message: 'Create customer success',
    data
  })
}

export const getCustomersController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await sellerService.getCustomers()
  return res.json({
    message: 'Get customers success',
    data
  })
}

export const getCustomerController = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_id } = req.params
  const data = await sellerService.getCustomer(customer_id)
  return res.json({
    message: 'Get customer success',
    data
  })
}

export const updateCustomerController = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_id } = req.params
  const payload = req.body
  const data = await sellerService.updateCustomer(customer_id, payload)
  return res.json({
    message: 'Update customer success',
    data
  })
}

export const deleteCustomerController = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_id } = req.params
  const data = await sellerService.deleteCustomer(customer_id)
  return res.json({
    message: 'Delete customer success',
    data
  })
}
