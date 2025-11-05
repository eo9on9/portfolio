import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Table, TableColumn } from '@shared/ui/Table'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { FunnelX, Search } from 'lucide-react'

interface OrderData {
  id: string
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
    customer: '김철수',
    product: '무선 이어폰',
    quantity: 2,
    amount: '₩300,000',
    date: '2025-10-28',
    status: '배송중',
  },
  {
    id: 'ORD-002',
    customer: '이영희',
    product: '블루투스 키보드',
    quantity: 1,
    amount: '₩120,000',
    date: '2025-10-28',
    status: '배송완료',
  },
  {
    id: 'ORD-003',
    customer: '박민수',
    product: '게이밍 마우스',
    quantity: 1,
    amount: '₩80,000',
    date: '2025-10-27',
    status: '준비중',
  },
  {
    id: 'ORD-004',
    customer: '정수진',
    product: '스마트 워치',
    quantity: 1,
    amount: '₩280,000',
    date: '2025-10-27',
    status: '배송중',
  },
  {
    id: 'ORD-005',
    customer: '최동욱',
    product: 'USB-C 허브',
    quantity: 3,
    amount: '₩195,000',
    date: '2025-10-26',
    status: '배송완료',
  },
  {
    id: 'ORD-006',
    customer: '강미나',
    product: '휴대폰 케이스',
    quantity: 2,
    amount: '₩50,000',
    date: '2025-10-26',
    status: '배송중',
  },
  {
    id: 'ORD-007',
    customer: '윤서준',
    product: '보조배터리',
    quantity: 1,
    amount: '₩45,000',
    date: '2025-10-25',
    status: '취소됨',
  },
  {
    id: 'ORD-008',
    customer: '임하늘',
    product: '노트북 파우치',
    quantity: 1,
    amount: '₩35,000',
    date: '2025-10-25',
    status: '배송완료',
  },
  {
    id: 'ORD-009',
    customer: '김철수',
    product: '게이밍 마우스',
    quantity: 1,
    amount: '₩80,000',
    date: '2025-10-24',
    status: '배송중',
  },
  {
    id: 'ORD-010',
    customer: '박민수',
    product: '무선 이어폰',
    quantity: 1,
    amount: '₩150,000',
    date: '2025-10-24',
    status: '준비중',
  },
]

const tableColumns: TableColumn<OrderData>[] = [
  { header: 'ID', accessorKey: 'id', align: 'center' },
  { header: 'Customer', accessorKey: 'customer' },
  { header: 'Product', accessorKey: 'product' },
  { header: 'Quantity', accessorKey: 'quantity' },
  { header: 'Amount', accessorKey: 'amount' },
  { header: 'Date', accessorKey: 'date' },
  { header: 'Status', accessorKey: 'status' },
]

export const OrderPage = () => {
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
    </MainLayout>
  )
}
