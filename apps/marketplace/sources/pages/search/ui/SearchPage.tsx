import { ITEM_CATEGORY_LABELS } from '@entities/item/model/itemCategory'
import { ITEM_GRADE_LABELS } from '@entities/item/model/itemGrade'
import { PRODUCT_TYPE_LABELS } from '@features/product/model/productType'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { cn } from '@shared/util/cn'
import { ALL_SELECT_OPTION, withAll } from '@shared/util/form'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { ProductList } from '@widgets/product/ui/ProductList'
import { FunnelX, Search } from 'lucide-react'

export const SearchPage = () => {
  return (
    <MainLayout>
      <PageTop title="아이템 검색" description="원하는 아이템을 검색하세요." />
      <div className={formContainerCn}>
        <FormField label="이름">
          <Input icon={<Search className="size-4 text-gray-400" />} />
        </FormField>
        <div className={formColumnCn}>
          <FormField label="카테고리">
            <Select
              options={withAll(
                Object.entries(ITEM_CATEGORY_LABELS).map(([key, value]) => ({
                  label: value,
                  value: key,
                })),
              )}
              defaultValue={ALL_SELECT_OPTION.value}
            />
          </FormField>
          <FormField label="등급">
            <Select
              options={withAll(
                Object.entries(ITEM_GRADE_LABELS).map(([key, value]) => ({
                  label: value,
                  value: key,
                })),
              )}
              defaultValue={ALL_SELECT_OPTION.value}
            />
          </FormField>
          <FormField label="거래 유형">
            <Select
              options={withAll(
                Object.entries(PRODUCT_TYPE_LABELS).map(([key, value]) => ({
                  label: value,
                  value: key,
                })),
              )}
              defaultValue={ALL_SELECT_OPTION.value}
            />
          </FormField>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Button variant="primary" size="lg" className="order-2">
          <Search className="size-4" />
          검색
        </Button>
        <Button variant="ghost" size="lg" className="order-1">
          <FunnelX className="size-4" />
          필터 초기화
        </Button>
      </div>
      <ProductList />
    </MainLayout>
  )
}

const formContainerCn = cn`flex flex-col gap-2`

const formColumnCn = cn`grid grid-cols-1 tablet:grid-cols-3 gap-2`
