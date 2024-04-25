interface Product {
  name: string
  image: string
  images: string[]
  description: string
  category: string[]
  brand?: string
  rating: number
  price: number
  price_before_discount: number
  quantity: number
  stockQuantity: number
  ingredient: Ingredient[]
  madeIn: string
  view: number
  sold: number
  status?: string
}
interface Ingredient {
  name: string
  amount: number // Lượng của thành phần dinh dưỡng, có thể là số lượng hoặc tỉ lệ phần trăm
  unit: string // Đơn vị đo lường của lượng thành phần (ví dụ: mg, g, IU, %DV)
}
