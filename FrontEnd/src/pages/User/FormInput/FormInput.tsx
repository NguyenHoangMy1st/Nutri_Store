import { ConfigProviderProps, Form, FormInstance, Input, Select, SelectProps } from 'antd'
import { useState } from 'react'
import adminApi from 'src/apis/admin.api'
type SizeType = ConfigProviderProps['componentSize']
const options: SelectProps['options'] = [
  { label: 'Hạ canxi máu(tụt canxi)', value: 'Hạ canxi máu(tụt canxi)' },
  { label: 'Suy Thận', value: 'Suy Thận' },
  { label: 'Tiểu đường', value: 'Tiểu đường' },
  { label: 'Tim Mạch', value: 'Tim Mạch' },
  { label: 'Viêm Dạ dày', value: 'Viêm Dạ dày' },
  { label: 'Loét Dạ Dày', value: 'Loét Dạ Dày' },
  { label: 'Mất ngủ', value: 'Mất ngủ' },
  { label: 'Bướu cổ', value: 'Bướu cổ' },
  { label: 'Cao Huyết Áp', value: 'Cao Huyết Áp' },
  { label: 'Còi Xương', value: 'Còi Xương' },
  { label: 'Loãn Xương', value: 'Loãn Xương' },
  { label: 'Tiêu chảy', value: 'Tiêu chảy' },
  { label: 'Táo Bón', value: 'Táo Bón' },
  { label: 'Thiếu máu ', value: 'Thiếu máu ' },
  { label: 'Trào ngược dạ dày thực quản', value: 'Trào ngược dạ dày thực quản' },
  { label: 'Tiền mãn kinh', value: 'Tiền mãn kinh' },
  { label: 'Tăng tiết mồ hôi', value: 'Tăng tiết mồ hôi' },
  { label: 'Viêm đại tràng', value: 'Viêm đại tràng' }
]

const options1: SelectProps['options'] = [
  { label: 'Sữa', value: 'Sữa' },
  { label: 'Sữa chua', value: 'Sữa chua' },
  { label: 'Yến', value: 'Yến' },
  { label: 'Đồ ăn vặt', value: 'Đồ ăn vặt' },
  { label: 'Ngũ cốc', value: 'Ngũ cốc' },
  { label: 'Thực phẩm chức năng', value: 'Thực phẩm chức năng' }
]

const options2: SelectProps['options'] = [
  { label: 'Sữa', value: 'Sữa' },
  { label: 'Sữa chua', value: 'Sữa chua' },
  { label: 'Yến', value: 'Yến' },
  { label: 'Đồ ăn vặt', value: 'Đồ ăn vặt' },
  { label: 'Ngũ cốc', value: 'Ngũ cốc' },
  { label: 'Thực phẩm chức năng', value: 'Thực phẩm chức năng' }
]

export default function FormInput() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  const [form] = Form.useForm()
  const [size] = useState<SizeType>('middle')
  const [hovered, setHovered] = useState(false)
  const [formInstance, setFormInstance] = useState<FormInstance>()
  const handleCreate = async () => {
    try {
      const values = await (formInstance?.validateFields() as Promise<Product>)
      // console.log('Form values:', values) // In ra giá trị của form trước khi gọi API

      // const formData = new FormData()
      // Object.entries(values).forEach(([key, value]) => {
      // if (key === 'images' && Array.isArray(value)) {
      //   // Loại bỏ địa chỉ cơ sở từ mỗi URL và thêm vào formData một cách riêng biệt
      //   value.forEach((url) => {
      //     const imageUrlWithoutBaseURL = url.replace(/^http:\/\/localhost:4000\/images\//, '')
      //     formData.append(key, imageUrlWithoutBaseURL)
      //   })
      // } else {
      // formData.append(key, value)
      // }
      // })
      await adminApi.createProduct(values)
      formInstance?.resetFields()
      onCreate(values)
    } catch (error) {
      // console.log('Failed:', error)
    }
  }
  return (
    <div className='rounded-md bg-white px-2 pb-10 shadow md:px-7 md:pb-20 font '>
      <div className='border-b border-b-gray-200 py-6 relative'>
        <h1 className='text-lg font-medium capitalize text-gray-900 '>
          <span className=' h-[25px] w-[25px] text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1dd442] via-[#0392ffd8] to-[#ffff0fd1]'>
            AI
          </span>{' '}
          hỗ trợ tìm kiếm sản phẩm theo nhu cầu
        </h1>
        <div className='mt-1 text-sm text-gray-700'>Vui lòng nhập form thông tin dưới đây để được hỗ trợ</div>
        <div className='flex gap-2 w-full border border-gray-200 p-4 rounded-lg mt-3'>
          <Form form={form}>
            <div className='  flex flex-col gap-6 item-center justify-center'>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Giới tính</span>
                  <Form.Item name='height' rules={[{ required: true, message: 'Please input!' }]}>
                    <Select
                      defaultValue='Nam'
                      style={{ width: 80 }}
                      onChange={handleChange}
                      options={[
                        { value: 'male', label: 'Nam' },
                        { value: 'female', label: 'Nữ' }
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Chiều cao</span>
                  <Form.Item name='height' rules={[{ required: true, message: 'Please input!' }]}>
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Cân nặng</span>
                  <Form.Item name='weight' rules={[{ required: true, message: 'Please input!' }]}>
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-[15px]'>Tình trạng bệnh:</span>
                <Form.Item name={['current_health_conditions']}>
                  <Select
                    mode='multiple'
                    size={size}
                    placeholder='Vui lòng nhập'
                    onChange={handleChange}
                    style={{ width: 500 }}
                    options={options}
                  />
                </Form.Item>
              </div>
              <div className='flex gap-8'>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Tuổi</span>
                  <Form.Item name='age' rules={[{ required: true, message: 'Please input!' }]}>
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Sản phẩm dị ứng:</span>
                  <Form.Item name={['dietary_restrictions']}>
                    <Select
                      mode='multiple'
                      size={size}
                      placeholder='Vui lòng nhập'
                      onChange={handleChange}
                      style={{ width: 300 }}
                      options={options2}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
          <div className='w-full flex items-center justify-center'>
            <button className=' w-full h-[150px] text-gray-100  font-bold rounded-full bg-gradient-to-r from-[#1dd442] via-[#0392ffd8] to-[#ffff0fd1]'>
              <img
                src='https://go4customer.com/images/blog/SIMPLE%20CHATBOTS.png'
                alt=''
                className={`w-[180px] h-[120px]  transform transition-transform duration-500 ease-in-out ${
                  hovered ? 'hover:animate-customAnimation' : ''
                }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </button>
          </div>
        </div>

        <div className='absolute top-0 right-0    text-gray-100  rounded-full bg-gradient-to-r from-[#1dd442] via-[#0392ffd8] to-[#ffff0fd1] w-[50px] h-[50px] flex justify-center items-center'>
          Mới
        </div>
      </div>
      <div className='border-b border-b-gray-200 py-6 '></div>
    </div>
  )
}
