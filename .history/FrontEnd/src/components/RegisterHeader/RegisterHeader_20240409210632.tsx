import { Link } from 'react-router-dom'

export default function RegisterHeader() {
  return (
    <header className='py-5 bg-[#87d4fb]'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to='/'>
            <svg viewBox='0 0 192 65' className='h-8 lg:h-11 fill-blue'>
              <span className='text-[#ff3636]'>ZY</span>
              <span className='text-[#4245f5]'>MY </span>
            </svg>
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>Đăng ký</div>
        </nav>
      </div>
    </header>
  )
}
