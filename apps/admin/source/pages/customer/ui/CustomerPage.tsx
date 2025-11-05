import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { Select } from '@shared/ui/Select'
import { Table, TableColumn } from '@shared/ui/Table'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { Edit, FunnelX, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface TableData {
  id: number
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: 'active' | 'inactive'
}

const tableData: TableData[] = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    orders: 12,
    spent: 3400000,
    status: 'active',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    orders: 8,
    spent: 2100000,
    status: 'active',
  },
  {
    id: 3,
    name: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    orders: 15,
    spent: 5200000,
    status: 'active',
  },
  {
    id: 4,
    name: '정수진',
    email: 'jung@example.com',
    phone: '010-4567-8901',
    orders: 5,
    spent: 1800000,
    status: 'inactive',
  },
  {
    id: 5,
    name: '최동욱',
    email: 'choi@example.com',
    phone: '010-5678-9012',
    orders: 20,
    spent: 7600000,
    status: 'active',
  },
  {
    id: 6,
    name: '강미나',
    email: 'kang@example.com',
    phone: '010-6789-0123',
    orders: 3,
    spent: 900000,
    status: 'active',
  },
  {
    id: 7,
    name: '윤서준',
    email: 'yoon@example.com',
    phone: '010-7890-1234',
    orders: 10,
    spent: 4300000,
    status: 'active',
  },
  {
    id: 8,
    name: '임하늘',
    email: 'lim@example.com',
    phone: '010-8901-2345',
    orders: 7,
    spent: 2500000,
    status: 'inactive',
  },
]

const tableColumns: TableColumn<TableData>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    align: 'center',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    header: 'Orders',
    accessorKey: 'orders',
  },
  {
    header: 'Spent',
    accessorKey: 'spent',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Actions',
    align: 'center',
    render: () => (
      <div className="flex items-center justify-center gap-1">
        <Button variant="ghost" size="md">
          <Edit className="w-4 h-4 text-gray-800" />
        </Button>
        <Button variant="ghost" size="md">
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>
    ),
  },
]

export const CustomerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <MainLayout>
      <PageTop
        title="고객 관리"
        description="전체 고객 정보를 관리합니다."
        actions={
          <Beacon>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              고객 추가
            </Button>
          </Beacon>
        }
      />
      {/* Filter */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="이름">
          <Input />
        </FormField>
        <FormField label="이메일">
          <Input />
        </FormField>
        <FormField label="전화번호">
          <Input />
        </FormField>
        <FormField label="상태">
          <Select
            options={[
              { label: '전체', value: 'all' },
              { label: '활성', value: 'active' },
              { label: '비활성', value: 'inactive' },
            ]}
            defaultValue="all"
          />
        </FormField>
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
      <div className="flex flex-col gap-2">
        <Table data={tableData} columns={tableColumns} />
      </div>
      {/* Pagination */}
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
        title="고객 추가"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <FormField label="이름">
              <Input placeholder="고객 이름을 입력하세요" />
            </FormField>
            <FormField label="이메일">
              <Input placeholder="example@email.com" />
            </FormField>
            <FormField label="전화번호">
              <Input placeholder="010-0000-0000" />
            </FormField>
          </div>
          <Button variant="primary" size="lg">
            추가하기
          </Button>
        </div>
      </Modal>
    </MainLayout>
  )
}
