import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { useMutation } from 'react-query'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import styles from 'src/Styles/Login.module.scss'
import { useContext } from 'react'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        toast.success('Tài khoản đăng ký thành công!', {
          autoClose: 1300 // Tự động đóng thông báo sau 2 giây
        })
        navigate('/login')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
        toast.error('Tài khoản đăng thất bại!', {
          autoClose: 1300 // Tự động đóng thông báo sau 2 giây
        })
      }
    })
  })
  return (
    <div className='bg-whiteblue bg-cover bg-center min-h-screen flex items-center justify-center'>
      <div className=' max-w-md mx-auto px-4 lg:w-1/3'>
        <form
          className='bg-[#fdfdfd] p-10  bg-transparent shadow-md border border-gray-300 rounded-lg basis-1/2'
          onSubmit={onSubmit}
          noValidate
        >
          <div className='text-2xl'>Đăng ký</div>
          <div className='mt-8'>
            <Input
              type='email'
              register={register}
              name='email'
              className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='Email'
              errorMessage={errors.email?.message}
            />
            <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
          </div>
          <div className='mt-3'>
            <Input
              type='password'
              name='password'
              className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='Password'
              errorMessage={errors.email?.message}
            />
            <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
          </div>
          <div className='mt-3'>
            <Input
              type='password'
              name='confirm_password'
              register={register}
              className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='Confirm Password'
              errorMessage={errors.email?.message}
            />
            <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
          </div>
          <div className='mt-3'>
            <button className='w-full text-center py-4 px-2 uppercase bg-[#1CA7EC] text-white text-sm hover:bg-[#4ADEDE]'>
              Đăng ký
            </button>
          </div>
          <div className='flex items-center justify-center mt-8'>
            <span className='text-gray-400'>Bạn đã có tài khoản?</span>
            <Link
              className='text-[#1CA7EC] ml-1'
              to='/login'
              onClick={() => {
                window.scrollTo(0, 0)
              }}
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
