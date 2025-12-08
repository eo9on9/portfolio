import { Customer } from '@entities/customer/model/customer'
import { CUSTOMER_STATUS_LABELS } from '@entities/customer/model/customerStatus'
import { Beacon, Button } from '@repo/ui-common'
import { Table, TableColumn } from '@shared/ui/Table'
import { Edit, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { RemoveCustomerModal } from './RemoveCustomerModal'
import { UpdateCustomerModal } from './UpdateCustomerModal'

interface CustomerTableProps {
  data: Customer[]
  isLoading?: boolean
}

export const CustomerTable = ({ data, isLoading }: CustomerTableProps) => {
  const [isOpenRemoveCustomerModal, setIsOpenRemoveCustomerModal] =
    useState(false)
  const [isOpenUpdateCustomerModal, setIsOpenUpdateCustomerModal] =
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
        render: row => `₩${row.spent.toLocaleString()}`,
      },
      {
        header: 'Status',
        render: row => `${CUSTOMER_STATUS_LABELS[row.status]}`,
      },
      {
        headerRender: () => <Beacon>Actions</Beacon>,
        align: 'center',
        render: row => (
          <div className="flex items-center justify-center gap-1">
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                setSelectedCustomer(row)
                setIsOpenUpdateCustomerModal(true)
              }}
            >
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
      {selectedCustomer && (
        <UpdateCustomerModal
          isOpen={isOpenUpdateCustomerModal}
          onClose={() => setIsOpenUpdateCustomerModal(false)}
          customer={selectedCustomer}
        />
      )}
      {selectedCustomer && (
        <RemoveCustomerModal
          isOpen={isOpenRemoveCustomerModal}
          onClose={() => setIsOpenRemoveCustomerModal(false)}
          customer={selectedCustomer}
        />
      )}
    </>
  )
}
