import sellerAuthRouter from '~/routes/seller/seller-auth.routes'

const sellerRoutes = {
  prefix: '/',
  routes: [
    {
      path: 'sellers',
      route: sellerAuthRouter
    }
  ]
}

export default sellerRoutes
