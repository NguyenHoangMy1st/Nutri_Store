import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { generateNameId } from 'src/utils/utils'
interface Props {
  product: any
}
export default function SwiperItemTop({ product }: Props) {
  return (
    <div>
      <Link
        to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}
        className='flex flex-col  gap-4  '
      >
        <div className='relative  w-full h-[200px]'>
          <img src={product?.image} alt='' className='h-[200px] w-full' />
        </div>

        <div className='w-full px-3  flex flex-start'>
          <p className='w-full line-clamp-3 '>{product?.name}</p>
          {/* <p className='truncate ...'>{products.name}</p> */}
        </div>
      </Link>
      <div className='absolute top-0 left-0'>
        <div className=' bg-gradient-to-b from-[#c48678] to-[#ec571c] text-white  w-10 h-7 flex items-center justify-center rounded-br-lg'>
          TOP
        </div>
      </div>
    </div>
  )
}
