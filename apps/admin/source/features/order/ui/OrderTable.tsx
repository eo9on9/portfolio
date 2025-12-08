import { Order } from '@entities/order/model/order'
import { ORDER_STATUS_LABELS } from '@entities/order/model/orderStatus'
import { ViewOrderModal } from '@features/order/ui/ViewOrderModal'
import { Beacon, Button } from '@repo/ui-common'
import { Table, TableColumn } from '@shared/ui/Table'
import { toDate } from '@shared/util/format'
import { Eye } from 'lucide-react'
import { useMemo, useState } from 'react'

interface OrderTableProps {
  data: Order[]
  isLoading?: boolean
}

export const OrderTable = ({ data, isLoading }: OrderTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOpenViewOrderModal, setIsOpenViewOrderModal] = useState(false)

  const tableColumns: TableColumn<Order>[] = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        align: 'center',
      },
      {
        header: 'Customer',
        accessorKey: 'customer',
      },
      {
        header: 'Product',
        accessorKey: 'product',
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
      },
      {
        header: 'Amount',
        render: row => `₩${row.amount.toLocaleString()}`,
      },
      {
        header: 'Ordered At',
        accessorKey: 'orderedAt',
        render: row => toDate(row.orderedAt),
      },
      {
        header: 'Status',
        render: row => `${ORDER_STATUS_LABELS[row.status]}`,
      },
      {
        headerRender: () => <Beacon>Actions</Beacon>,
        align: 'center',
        render: item => (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                setIsOpenViewOrderModal(true)
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
    <>
      <Table data={data} columns={tableColumns} isLoading={isLoading} />
      {selectedOrder && (
        <ViewOrderModal
          isOpen={isOpenViewOrderModal}
          onClose={() => setIsOpenViewOrderModal(false)}
          order={selectedOrder}
        />
      )}
    </>
  )
}
