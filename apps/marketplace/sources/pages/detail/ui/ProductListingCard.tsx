import { Product } from '@features/product/model/product'
import { KindOfProductType } from '@features/product/model/productType'
import { Button } from '@shared/ui/Button'
import { Table, TableColumn } from '@shared/ui/Table'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { cn } from '@shared/util/cn'
import { toAgo } from '@shared/util/format'
import { MessageSquare } from 'lucide-react'
import { useMemo, useState } from 'react'

const DATA: Product[] = [
  {
    id: '1',
    itemKey: 'woodenSword',
    type: 'sell',
    listedBy: 'seller1',
    price: 100,
    amount: 1,
    createdAt: 1763530721716,
  },
  {
    id: '2',
    itemKey: 'woodenSword',
    type: 'sell',
    listedBy: 'seller2',
    price: 200,
    amount: 2,
    createdAt: 1763530721716,
  },
  {
    id: '3',
    itemKey: 'woodenSword',
    type: 'sell',
    listedBy: 'seller3',
    price: 300,
    amount: 3,
    createdAt: 1763530721716,
  },
  {
    id: '4',
    itemKey: 'woodenSword',
    type: 'buy',
    listedBy: 'buyer1',
    price: 400,
    amount: 4,
    createdAt: 1763530721716,
  },
  {
    id: '5',
    itemKey: 'woodenSword',
    type: 'buy',
    listedBy: 'buyer2',
    price: 500,
    amount: 5,
    createdAt: 1763530721716,
  },
]

export const ProductListingCard = () => {
  const [type, setType] = useState<KindOfProductType>('sell')

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        header: type === 'sell' ? '판매자' : '구매자',
        accessorKey: 'listedBy',
        align: 'center',
      },
      {
        header: '가격',
        accessorKey: 'price',
        align: 'center',
      },
      {
        header: '수량',
        accessorKey: 'amount',
        align: 'center',
      },
      {
        header: '등록시간',
        align: 'center',
        render: item => toAgo(item.createdAt),
      },
      {
        header: '액션',
        align: 'center',
        render: () => (
          <Button variant="ghost">
            <MessageSquare className="size-4" />
          </Button>
        ),
      },
    ],
    [type],
  )

  const sellData = useMemo(() => DATA.filter(item => item.type === 'sell'), [])
  const buyData = useMemo(() => DATA.filter(item => item.type === 'buy'), [])

  return (
    <div className={containerCn}>
      <ToggleGroup
        options={[
          { label: '판매 목록 (1)', value: 'sell' },
          { label: '구매 목록 (2)', value: 'buy' },
        ]}
        fill
        value={type}
        onChange={value => setType(value as KindOfProductType)}
      />
      <div className={scrollCn}>
        <div className={tableWrapCn}>
          <Table
            data={type === 'sell' ? sellData : buyData}
            columns={columns}
          />
        </div>
      </div>
    </div>
  )
}

const containerCn = cn`flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-sm`

const scrollCn = cn`overflow-x-auto`

const tableWrapCn = cn`w-full min-w-sm`
