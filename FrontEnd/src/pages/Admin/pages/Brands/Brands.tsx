import { useEffect, useState } from 'react'

import adminApi from 'src/apis/admin.api'
import DOMPurify from 'dompurify'
import TableBrand from '../../component/TableBrand'
import { Button, Form } from 'antd'
import FormBrandAdd from '../../component/FormBrandAdd'

export default function Brands() {
  const [showAllContent, setShowAllContent] = useState(false)
  const [currentBrandId, setCurrentBrandId] = useState('')
  const [brandData, setBrandData] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const handleShowMore = () => {
    setShowAllContent(true)
  }
  const handleHideContent = () => {
    setShowAllContent(false)
  }
  const handleView = (brandId: any) => {
    setCurrentBrandId(brandId)
  }

  const fetchData = async () => {
    try {
      const brandData = await adminApi.getbrand(currentBrandId)
      setBrandData(brandData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [currentBrandId])

  return (
    <div className='flex flex-col  gap-8 border border-gray-200 rounded-lg w-full px-4 pt-4    '>
      <h1 className='font items-center text-[24px] font-bold text-center'>Quản lý thương hiệu</h1>
      <div>
        <Button type='primary' onClick={() => setOpen(true)} className='w-32 bg-[#1CA7EC]'>
          Add Brand
        </Button>
      </div>
      {open && <FormBrandAdd onClose={() => setOpen(false)} onCreateSuccess={() => fetchData()} />}
      <div className='flex gap-6 '>
        <div className='border border-gray-200 rounded-lg w-[40%] p-2'>
          <TableBrand handleView={handleView} />
        </div>
        <div className='border border-gray-200 rounded-lg py-4 w-[50%]'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div>
              <img
                src={
                  currentBrandId
                    ? `${brandData.data.data.image}`
                    : 'http://res.cloudinary.com/dvpgs36ca/image/upload/v1716831443/Health/bfhbf9z9j6damhkbjuic.png'
                }
                alt=''
                className='w-[120px] h-[120px] rounded-2xl border-2 border-gray-200'
              />
            </div>
            <div className='text-[23px] font-semibold'>
              {currentBrandId ? `${brandData.data.data.name}` : 'Nutri Store'}
            </div>
            <div className='text-gray-500'>Số lượng sản phẩm : 84</div>
            <div
              className='w-[80%] flex justify-center'
              style={{ height: showAllContent ? 'auto' : '120px', overflow: 'hidden' }}
            >
              {currentBrandId ? (
                <div dangerouslySetInnerHTML={{ __html: brandData.data.data.description } as any} />
              ) : (
                'Nutri Store - Chúng tôi ở đây vì sức khỏe của bạn'
              )}
            </div>
            {!showAllContent ? (
              <button
                onClick={handleShowMore}
                className='mt-[-90px] text-black bg-gradient-to-t from-white via-white to-white/50 p-16 font-bold  w-full text-[16px]'
              >
                Xem thêm
              </button>
            ) : (
              <button onClick={handleHideContent} className='mt-4 text-black text-center font-bold text-[16px] w-full'>
                Ẩn bớt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
