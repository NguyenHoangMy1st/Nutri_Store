export interface Product {
  _id: string
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  images: string[]
  image: string
  price: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  rating: number
  potentialSideEffects: string[] // Thông tin về các tác dụng phụ có thể xảy ra
  storageInstructions: string // Hướng dẫn bảo quản
  nutrients: Nutrient[]
  createdAt: string
  updatedAt: string
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
}
