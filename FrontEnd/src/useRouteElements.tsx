import path from 'src/constants/path'
import { useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import ProductCategory from './pages/ProductList/ProductCategory'
import ProductDetail from './pages/ProductDetail'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.login,
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: path.register,
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productCategory,
      element: (
        <MainLayout>
          <ProductCategory />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
    // {
    //   path: path.productSearch,
    //   element: <MainLayout>{/* <ProductSearch /> */}</MainLayout>
    // }
  ])
  return routeElements
}
