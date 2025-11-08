import { Customer } from '@entities/customer/model/customer'
import { Button } from '@shared/ui/Button'
import { Table, TableColumn } from '@shared/ui/Table'
import { Edit, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

interface CustomerTableProps {
  data: Customer[]
  isLoading: boolean
}

export const CustomerTable = ({ data, isLoading }: CustomerTableProps) => {
  const tableColumns: TableColumn<Customer>[] = useMemo(
    () => [
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
    ],
    [],
  )
  return <Table data={data} columns={tableColumns} isLoading={isLoading} />
}
