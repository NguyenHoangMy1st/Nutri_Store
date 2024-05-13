import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import 'swiper/swiper-bundle.css'

import { Product } from 'src/types/product.type'
import SwiperItemTop from '../SwiperItemTop'

interface Props {
  data?: any
  product?: Product
}
function ItemTop({ data }: Props) {
  // SwiperCore.use([Navigation, Pagination])
  const [listItem, setListItem] = useState([])
  const fectchBannerItem = async () => {
    if (data) {
      setListItem(data)
    }
  }
  useEffect(() => {
    fectchBannerItem()
  }, [])
  // console.log(data[1].name)
  return (
    <Swiper
      slidesPerView={6}
      freeMode={true}
      spaceBetween={-10}
      navigation={true}
      mousewheel={true}
      keyboard={true}
      modules={[Pagination, Navigation]}
      className='h-full w-full '
    >
      {listItem?.length > 0 &&
        listItem?.slice(0, 18)?.map((product, index) => (
          <SwiperSlide
            key={index}
            className='mx-10 flex flex-col items-center border justify-center  shadow-none hover:shadow-lg w-full relative rounded-md'
          >
            <SwiperItemTop product={product}></SwiperItemTop>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ItemTop
