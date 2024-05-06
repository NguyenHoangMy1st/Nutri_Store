export interface Product {
  _id: string
  name: string
  image: string
  images: string[]
  description: string
  category: string[]
  brand: string[]
  rating: number
  price: number
  price_before_discount: number
  quantity: number
  stockQuantity: number
  nutrients: Nutrient[]
  madeIn: string
  view: number
  sold: number
  status?: string
}
export interface Nutrient {
  name: string // Tên của thành phần dinh dưỡng
  amountPerServing: string // Lượng dinh dưỡng mỗi lần sử dụng
  percentDailyValue: string // Phần trăm giá trị dinh dưỡng hàng ngày
}
export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
  brand?: string
}
