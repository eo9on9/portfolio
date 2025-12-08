import { KindOfItemKey } from '@entities/item/model/itemKey'
import { getItemListing } from '@features/product/api/getItemListing'
import { Product } from '@features/product/model/product'
import {
  PRODUCT_TYPE,
  PRODUCT_TYPE_LABELS,
} from '@features/product/model/productType'
import { SendProductMessageModal } from '@features/product/ui/SendProductMessageModal'
import { Beacon } from '@repo/ui-common'
import { MY_NAME } from '@shared/constant/user'
import { useQueryParams } from '@shared/hook/useQueryParams'
import { useReplaceQueryParams } from '@shared/hook/useReplaceQueryParams'
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

interface ProductTableData extends Product {
  id: string
}

export const ProductListingCard = ({ itemKey }: ProductListingCardProps) => {
  const replaceQueryParams = useReplaceQueryParams()
  const type = useQueryParams('type') ?? PRODUCT_TYPE[0]
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { data } = useQuery({
    queryKey: ['product', 'listing', itemKey],
    queryFn: () => getItemListing({ itemKey }),
    enabled: !!itemKey,
  })

  const productsWithId: ProductTableData[] = useMemo(
    () =>
      data?.products.map(product => ({
        ...product,
        id: product.productId,
      })) ?? [],
    [data],
  )

  const columns: TableColumn<ProductTableData>[] = useMemo(
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
        render: item => (
          <Beacon>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedProduct(item)
                setModalOpen(true)
              }}
              disabled={item.listedBy === MY_NAME}
            >
              <MessageSquare className="size-4" />
            </Button>
          </Beacon>
        ),
      },
    ],
    [type],
  )

  const sellData = useMemo(
    () => productsWithId.filter(item => item.type === 'sell') ?? [],
    [productsWithId],
  )
  const buyData = useMemo(
    () => productsWithId.filter(item => item.type === 'buy') ?? [],
    [productsWithId],
  )

  return (
    <>
      <div className="flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-sm">
        <Beacon>
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
            value={type}
            onChange={value => replaceQueryParams({ type: value })}
            fill
          />
        </Beacon>
        <div className="overflow-x-auto">
          <div className="w-full min-w-sm">
            <Table
              data={type === 'sell' ? sellData : buyData}
              columns={columns}
            />
          </div>
        </div>
      </div>
      {selectedProduct && (
        <SendProductMessageModal
          product={selectedProduct}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
