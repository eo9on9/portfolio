import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { Select } from '@shared/ui/Select'
import { Table, TableColumn } from '@shared/ui/Table'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { Eye, FunnelX, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

interface OrderData {
  id: string
  orderedAt: string
  customer: string
  product: string
  quantity: number
  amount: string
  date: string
  status: string
}

const data: OrderData[] = [
  {
    id: 'ORD-001',
    orderedAt: '2025-10-28',
    customer: '김철수',
    product: '무선 이어폰',
    quantity: 2,
    amount: '₩300,000',
    date: '2025-10-28',
    status: 'shipping',
  },
  {
    id: 'ORD-002',
    orderedAt: '2025-10-28',
    customer: '이영희',
    product: '블루투스 키보드',
    quantity: 1,
    amount: '₩120,000',
    date: '2025-10-28',
    status: 'delivered',
  },
  {
    id: 'ORD-003',
    orderedAt: '2025-10-27',
    customer: '박민수',
    product: '게이밍 마우스',
    quantity: 1,
    amount: '₩80,000',
    date: '2025-10-27',
    status: 'preparing',
  },
  {
    id: 'ORD-004',
    orderedAt: '2025-10-27',
    customer: '정수진',
    product: '스마트 워치',
    quantity: 1,
    amount: '₩280,000',
    date: '2025-10-27',
    status: 'shipping',
  },
  {
    id: 'ORD-005',
    orderedAt: '2025-10-26',
    customer: '최동욱',
    product: 'USB-C 허브',
    quantity: 3,
    amount: '₩195,000',
    date: '2025-10-26',
    status: 'delivered',
  },
  {
    id: 'ORD-006',
    orderedAt: '2025-10-26',
    customer: '강미나',
    product: '휴대폰 케이스',
    quantity: 2,
    amount: '₩50,000',
    date: '2025-10-26',
    status: 'shipping',
  },
  {
    id: 'ORD-007',
    orderedAt: '2025-10-25',
    customer: '윤서준',
    product: '보조배터리',
    quantity: 1,
    amount: '₩45,000',
    date: '2025-10-25',
    status: 'canceled',
  },
  {
    id: 'ORD-008',
    orderedAt: '2025-10-25',
    customer: '임하늘',
    product: '노트북 파우치',
    quantity: 1,
    amount: '₩35,000',
    date: '2025-10-25',
    status: 'delivered',
  },
  {
    id: 'ORD-009',
    orderedAt: '2025-10-24',
    customer: '김철수',
    product: '게이밍 마우스',
    quantity: 1,
    amount: '₩80,000',
    date: '2025-10-24',
    status: 'shipping',
  },
  {
    id: 'ORD-010',
    orderedAt: '2025-10-24',
    customer: '박민수',
    product: '무선 이어폰',
    quantity: 1,
    amount: '₩150,000',
    date: '2025-10-24',
    status: 'preparing',
  },
]

export const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tableColumns: TableColumn<OrderData>[] = useMemo(
    () => [
      { header: 'ID', accessorKey: 'id', align: 'center' },
      { header: 'Customer', accessorKey: 'customer' },
      { header: 'Product', accessorKey: 'product' },
      { header: 'Quantity', accessorKey: 'quantity' },
      { header: 'Amount', accessorKey: 'amount' },
      { header: 'Date', accessorKey: 'date' },
      { header: 'Status', accessorKey: 'status' },
      {
        header: 'Actions',
        align: 'center',
        render: item => (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                setIsModalOpen(true)
                setSelectedOrder(item)
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <MainLayout>
      <PageTop title="주문 관리" description="전체 주문 내역을 관리합니다." />
      <div className="grid grid-cols-[5fr_3fr] gap-4">
        <Input placeholder="주문 검색 (주문 번호, 고객명, 상품명)" />
        <Select
          options={[
            { label: '전체 상태', value: 'all' },
            { label: '준비중', value: 'preparing' },
            { label: '배송중', value: 'shipping' },
            { label: '배송완료', value: 'delivered' },
            { label: '취소됨', value: 'canceled' },
          ]}
          defaultValue="all"
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Beacon>
          <Button variant="ghost" size="lg">
            <FunnelX className="w-4 h-4" />
            필터 초기화
          </Button>
        </Beacon>
        <Beacon>
          <Button variant="primary" size="lg">
            <Search className="w-4 h-4" />
            검색
          </Button>
        </Beacon>
      </div>
      <Table data={data} columns={tableColumns} />
      <div className="flex items-center justify-center gap-1">
        <Button variant="ghost" size="md">
          1
        </Button>
        <Button variant="primary" size="md">
          2
        </Button>
        <Button variant="ghost" size="md">
          3
        </Button>
        <Button variant="ghost" size="md">
          4
        </Button>
        <Button variant="ghost" size="md">
          5
        </Button>
      </div>
      <Modal
        title="주문 상세 정보"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <FormField label="주문 번호">
                <Input value={selectedOrder?.id} readOnly />
              </FormField>
              <FormField label="주문일">
                <Input value={selectedOrder?.orderedAt} readOnly />
              </FormField>
              <FormField label="고객명">
                <Input value={selectedOrder?.customer} readOnly />
              </FormField>
              <FormField label="상품명">
                <Input value={selectedOrder?.product} readOnly />
              </FormField>
              <FormField label="수량">
                <Input value={selectedOrder?.quantity} readOnly />
              </FormField>
              <FormField label="금액">
                <Input value={selectedOrder?.amount} readOnly />
              </FormField>
              <FormField label="날짜">
                <Input value={selectedOrder?.date} readOnly />
              </FormField>
            </div>
            <FormField label="상태">
              <Select
                options={[
                  { label: '전체 상태', value: 'all' },
                  { label: '준비중', value: 'preparing' },
                  { label: '배송중', value: 'shipping' },
                  { label: '배송완료', value: 'delivered' },
                  { label: '취소됨', value: 'canceled' },
                ]}
                defaultValue={selectedOrder?.status}
              />
            </FormField>
          </div>
          <Button variant="primary" size="lg">
            상태 업데이트
          </Button>
        </div>
      </Modal>
    </MainLayout>
  )
}
