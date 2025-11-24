import { KindOfItemKey } from '@entities/item/model/itemKey'
import { getListing } from '@features/product/api/getListing'
import { Product } from '@features/product/model/product'
import {
  KindOfProductType,
  PRODUCT_TYPE_LABELS,
} from '@features/product/model/productType'
import { Button } from '@shared/ui/Button'
import { Table, TableColumn } from '@shared/ui/Table'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { toAgo, toPrice } from '@shared/util/format'
import { useQuery } from '@tanstack/react-query'
import { MessageSquare } from 'lucide-react'
import { useMemo, useState } from 'react'

interface ProductListingCardProps {
  itemKey: KindOfItemKey
}

export const ProductListingCard = ({ itemKey }: ProductListingCardProps) => {
  const [type, setType] = useState<KindOfProductType>('sell')

  const { data } = useQuery({
    queryKey: ['listing', itemKey],
    queryFn: () => getListing({ itemKey }),
    enabled: !!itemKey,
  })

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        header: type === 'sell' ? '판매자' : '구매자',
        accessorKey: 'listedBy',
        align: 'center',
      },
      {
        header: '가격',
        align: 'center',
        render: item => `${toPrice(item.price)} G`,
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

  const sellData = useMemo(
    () => data?.products.filter(item => item.type === 'sell') ?? [],
    [data],
  )
  const buyData = useMemo(
    () => data?.products.filter(item => item.type === 'buy') ?? [],
    [data],
  )

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-sm">
      <ToggleGroup
        options={[
          {
            label: `${PRODUCT_TYPE_LABELS['sell']} 목록 (${sellData?.length ?? 0})`,
            value: 'sell',
          },
          {
            label: `${PRODUCT_TYPE_LABELS['buy']} 목록 (${buyData?.length ?? 0})`,
            value: 'buy',
          },
        ]}
        fill
        value={type}
        onChange={value => setType(value as KindOfProductType)}
      />
      <div className="overflow-x-auto">
        <div className="w-full min-w-sm">
          <Table
            data={type === 'sell' ? sellData : buyData}
            columns={columns}
          />
        </div>
      </div>
    </div>
  )
}
