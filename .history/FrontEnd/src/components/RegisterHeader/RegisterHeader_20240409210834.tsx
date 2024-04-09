import { Link } from 'react-router-dom'
import logo from 'src/assets/images/logo.png'

export default function RegisterHeader() {
  return (
    <header className='py-5 bg-[#87d4fb]'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to='/'>
            <div className='flex text-4xl items-center justify-items-center gap-1 font-extrabold'>
              <img src={logo} alt='' className='w-12 h-12 items-center justify-items-center mr-2 rounded-full ' />
              <span className='text-[#ff3e38]'>Nutri</span>
              <span className='text-[#4245f5]'>Store</span>
            </div>
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>Đăng ký</div>
        </nav>
      </div>
    </header>
  )
}
