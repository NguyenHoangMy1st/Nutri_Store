export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0

export interface Purchase {
  _id: string
  order: [{ buy_count: number; product: Product }]
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  shippingAddress: [
    {
      street: string
      city: string
      postalCode: string
      phone: string
      paymentMethod: string
    }
  ]
  createdAt: string
  updatedAt: string
}