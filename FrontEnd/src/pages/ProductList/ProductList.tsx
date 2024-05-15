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
import Pagination from 'src/components/Pagination'
import Brand from 'src/components/Brand'
import { useEffect, useState } from 'react'
import { Modal } from 'antd'

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
  // console.log(productsData)
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   }
  // })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // Function to handle user response
  const handleResponse = (response: any) => {
    if (response === 'yes') {
      window.location.href = '/user/user/input'
    } else {
      setIsModalOpen(false)
    }
  }
  const renderNotification = () => {
    return (
      <div className=''>
        <p className=' text-gray-400 pt-7 px-5 text-[25px] mb-3'>
          Có vẻ như bạn đang gặp vấn đề về sức khỏe và có thể cần những sản phẩm hỗ trợ. Bạn có muốn tìm kiếm chúng
          không?
        </p>
        <div className='flex gap-5 justify-center items-center'>
          <button
            className='bg-blue text-white px-4 py-2 rounded border border-black cursor-pointerr'
            onClick={() => handleResponse('yes')}
          >
            Yes
          </button>
          <button
            className='bg-white text-black px-4 py-2 rounded border border-black cursor-pointer'
            onClick={() => handleResponse('no')}
          >
            No
          </button>
        </div>
      </div>
    )
  }
  useEffect(() => {
    // Hiển thị modal khi component được mount
    showModal()
  }, [])

  // Call authenticateUser when the component mounts
  return (
    <div className='h-full flex flex-col my-6 mx-32'>
      <div className=''>
        <div className='h-full flex flex-col'>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={null}>
            {renderNotification()}
          </Modal>
        </div>
      </div>

      <div className='min-h-[680px]'>
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
      <div className=' my-6 mx-32'>
        <div className='text-gray-400 uppercase pt-7 px-5 text-[25px] '>{/* {t('category')} */}danh mục nổi bật</div>
        <div className=' grid grid-cols-6 py-5 '>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '60afacca6ef5b902180aacaf'
              }).toString()
            }}
          >
            <ItemCategory img='sua.png' name='Sữa'></ItemCategory>
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
            <ItemCategory img='yensao.png' name='Yến'></ItemCategory>
          </Link>

          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '60aba4e24efcc70f8892e1c6'
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
                category: '66261875e777d143ac0442a0'
              }).toString()
            }}
          >
            <ItemCategory img='suachua.png' name='Sữa chua'></ItemCategory>
          </Link>

          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '662618d3e777d143ac0442a3'
              }).toString()
            }}
          >
            <ItemCategory img='banh.png' name='Đồ ăn vặt'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                // ...queryConfig,
                category: '662618e6e777d143ac0442a6'
              }).toString()
            }}
          >
            <ItemCategory
              img='https://vacca.webmau68.com/wp-content/uploads/2021/08/hairburst-biotin-chewable-hair-vitamins-300x300.jpg'
              name='Thực phẩm chức năng'
            ></ItemCategory>
          </Link>
        </div>
      </div>

      <div className='min-h-80 my-6 mx-32 border-2 border-gray-100 p-3 rounded-md  bg-[#fafafa] '>
        <div className='py-4 px-5 flex justify-between border-b-2 border-gray-100'>
          <div className=' text-[#e57a44] flex flex-row gap-1 '>
            <div className='text-gray-400 uppercase text-[23px] '>
              {/* {t('category')} */}Top những sản phẩm bán chạy
            </div>
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
              <ItemTop data={productsData.data.data.products} name='sold'></ItemTop>
            </div>
          </div>
        )}
      </div>
      <div className=' my-6 mx-32 py-3 rounded-lg  py-4flex flex-col '>
        <div className='text-gray-400 uppercase text-[20px] '>{/* {t('category')} */}Các thương hiệu nổi bật</div>
        <Brand></Brand>
      </div>
      <div className='min-h-80 my-6 mx-32 border-2 border-gray-100 p-3 rounded-lg  bg-[#fafafa]'>
        <div className='py-4 px-5 flex justify-between border-b-2 border-gray-100'>
          <div className=' text-[#e57a44] flex flex-row gap-1 '>
            <div className='text-gray-400 uppercase text-[23px] '>
              {/* {t('category')} */}Top những sản phẩm được xem nhiều nhất
            </div>
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
              <ItemTop data={productsData.data.data.products} name='view'></ItemTop>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col border-2 border-gray-100 p-3 rounded-lg mx-32 mb-10 bg-[#fafafa] mt-6'>
        {' '}
        <div className='flex p-5 uppercase text-[#1CA7EC] font-bold border-b-4 border-cyan-200 items-center justify-center text-[22px]'>
          {/* {t('suggest')} */}GỢI Ý HÔM NAY
        </div>
        <div className='  my-2  py-7  mx-4'>
          <div className='container'>
            {productsData && (
              <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-12'>
                  <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {productsData.data.data.products.map((product) => (
                      <div className='col-span-1' key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                  <Pagination
                    queryConfig={queryConfig}
                    pageSize={productsData.data.data.pagination.page_size}
                    namePath='home'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
