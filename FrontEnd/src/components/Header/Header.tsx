import { Link } from 'react-router-dom'
import logo1 from 'src/assets/images/logo1.png'
import { AppContext } from 'src/contexts/app.context'
import NavHeader from '../NavHeader'
import Popover from '../Popover'
import { useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import { formatCurrency } from 'src/utils/utils'
const MAX_PURCHASES = 5
export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  const myTheme = {
    components: {
      Select: {
        colorPrimaryHover: '#fa913c',
        colorPrimary: '#fa913c',
        colorBorder: '#e07925',
        optionSelectedBg: '#ff8e8eaa',
        colorText: '#939292'
      }
    }
  }
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })
  console.log(purchasesInCartData)
  const purchasesInCart = purchasesInCartData?.data.data
  return (
    <div className='pb-5 pt-2 bg-gradient-to-b from-[#1CA7EC] to-[#4ADEDE] text-white '>
      <div className='mx-6'>
        <NavHeader />
        <div className='grid grid-cols-11 gap-3 mt-4 items-center'>
          <Link to='/' className='col-span-3 mr-5 ml-4'>
            <div className='flex text-4xl items-center justify-items-center font-extrabold'>
              <img src={logo1} alt='' className='w-40 h-12 items-center justify-items-center rounded-full ' />
              <span className='text-[#ff3e38]'>Nutri</span>
              <span className='text-[#2734a8]'>Store</span>
            </div>
          </Link>
          <form className='col-span-6 ml-7'>
            <div className='bg-white rounded-sm p-1 flex '>
              <input
                type='text'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='Search'
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-[#1CA7EC] hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='cols-span-1 flex justify-center ml-12'>
            <Popover
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>New</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                          <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                            {purchase.order?.map((orderItem) => (
                              <div>
                                <div className='flex-shrink-0'>
                                  <img
                                    src={orderItem.product.image}
                                    // alt={orderItem.product.name}
                                    className='h-11 w-11 object-cover'
                                  />
                                </div>
                                <div className='ml-2 flex-grow overflow-hidden'>
                                  <div className='truncate'>{orderItem.product.name} </div>
                                </div>
                                <div className='ml-2 flex-shrink-0'>
                                  <span className='text-[#1CA7EC]'>{formatCurrency(orderItem.product.price)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''} Thêm
                          hàng vào giỏ
                        </div>
                        <Link
                          to='/cart'
                          className='rounded-sm bg-[#1CA7EC] px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col  items-center justify-center p-2'>
                      <img src='empty_cart.png' alt='' className='h-24 w-24 ' />
                      <div className='mt-3 capitalize'> No Product</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to='/cart' className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>

                {purchasesInCart && purchasesInCart.length > 0 && (
                  <span className='absolute top-[-5px] left-[17px] rounded-full bg-white px-[9px] py-[1px] text-xs text-rose-500 '>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
