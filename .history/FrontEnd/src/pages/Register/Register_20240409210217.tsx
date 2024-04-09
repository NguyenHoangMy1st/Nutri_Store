import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-whiteblue bg-cover bg-center min-h-screen flex items-center justify-center'>
      <div className=' max-w-md mx-auto px-4 lg:w-1/3'>
        <form className='bg-gray-50 p-10  bg-transparent shadow-md border border-gray-300 rounded-lg basis-1/2'>
          <div className='text-2xl'>Đăng ký</div>
          <div className='mt-8'>
            <input
              type='email'
              name='email'
              className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='Email'
            />
            <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
          </div>
          <div className='mt-3'>
            <input
              type='password'
              name='password'
              className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='Password'
            />
            <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
          </div>
          <div className='mt-3'>
            <button className='w-full text-center py-4 px-2 uppercase bg-[#1CA7EC] text-white text-sm hover:bg-[#4ADEDE]'>
              Đăng nhập
            </button>
          </div>
          <div className='flex items-center justify-center mt-8'>
            <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
            <Link className='text-[#1CA7EC] ml-1' to='/login'>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
