import { useQuery } from 'react-query'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { orderStatus, purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import paymentApi from 'src/apis/payment.api'

const purchaseTabs = [
  { status: orderStatus.all, name: 'Tất cả' },
  { status: orderStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: orderStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: orderStatus.inProgress, name: 'Đang giao' },
  { status: orderStatus.delivered, name: 'Đã giao' },
  { status: orderStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || orderStatus.all

  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentApi.getPayment()
  })
  // console.log(payments)

  // console.log(purchasesInCartData)
  const orders = payments?.data.data
  console.log([orders])

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-rose-400 text-rose-400': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {orders?.map((order) => (
              <div key={order._id} className='mt-4 rounded-sm border-black/10 bg-gray-300 p-6 text-gray-800 shadow-sm'>
                {order.purchase.map((purchaseItem) => (
                  <>
                    <div>
                      <Link
                        to={`${path.home}${generateNameId({ name: purchaseItem?.product?.name, id: purchaseItem.product?._id })}`}
                        className='flex'
                      >
                        <div className='flex gap-2'>
                          <div className='flex-shrink-0  mb-5'>
                            <img
                              className='h-20 w-20 object-cover'
                              src={purchaseItem?.product?.image}
                              alt={purchaseItem?.product?.name}
                            />
                          </div>
                          <div className='ml-3 flex-grow overflow-hidden '>
                            <div className='truncate'>{purchaseItem?.product?.name}</div>
                            <div className='mt-10'>x{purchaseItem?.buy_count}</div>
                          </div>
                          <div className='ml-3 flex-shrink-0'>
                            <span className='truncate text-gray-500 line-through'>
                              ₫{formatCurrency(purchaseItem?.product?.price_before_discount)}
                            </span>
                            <span className='ml-2 truncate text-blue'>
                              ₫{formatCurrency(purchaseItem?.product?.price)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className='flex justify-end'>
                      <div>
                        <span>Tổng giá tiền</span>
                        <span className='ml-4 text-xl text-blue'>
                          ₫{formatCurrency(purchaseItem?.price * purchaseItem.buy_count)}
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
