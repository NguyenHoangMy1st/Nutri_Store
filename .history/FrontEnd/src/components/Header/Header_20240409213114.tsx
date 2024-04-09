import { Link } from 'react-router-dom'

const MAX_PURCHASES = 5
export default function Header() {
  return (
    <div className='pb-5 pt-2 bg-gradient-to-b from-[#1CA7EC] to-[#4ADEDE] text-white '>
      <div className='container mx-3'>
        <div className='grid grid-cols-12 gap-3 mt-4 items-center'>
          <Link to='/' className='col-span-2 ml-3'>
            <div className='flex text-4xl items-center justify-items-center gap-1 font-extrabold'>
              <img alt='' className='w-12 h-12 items-center justify-items-center mr-2 rounded-full ' />
              <span className='text-[#38ddfa]'>ZY</span>
              <span className='text-[#4245f5]'>MY </span>
            </div>
          </Link>
          <form className='col-span-9'>
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
          <div className='cols-span-1 flex justify-center'>
            <Popover
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>New</div>
                      <div className='mt-5'>
                       
                          <div className='mt-2 flex py-2 hover:bg-gray-100' >
                            <div className='flex-shrink-0'>
                              <img
                                className='h-11 w-11 object-cover'
                              />
                            </div>
                            <div className='ml-2 flex-grow overflow-hidden'>
                              <div className='truncate'></div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <span className='text-[#1CA7EC]'>100đ</span>
                            </div>
                          </div>
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          add
                        </div>
                        <Link to="/"
                          className='rounded-sm bg-[#1CA7EC] px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col  items-center justify-center p-2'>
                      <img  alt='no purchase' className='h-24 w-24 ' />
                      <div className='mt-3 capitalize'> No Product</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to={path.cart} className='relative'>
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
