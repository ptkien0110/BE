import Customer from '~/models/schemas/Customer.schema'
import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'
import { CustomerReqBody, UpdateCustomerReqBody } from '~/models/requests/Seller.request'

class SellerService {
  async createCustomer(user_id: string, payload: CustomerReqBody) {
    const customer = await databaseService.customers.insertOne(
      new Customer({
        seller_id: new ObjectId(user_id),
        name: payload.name,
        address: payload.address,
        phone: payload.phone
      })
    )
    const data = await databaseService.customers.findOne(
      { _id: new ObjectId(customer.insertedId) },
      {
        projection: {
          password: 0
        }
      }
    )
    return data
  }

  async getCustomers() {
    const customers = await databaseService.customers.find({}, { projection: { password: 0 } }).toArray()
    return customers
  }

  async getCustomer(customer_id: string) {
    const customer = await databaseService.customers.findOne(
      { _id: new ObjectId(customer_id) },
      { projection: { password: 0 } }
    )
    return customer
  }

  async updateCustomer(customer_id: string, payload: UpdateCustomerReqBody) {
    const customer = await databaseService.customers.findOneAndUpdate(
      { _id: new ObjectId(customer_id) },
      {
        $set: { ...payload },
        $currentDate: {
          updated_at: true
        }
      },
      {
        projection: { password: 0 },
        upsert: true,
        returnDocument: 'after'
      }
    )
    return customer
  }

  async deleteCustomer(customer_id: string) {
    const customer = await databaseService.customers.findOneAndDelete({ _id: new ObjectId(customer_id) })
    return customer
  }
}
export const sellerService = new SellerService()
