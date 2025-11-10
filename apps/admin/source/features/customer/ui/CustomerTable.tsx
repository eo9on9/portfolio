import { Customer } from '@entities/customer/model/customer'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { Table, TableColumn } from '@shared/ui/Table'
import { Edit, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { RemoveCustomerModal } from './RemoveCustomerModal'

interface CustomerTableProps {
  data: Customer[]
  isLoading: boolean
}

export const CustomerTable = ({ data, isLoading }: CustomerTableProps) => {
  const [isOpenRemoveCustomerModal, setIsOpenRemoveCustomerModal] =
    useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  )

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
        // header: 'Actions',
        headerRender: () => <Beacon>Actions</Beacon>,
        align: 'center',
        render: row => (
          <div className="flex items-center justify-center gap-1">
            <Button variant="ghost" size="md">
              <Edit className="w-4 h-4 text-gray-800" />
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                setSelectedCustomer(row)
                setIsOpenRemoveCustomerModal(true)
              }}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  )
  return (
    <>
      <Table data={data} columns={tableColumns} isLoading={isLoading} />
      <RemoveCustomerModal
        isOpen={isOpenRemoveCustomerModal}
        onClose={() => setIsOpenRemoveCustomerModal(false)}
        customer={selectedCustomer}
      />
    </>
  )
}
