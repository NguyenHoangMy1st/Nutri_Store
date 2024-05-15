const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  formInput: 'user/input',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  forgetpassword: '/forgetpassword',
  productSearch: '/productSearch',
  productCategory: '/productCategory',
  cart: '/cart',
  payment: '/payment',
  step: '/step',
  admin: '/admin',
  dashboard: '/admin/dashboard',
  accounts: '/admin/accounts',
  products: '/admin/products',
  deteledProducts: '/admin/deletedProducts',
  orders: '/admin/orders',
  formAccountEdit: '/admin/accounts/edit',
  formProductEdit: '/admin/products/edit'
} as const

export default path
