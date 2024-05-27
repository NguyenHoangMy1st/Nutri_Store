import { Button, ConfigProviderProps, Form, Image, Input, message, Modal, Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
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
  const [userId, setUserId] = useState('')
  const [products, setProducts] = useState([])
  console.log(products)
  const [data, setdata] = useState({
    user: '',
    sex: '',
    height: '',
    age: '',
    weight: '',
    current_health_conditions: []
  })
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const [form] = Form.useForm()
  const [size] = useState<SizeType>('middle')
  const [hovered, setHovered] = useState(false)

  // console.log(form)

  const createHealthFormMutation = useMutation({
    mutationFn: userApi.createHealthForm
  })
  const handleSubmit = async () => {
    const values = await form.validateFields()
    // console.log(values)
    try {
      const res: any = await createHealthFormMutation.mutateAsync(values)
      toast.success('Thêm thông tin thành công')
      localStorage.setItem('Id_form', res.data.data._id)
      // console.log('Sản phẩm gợi ý:', res.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  const getHealthFormDetail = useMutation({
    mutationFn: userApi.getHealthFormDetail
  })

  useEffect(() => {
    // Lấy user id từ local storage và cập nhật state
    const profileDataString = localStorage.getItem('profile')
    const profileData = profileDataString ? JSON.parse(profileDataString) : null
    const userIdFromLocalStorage = profileData ? profileData._id : ''
    setUserId(userIdFromLocalStorage)
  }, [])
  // console.log(userId)
  useEffect(() => {
    // Set initial values for form fields
    form.setFieldsValue({
      user: data ? data._id : userId,
      sex: data ? data.sex : undefined,
      height: data ? data.height : undefined,
      age: data ? data.age : undefined,
      weight: data ? data.weight : undefined,
      current_health_conditions: data ? data.current_health_conditions : undefined
      // ... set values for other fields
    })
  }, [data]) // Update form values when data changes

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mảng các sản phẩm đã mua (checkedPurchases)
  // const checkedPurchases = [...]; // Thay [... ] bằng mảng sản phẩm đã mua

  // Hàm mở modal
  const showModal = async () => {
    setIsModalOpen(true)
    const value = localStorage.getItem('Id_form') ?? ''

    try {
      const productDetail: any = await getHealthFormDetail.mutateAsync(value)
      setProducts(productDetail.data.products)
      setdata(productDetail.data.data)
      console.log(productDetail.data.data)
    } catch (error) {
      console.log(error, 'show')
    }
  }

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='rounded-md bg-white px-2 pb-10 shadow md:px-7 md:pb-20 font '>
      <div className='border-b border-b-gray-200 py-6 relative'>
        <h1 className='text-lg font-medium capitalize text-gray-900 '>
          <span className=' h-[25px] w-[25px] text-xl mr-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1dd442] via-[#0392ffd8] to-[#ffff0fd1]'>
            AI
          </span>
          Hỗ trợ tìm kiếm sản phẩm theo nhu cầu
        </h1>
        <div className='mt-1 text-sm text-gray-700'>Vui lòng nhập form thông tin dưới đây để được hỗ trợ</div>

        <Form form={form} onFinish={handleSubmit}>
          <div className='flex gap-2 w-full border border-gray-200 p-4 rounded-lg mt-3'>
            <div className='  flex flex-col gap-6 item-center justify-center w-[900px]'>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>ID</span>

                  <Form.Item name='user' initialValue={data ? data._id : userId} style={{ width: 250 }}>
                    <Input style={{ width: '100%' }} disabled />
                  </Form.Item>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Giới tính</span>
                  <Form.Item
                    name='sex'
                    initialValue={data ? data.sex : undefined}
                    rules={[{ required: true, message: 'Please input!' }]}
                  >
                    <Select
                      defaultValue={data ? data.sex : undefined}
                      style={{ width: 100 }}
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
                  <Form.Item
                    name='height'
                    rules={[{ required: true, message: 'Please input!' }]}
                    style={{ width: 250 }}
                    initialValue={data ? data.height : undefined}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </div>
              </div>
              <div className='flex gap-8'>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Tuổi</span>
                  <Form.Item
                    name='age'
                    rules={[{ required: true, message: 'Please input!' }]}
                    style={{ width: 100 }}
                    initialValue={data ? data.age : undefined}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Cân nặng</span>
                  <Form.Item
                    name='weight'
                    rules={[{ required: true, message: 'Please input!' }]}
                    style={{ width: 100 }}
                    initialValue={data ? data.weight : undefined}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[15px]'>Sản phẩm dị ứng:</span>
                  <Form.Item
                  //  name={['dietary_restrictions']}
                  >
                    <Select
                      mode='multiple'
                      size={size}
                      placeholder='Vui lòng nhập'
                      onChange={handleChange}
                      style={{ width: 380 }}
                      options={options2}
                    />
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
                    defaultValue={data ? data.current_health_conditions : undefined}
                  />
                </Form.Item>
              </div>
            </div>
            <div className='w-[50%] flex items-center justify-center'>
              <button
                // className=' w-[50%] h-[150px] text-gray-100  font-bold rounded-full bg-gradient-to-r from-[#1dd442] via-[#0392ffd8] to-[#ffff0fd1]'
                type='submit'
                className=' w-[50%] h-[150px]'
              >
                <img
                  src='https://png.pngtree.com/png-clipart/20230429/original/pngtree-robot-artificial-intelligence-technology-transparent-png-image_9123453.png'
                  alt=''
                  className={`w-[180px] h-[120px]  transform transition-transform duration-500 ease-in-out ${
                    hovered ? 'hover:animate-customAnimation' : ''
                  }`}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                />
              </button>
            </div>
            <div className='absolute top-0 right-0    text-gray-100  rounded-full bg-gradient-to-r from-[#1dd442] via-[#0392ffd8] to-[#ffff0fd1] w-[50px] h-[50px] flex justify-center items-center'>
              Mới
            </div>
          </div>
        </Form>
      </div>

      <div>
        <button
          onClick={() => showModal()}
          className='text-[20px] bg-gradient-to-l from-[#1dd442af] via-[#0392ffa4] to-[#ffff0fd1] rounded-xl p-2 mt-2 text-white'
        >
          Xem sản phẩm gợi ý
        </button>
        <Modal
          title=''
          width={1000}
          visible={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key='back' onClick={handleCloseModal}>
              Đóng
            </Button>
          ]}
        >
          <div className='flex flex-col border-2 border-gray-100 rounded-lg p-4 font'>
            <span className='text-center text-[16px] font-bold uppercase'>GỢI Ý CHU TRÌNH CHO BẠN</span>

            <div className='px-2 flex flex-col gap-3 mt-2 relative'>
              <div className='flex gap-6'>
                <span className='text-start text-[14px] font-semibold '>
                  Tên người dùng: <span className='font-normal'>{data?.user}</span>{' '}
                </span>
                <span className='text-start text-[14px] font-semibold '>
                  Tuổi : <span className='font-normal'>{data.age}</span>{' '}
                </span>
              </div>
              <div className='flex gap-6'>
                <span className='text-start text-[14px] font-semibold '>
                  Chiều cao: <span className='font-normal'>{data.height}</span>{' '}
                </span>
                <span className='text-start text-[14px] font-semibold '>
                  Cân nặng <span className='font-normal'>{data.weight}</span>{' '}
                </span>
              </div>
              <div className='flex gap-[54px]'>
                <span className='text-start text-[14px] font-semibold '>
                  Tình trạng bệnh
                  {data.current_health_conditions.map((condition) => (
                    <span className='font-normal ml-1'>{condition},</span>
                  ))}
                </span>
                <span className='text-start text-[14px] font-semibold '>
                  Sản phẩm dị ứng <span className='font-normal'>Sữa</span>{' '}
                </span>
              </div>
              <div className='absolute top-0 right-0'>
                {/* <img src={logo} alt='' className='w-[240px] h-[100px]' /> */}
              </div>
            </div>
            <div className='flex gap-[54px] px-2 mt-4 w-full'>
              <div className='text-start text-[14px] font-semibold border-2  border-gray-200 rounded-lg p-4 flex-[40%]'>
                Lời khuyên
                <div className='font-normal px-4'>
                  <ul className='list-disc'>
                    <li>
                      For the patient with chronic kidney disease (Suy thận), it is essential to focus on a low-sodium
                      diet, limit potassium intake, restrict protein consumption, and avoid phosphorus-rich foods.
                    </li>
                    <li>
                      For the patient with goiter (Bướu cổ) due to iodine deficiency, it is crucial to incorporate foods
                      rich in iodine, magnesium, minerals, and vitamins to support thyroid health.
                    </li>
                  </ul>
                </div>
              </div>
              <div className='text-start text-[14px] font-semibold border-2  border-gray-200 rounded-lg p-4  flex-[60%]'>
                Tình trạng bệnh
                <div className='font-normal px-4'>
                  <ul className='list-disc'>
                    <li>
                      Health_report: Based on the patient's current health conditions (Suy thận, Bướu cổ), additional
                      diseases they may encounter include:
                    </li>
                    <li>1. Chronic kidney disease (due to Suy thận) </li>
                    <li>2. Goiter (due to Bướu cổ)</li>
                    <li>
                      Given the patient's age, height, and weight, it is essential to monitor for any signs of growth
                      and development delays, nutritional deficiencies, and potential complications related to the
                      current illnesses. Regular follow-ups and appropriate management are crucial in maintaining the
                      patient's overall health and well-being.
                    </li>
                  </ul>
                </div>{' '}
              </div>
            </div>

            <table className='table-auto w-full mt-5 text-[12px] border-2 border-gray-100 rounded-lg p-4'>
              <thead>
                <tr>
                  <th className='px-4 py-2 text-center w-[10%] text-[12px]'>Sản phẩm</th>
                  <th className='px-4 py-2 text-center text-[12px]'>Ảnh</th>
                  <th className='px-4 py-2 text-center w-[40%] text-[12px]'>Tên sản phẩm</th>{' '}
                  <th className='px-4 py-2 text-center text-[12px]'>Công dụng</th>
                </tr>
              </thead>
              {products.map((product, index) => (
                <tbody>
                  <>
                    <tr>
                      <td className='px-4 py-2 text-center'>Sản phẩm {index + 1}</td>
                      <td className='px-4 py-2 text-center'>
                        <Image width={80} src={product.image} style={{ borderRadius: '5px' }} />
                      </td>

                      <td className='py-2 text-start pl-10'>{product?.name}</td>
                      <td className='px-4 py-2 text-start'>{product.ingredient}</td>
                    </tr>
                  </>
                </tbody>
              ))}
            </table>
            <div className='flex gap-[54px] px-2 mt-4 w-full items-center justify-center'>
              <div>
                <strong>
                  <em>Sức khỏe của bạn là trên hết. Vậy nên hãy chăm sóc bản thân mình nhé</em>
                </strong>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
