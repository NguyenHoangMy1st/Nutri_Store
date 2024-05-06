import { Link, createSearchParams } from 'react-router-dom'
import ItemCategory from 'src/components/ItemCategory'

// import Banner from 'src/components/Swiper'
import { FaFireAlt } from 'react-icons/fa'
import { BsChevronRight } from 'react-icons/bs'
// import SortProductList from './SortProductList'
// import AsideFilter from './AsideFilter'
import Product from './Product'
import { useQuery } from 'react-query'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

// import Pagination from 'src/components/Pagination'
// import categoryApi from 'src/apis/category.api'
import path from 'src/constants/path'
import { ProductListConfig } from 'src/types/product.type'
import ItemTop from './ItemTop'
// import { useTranslation } from 'react-i18next'
import './ProductList.scss'
import { VscArrowRight } from 'react-icons/vsc'
import ItemWelcome from './ItemWelcome'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  // const { t } = useTranslation(['home'])
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  console.log(productsData)
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   }
  // })

  return (
    <div className='bg-neutral-100 h-full flex flex-col '>
      <div className='bg-[#E1F4FB] min-h-[680px]'>
        <div className='my-10 mx-32  relative pt-8 flex items-start justify-center'>
          <img src='unnamed.webp' alt='' className='z-0' />
          <div className='absolute top-[50%] transform-translate-xy-50 flex  items-center justify-center w-full'>
            <div className='flex h-full gap-9 items-center z-40 w-5/6  top-[15px] left-0 justify-center'>
              <div className='h-1/2 rounded-md flex flex-col w-2/5 gap-7 maven-pro'>
                <span className='text-[#17414F] text-4xl font-bold '> Get Your Minerals & Vitamins</span>
                <span className='text-gray-600 leading-relaxed'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
                  mattis, pulvinar dapibus leo.
                </span>
                <div className='w-[200px]'>
                  <Link
                    to='/'
                    className='flex gap-1 font-semibold py-4 px-3 uppercase bg-[#17414F] w-full text-sm hover:opacity-80 rounded-full text-gray-100 items-center  justify-center'
                  >
                    <div className=''>Mua ngay</div>
                    <VscArrowRight />
                  </Link>
                </div>
              </div>
              <div className='h-1/2 rounded-md w-3/5 items-center ml-20'>
                <img src='thuoc.png' alt='' className='rounded-md w-[500px] h-[500px]' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ItemWelcome></ItemWelcome>
      <div className='bg-white  my-10 mx-32'>
        <div className='text-gray-400 uppercase pt-7 px-5 '>{/* {t('category')} */}category</div>
        <div className=' grid grid-cols-7 py-5 '>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '60aba4e24efcc70f8892e1c6'
              }).toString()
            }}
          >
            <ItemCategory img='tpcn.png' name='Thực phẩm chức năng'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '60afafe76ef5b902180aacb5'
              }).toString()
            }}
          >
            <ItemCategory img='tpgcx.png' name='Trái cây'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '60afacca6ef5b902180aacaf'
              }).toString()
            }}
          >
            <ItemCategory img='yen.png' name='Yến sào'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '65ef3b5a04766a6306cc63b3'
              }).toString()
            }}
          >
            <ItemCategory img='ngucoc.png' name='Ngũ cốc'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '65ef3b9c04766a6306cc63b3'
              }).toString()
            }}
          >
            <ItemCategory img='hat.png' name='Các loại hạt'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '65ef3bb004766a6306cc63b6'
              }).toString()
            }}
          >
            <ItemCategory img='sua.png' name='Sản phẩm từ sữa'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '65ef3bde04766a6306cc63b9'
              }).toString()
            }}
          >
            <ItemCategory img='orther.png' name='Khác'></ItemCategory>
          </Link>
        </div>
      </div>
      {/* <div className='flex items-center  justify-center  mx-32'>
        <div>
          <Link to='/'>
            <img src='quancao.jpg' alt='' className='rounded-md cursor-pointer' />
          </Link>
        </div>
      </div> */}
      <div className='min-h-80 bg-white  my-10 mx-32 '>
        <div className='py-4 px-5 flex justify-between border-b-2 border-gray-100'>
          <div className=' text-[#00a7fa] flex flex-row gap-1 '>
            <div className='text-[#1CA7EC] uppercase text-lg '>{/* {t('look')} */}TÌM KIẾM HÀNG ĐẦU</div>
            <FaFireAlt className='text-2xl' />
          </div>
          <div className='flex flex-row gap-1 text-gray-400 items-center hover:text-gray-300 '>
            <Link
              to={{
                pathname: path.productCategory,
                search: createSearchParams({
                  // ...queryConfig
                }).toString()
              }}
            >
              {/* {t('all')} */}Xem tất cả sản phẩm
            </Link>
            <BsChevronRight />
          </div>
        </div>
        {productsData && (
          <div className='flex flex-row gap-5 items-center justify-center px-1 mt-1 min-h-96 '>
            <div className='flex h-80 w-full items-start'>
              <ItemTop data={productsData.data.data.products}></ItemTop>
            </div>
          </div>
        )}
      </div>

      <div className='flex bg-white   mx-32 p-5 uppercase text-[#1CA7EC] font-bold border-b-4 border-rose-400 items-center justify-center'>
        {/* {t('suggest')} */}GỢI Ý HÔM NAY
      </div>
      <div className='bg-white  my-2 mx-32 py-7 mb-10'>
        <div className='container'>
          {productsData && (
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-3'>
                {/* <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} /> */}
              </div>
              <div className='col-span-9'>
                {/* <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} /> */}
                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {productsData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                {/* <Pagination
                  queryConfig={queryConfig}
                  pageSize={productsData.data.data.pagination.page_size}
                  namePath='home'
                /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
