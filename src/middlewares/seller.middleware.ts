import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { PRODUCT_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import { REGEX_PHONE_NUMBER } from '~/constants/regex'
import { ErrorWithStatus } from '~/middlewares/error.middleware'
import authService from '~/services/auth.services'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validations'

export const createCustomerValidator = validate(
  checkSchema({
    name: {
      isString: {
        errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
      }
    },
    email: {
      optional: true,
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value: string) => {
          const isExistEmail = await authService.checkEmailExist(value)
          if (isExistEmail) {
            throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
          }
          return true
        }
      }
    },
    phone: {
      isString: {
        errorMessage: USERS_MESSAGES.PHONE_NUMBER_IS_STRING
      },
      trim: true,
      custom: {
        options: async (value: string, { req }) => {
          if (!REGEX_PHONE_NUMBER.test(value)) {
            throw new Error(USERS_MESSAGES.PHONE_NUMBER_INVALID)
          }
          const user = await databaseService.customers.findOne({ phone: value })
          if (user) {
            throw Error(USERS_MESSAGES.PHONE_NUMBER_EXISTED)
          }
          return true
        }
      }
    },
    date_of_birth: {
      optional: true,
      custom: {
        options: (value: string) => {
          const dateOfBirth = new Date(value)
          if (isNaN(dateOfBirth.getTime())) {
            throw new Error('Invalid date_of_birth')
          }
          return true
        }
      }
    }
  })
)

export const customerIdValidator = validate(
  checkSchema(
    {
      customer_id: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.INVALID_CUSTOMER_ID
        },
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.INVALID_CUSTOMER_ID,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            const productInDB = await databaseService.customers.findOne({ _id: new ObjectId(value) })
            if (productInDB == null) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.CUSTOMER_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            return true
          }
        }
      }
    },
    ['params', 'body']
  )
)

export const updateCustomerValidator = validate(
  checkSchema({
    name: {
      optional: true,
      isString: {
        errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
      }
    },
    email: {
      optional: true,
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value: string) => {
          const isExistEmail = await authService.checkEmailExist(value)
          if (isExistEmail) {
            throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
          }
          return true
        }
      }
    },
    phone: {
      optional: true,
      trim: true,
      custom: {
        options: async (value: string, { req }) => {
          if (!REGEX_PHONE_NUMBER.test(value)) {
            throw new Error(USERS_MESSAGES.PHONE_NUMBER_INVALID)
          }
          const user = await databaseService.customers.findOne({ phone: value })
          if (user) {
            throw Error(USERS_MESSAGES.PHONE_NUMBER_EXISTED)
          }
          return true
        }
      }
    },
    date_of_birth: {
      optional: true,
      custom: {
        options: (value: string) => {
          const dateOfBirth = new Date(value)
          if (isNaN(dateOfBirth.getTime())) {
            throw new Error('Invalid date_of_birth')
          }
          return true
        }
      }
    }
  })
)
