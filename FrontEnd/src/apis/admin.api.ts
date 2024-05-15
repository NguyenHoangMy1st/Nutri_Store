import { Brand } from 'src/types/brand.type'
import { Category } from 'src/types/category.type'
import { Order } from 'src/types/order.type'
import { Product, ProductList } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/admin/users'
interface UserData {
  email: string
  name: string
  phone: string
  address: string
  roles: string[]
}

const adminApi = {
  getAllUser() {
    return http.get<SuccessResponse<User[]>>(URL)
  },
  updateUser(id: string[], userData: UserData) {
    return http.put<SuccessResponse<User[]>>(`/admin/users/${id}`, userData)
  },
  getUser(id: string[]) {
    return http.get<SuccessResponse<User[]>>(`/admin/users/${id}`)
  },
  deleteUser(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/users/delete/${id}`)
  },
  getAllProducts() {
    return http.get<SuccessResponse<ProductList[]>>('/admin/products/all')
  },
  getProduct(id: string[]) {
    return http.get<SuccessResponse<ProductList[]>>(`/admin/products/${id}`)
  },
  updateProduct(id: string[], userData: UserData) {
    return http.put<SuccessResponse<User[]>>(`/admin/products/${id}`, userData)
  },
  deleteProduct(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/products/delete/${id}`)
  },
  getcategories() {
    return http.get<SuccessResponse<Category[]>>(`/admin/categories`)
  },

  createCaterory(body: any) {
    return http.post<SuccessResponse<Category[]>>(`/admin/categories`, body)
  },
  updateCaterory(body: any, id: string) {
    return http.post<SuccessResponse<Category[]>>(`/admin/categories/${id}`, body)
  },
  getbrands() {
    return http.get<SuccessResponse<Brand[]>>(`/admin/brands`)
  },
  createBrand(body: any) {
    return http.post<SuccessResponse<Brand[]>>(`/admin/brands`, body)
  },
  updateBrand(body: any, id: string) {
    return http.post<SuccessResponse<Brand[]>>(`/admin/brands/${id}`, body)
  },
  createProduct(body: any) {
    return http.post<SuccessResponse<Product[]>>('/admin/products', body)
  },
  uploadImage(body: any) {
    return http.post<SuccessResponse<string>>('/admin/products/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadImages(body: any) {
    return http.post<SuccessResponse<string>>('/admin/products/upload-images', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getAllOrder() {
    return http.get<SuccessResponse<Order[]>>('/admin/orders')
  },
  confirmaccept(id: string[]) {
    return http.put<SuccessResponse<Order[]>>(`/admin/orders/${id}/confirm`)
  },
  confirmcancel(id: string[]) {
    return http.put<SuccessResponse<Order[]>>(`/admin/orders/${id}/cancel`)
  },
  getDeteledProducts() {
    return http.get<SuccessResponse<ProductList[]>>('/admin/products/deleteProduct')
  },
  updateDeteledProduct(body: any, id: string) {
    console.log(body)
    console.log(id)
    return http.post<SuccessResponse<Brand[]>>(`/admin/products/${id}`, body)
  }
}

export default adminApi
