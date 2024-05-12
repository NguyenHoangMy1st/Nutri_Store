// import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

export default function ItemWelcome() {
  const [hasAnimated, setHasAnimated] = useState(false)
  // const [scrollListenerRemoved, setScrollListenerRemoved] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // console.log(currentScrollY)
      if (560 <= currentScrollY && currentScrollY <= 750 && !hasAnimated) {
        setHasAnimated(true)
      } else if (559 >= currentScrollY || currentScrollY >= 755) {
        setHasAnimated(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasAnimated])

  // console.log(hasAnimated)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY <= 648 && !hasAnimated && !scrollListenerRemoved && !isAnimationInProgress) {
  //       setIsAnimationInProgress(true) // Đánh dấu rằng animation đang được thực hiện
  //       setHasAnimated(true)
  //       setScrollListenerRemoved(true)
  //       window.removeEventListener('scroll', handleScroll)
  //     }
  //   }

  //   if (!hasAnimated && !scrollListenerRemoved && !isAnimationInProgress) {
  //     window.addEventListener('scroll', handleScroll)
  //   }

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [hasAnimated, scrollListenerRemoved, isAnimationInProgress])

  // useEffect(() => {
  //   if (hasAnimated) {
  //     // Animation đã hoàn thành, hãy đặt isAnimationInProgress thành false
  //     setIsAnimationInProgress(false)
  //   }
  // }, [hasAnimated])

  return (
    <div className='bg-neutral-100 h-full flex flex-col w-full px-20 py-10'>
      <div className='flex flex-row mx-20'>
        <div className='flex flex-col w-1/3 gap-12'>
          <div
            className={`${
              hasAnimated ? 'animate-slideInRight' : 'animate-none'
            } transition-all duration-500 flex flex-col gap-3 justify-center items-center`}
            // ref={ref}
          >
            <img src='immpr.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>IMPROVE HEALTH</div>
            <span className='text-[16px] text-gray-500'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,{' '}
            </span>
          </div>
          <div
            className={`${
              hasAnimated ? 'animate-slideInRight' : 'animate-none'
            } transition-all duration-500 flex flex-col gap-3 justify-center items-center`}
            // ref={ref}
          >
            <img src='heart.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>GOOD FOR THE HEART</div>
            <span className='text-[16px] text-gray-500'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,{' '}
            </span>
          </div>
        </div>

        <div
          className={`${
            hasAnimated ? 'animate-slideInRight' : 'animate-none'
          } transition-all duration-500 flex flex-col gap-2 h-1/2 rounded-md items-center w-full`}
          // ref={ref}
        >
          <div className='text-2xl font-bold text-[#41BAE3]'>Welcome to NutriStore</div>
          <div className='text-6xl font-bold text-[#17414F]'>Our Best Vitamins</div>
          <img src='bua-an.png' alt='' className='rounded-md w-[750px] h-[550px]' />
        </div>

        <div
          className={`${
            hasAnimated ? 'animate-slideInRight' : 'animate-none'
          } transition-all duration-500 flex flex-col w-1/3 gap-12`}
          // ref={ref}
        >
          <div className=' flex flex-col gap-3 justify-center items-center'>
            <img src='strong.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>STRONG BONES</div>
            <span className='text-[16px] text-gray-500'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,{' '}
            </span>
          </div>

          <div
            className={`${
              hasAnimated ? 'animate-slideInRight' : 'animate-none'
            } transition-all duration-500 flex flex-col gap-3 justify-center items-center`}
            // ref={ref}
          >
            <img src='memory.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>GOOD MEMORY</div>
            <span className='text-[16px] text-gray-500'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,{' '}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
