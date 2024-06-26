import { useMutation, useQuery, useQueryClient } from 'react-query'
import DOMPurify from 'dompurify'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import QuantityController from 'src/components/QuantityController'
// import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import { Modal, Popover } from 'antd'
import { useEffect, useMemo, useState, useRef } from 'react'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import { purchasesStatus } from 'src/constants/purchase'

import Product from '../ProductList/Product'
import path from 'src/constants/path'
import { FaHandHoldingHeart, FaHeartbeat, FaStar } from 'react-icons/fa'
import { GrDeliver } from 'react-icons/gr'
import Evaluate from 'src/components/Evaluate'

const ProductDetail: React.FC = () => {
  // const { t } = useTranslation(['detail'])
  const content1 = (
    <div className='w-72 h-36 px-5 py-2'>
      <span>
        Miễn phí Trả hàng trong 15 ngày nếu Đổi ý (hàng trả phải còn nguyên seal, tem, hộp sản phẩm), áp dụng cho một số
        sản phẩm nhất định. Ngoài ra, tại thời điểm nhận hàng, bạn có thể đồng kiểm và được trả hàng miễn phí.
      </span>
    </div>
  )
  const content2 = (
    <div className='w-72 h-30 px-5 py-2'>
      <span>Nhận lại gấp đôi số tiền mà bạn đã thanh toán cho sản phẩm không chính hãng từ Nutri Store</span>
    </div>
  )
  const content3 = (
    <div className='w-72 h-30 px-5 py-2'>
      <span>Ưu đãi miễn phí vận chuyển lên tới 40,000 VNĐ cho đơn hàng của Nutri Store từ 150,000 VNĐ</span>
    </div>
  )
  const queryClient = useQueryClient()
  const { nameId } = useParams()

  const [buyCount, setBuyCount] = useState(1)
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const product = productDetailData?.data.data
  const imageRef = useRef<HTMLImageElement>(null)
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const navigate = useNavigate()
  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const next = () => {
    // console.log(currentIndexImages[1])
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const chooseActive = (img: string) => {
    setActiveImage(img)
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }
  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-neutral-100 pt-10 pb-20'>
      <div className='container '>
        <div className='bg-white shadow mx-32 p-5'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className=' absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-[#1CA7EC]' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7 pt-5 '>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange-400 text-orange-500'>
                    {product.view} Lượt xem sản phẩm
                  </span>
                  {/* <ProductRating
                    rating={product.rating}
                    activeClassname='fill-orange-400 text-orange-400 h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  /> */}
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span className='border-b border-b-gray-500'>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500 '>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-[#1CA7EC]'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-[#1CA7EC] px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)}
                  reduce
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'> Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center border-b pb-7 border-b-gray-200'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-[#1CA7EC] bg-[#1CA7EC]/10 px-5 capitalize text-[#1CA7EC] shadow-sm hover:bg-[#1CA7EC]/5'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-[#1CA7EC] text-[#1CA7EC]'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-[#1CA7EC] px-5 capitalize text-white shadow-sm outline-none hover:bg-rose-400/90'
                >
                  Mua ngay
                </button>
              </div>

              <div className='pt-7 flex gap-2 justify-between'>
                <div className='flex flex-1 text-[#1CA7EC] gap-2'>
                  {/* <img src='mienphi.png' alt='' className='w-5 h-5' /> */}
                  <FaHeartbeat className='text-[20px]' />
                  <Popover placement='bottom' content={content1}>
                    <span className='text-gray-700'>Sức khỏe của bạn là tài sản quý giá nhất</span>
                  </Popover>
                </div>
                <div className='flex flex-1 text-[#1CA7EC] gap-2'>
                  {/* <img src='baomat.png' alt='' className='w-5 h-5' /> */}
                  <FaHandHoldingHeart className='text-[20px]' />
                  <Popover placement='bottom' content={content2}>
                    <span className='text-gray-700'>Sản phẩm được kiểm kê chất lượng</span>
                  </Popover>
                </div>
                <div className='flex flex-1 text-[#1CA7EC] gap-2'>
                  {/* <img src='vanchuyen.png' alt='' className='w-5 h-5' /> */}
                  <GrDeliver className='text-[20px]' />
                  <Popover placement='bottom' content={content3}>
                    <span className='text-gray-700'>Miễn phí vận chuyển</span>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white shadow mx-32 p-5'>
          <div className='rounded bg-neutral-100 p-4 text-lg capitalize text-slate-700'>Mô Tả Sản Phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className=' mt-8 bg-white shadow mx-32 p-5'>
          <div
            className='grid gap-24 mt-[50px] border-white border-b-gray-100 border-2 pb-8'
            style={{ gridTemplateColumns: '30% 70%' }}
          >
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <span className='text-left text-xl font-bold'>12 đánh giá</span>
                <button
                  className='uppercase text-[16px] font-bold underline decoration-1 hover:text-black/70'
                  onClick={showModal}
                >
                  Viết đánh giá
                </button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={null}>
                  <Evaluate productId={product._id} />
                </Modal>
              </div>
              <div className='flex gap-2 text-orange-500 text-[30px] text-left mt-6'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className='flex flex-col gap-4 mt-8 '>
                <div className='flex gap-2  w-full item-center justify-center h-[30px] text-base'>
                  <span className='text-end p-1 '>5</span>
                  <div className='w-full flex items-center justify-center '>
                    <div className=' w-full box-border  leading-snug'>
                      <div className='w-full'>
                        <div className='h-[5px] bg-[#dfdfdf]  overflow-hidden rounded-[100px] w-full   '>
                          <div
                            className='ant-progress-bg flex items-center justify-center'
                            style={{ width: '66.6667%', height: '5px', background: 'rgb(0, 0, 0)' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className=' text-center h-[30px] p-1'>(8)</span>
                </div>
                <div className='flex gap-2  w-full item-center justify-center h-[30px] text-base'>
                  <span className='text-end p-1 '>4</span>
                  <div className='w-full flex items-center justify-center '>
                    <div className=' w-full box-border  leading-snug'>
                      <div className='w-full'>
                        <div className='h-[5px] bg-[#dfdfdf]  overflow-hidden rounded-[100px] w-full   '>
                          <div
                            className='ant-progress-bg flex items-center justify-center'
                            style={{ width: '0%', height: '5px', background: 'rgb(0, 0, 0)' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className=' text-center h-[30px] p-1'>(0)</span>
                </div>
                <div className='flex gap-2  w-full item-center justify-center h-[30px] text-base'>
                  <span className='text-end p-1 '>3</span>
                  <div className='w-full flex items-center justify-center '>
                    <div className=' w-full box-border  leading-snug'>
                      <div className='w-full'>
                        <div className='h-[5px] bg-[#dfdfdf]  overflow-hidden rounded-[100px] w-full   '>
                          <div
                            className='ant-progress-bg flex items-center justify-center'
                            style={{ width: '0%', height: '5px', background: 'rgb(0, 0, 0)' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className=' text-center h-[30px] p-1'>(0)</span>
                </div>
                <div className='flex gap-2  w-full item-center justify-center h-[30px] text-base'>
                  <span className='text-end p-1 '>2</span>
                  <div className='w-full flex items-center justify-center '>
                    <div className=' w-full box-border  leading-snug'>
                      <div className='w-full'>
                        <div className='h-[5px] bg-[#dfdfdf]  overflow-hidden rounded-[100px] w-full   '>
                          <div
                            className='ant-progress-bg flex items-center justify-center'
                            style={{ width: '0%', height: '5px', background: 'rgb(0, 0, 0)' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className=' text-center h-[30px] p-1'>(0)</span>
                </div>
                <div className='flex gap-2  w-full item-center justify-center h-[30px] text-base'>
                  <span className='text-end p-1 '>1</span>
                  <div className='w-full flex items-center justify-center '>
                    <div className=' w-full box-border  leading-snug'>
                      <div className='w-full'>
                        <div className='h-[5px] bg-[#dfdfdf]  overflow-hidden rounded-[100px] w-full   '>
                          <div
                            className='ant-progress-bg flex items-center justify-center'
                            style={{ width: '0', height: '5px', background: 'rgb(0, 0, 0)' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className=' text-center h-[30px] p-1'>(0)</span>
                </div>
              </div>
            </div>
            <div
              className='flex flex-col gap-2 w-[90%] scrollable-container'
              style={{ maxHeight: '455px', overflowY: 'auto' }}
            >
              {product.comment.map((commentIndex) => (
                <div className='flex flex-col text-[14px] border-white border-b-gray-100 border-2 pb-4 w-[91%] '>
                  <span>{commentIndex.user}</span>
                  <div className='flex gap-3 mt-2'>
                    <div className='flex gap-1 text-orange-500 text-[13px] pr-3 '>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className='text-gray-400 '>17/04/2023</div>
                  </div>
                  <p className='text-base mt-2'>{commentIndex.commentItem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-8 bg-white shadow mx-32 p-5'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductDetail
