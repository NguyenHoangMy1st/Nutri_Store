import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'
import ItemBrand from '../ItemBrand'

interface AppProps {}
const FlashSale: FC<AppProps> = () => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={-80}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation]}
        className=' w-full py-4'
      >
        <SwiperSlide>
          <ItemBrand img='https://image.isu.pub/211102171806-9a1859bce248ee1119e0a09160752aa4/jpg/page_1.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand img='https://www.anphabe.com/file-deliver.php?key=hcWDxaBjm7TXnZedhtmlrtKWiG3ZcGOgWtaWr1qhqG5mbluboZ1UoKNrZp1abGNubGyaVXHXamiXclaUx8vF1tDYwdrHnNaehp7VnZSgU1ehrg..' />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLkRBoWKGw5ww2dxJ96up6wagD8KiGhGKMAyLPrn8UHg&s' />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand img='https://photo2.tinhte.vn/data/attachment-files/2023/05/6448128_ensure.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand img='https://vtv1.mediacdn.vn/Uploaded/canbiet/2013_10_04/cogaihalan1.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand img='http://calbee.vn/wp-content/uploads/2023/06/z4427863588262_0bcf277c6cb0e0f8946f00d02f0d2f22-min.jpg' />
        </SwiperSlide>
        {/* <SwiperSlide>
          <ItemBrand img={brand7} />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand img={brand8} />
        </SwiperSlide> */}
      </Swiper>
    </>
  )
}

export default FlashSale
