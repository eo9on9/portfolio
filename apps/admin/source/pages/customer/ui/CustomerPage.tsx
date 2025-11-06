import { getCustomers } from '@entities/customer/api/getCustomers'
import { Customer } from '@entities/customer/model/customer'
import {
  CUSTOMER_STATUS,
  CUSTOMER_STATUS_LABELS,
  KindOfCustomerStatus,
} from '@entities/customer/model/customerStatus'
import { AddCustomerModal } from '@features/customer/ui/AddCustomerModal'
import {
  VALIDATION_EMAIL,
  VALIDATION_NAME,
  VALIDATION_PHONE,
} from '@shared/constant/validation'
import { useStableLoading } from '@shared/hook/useStableLoading'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Pagination } from '@shared/ui/Pagination'
import { Select, SelectOption } from '@shared/ui/Select'
import { Table, TableColumn } from '@shared/ui/Table'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { Edit, FunnelX, Plus, Search, Trash2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const tableColumns: TableColumn<Customer>[] = [
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

interface CustomerFilterForm {
  name: string
  email: string
  phone: string
  status: KindOfCustomerStatus | 'all'
  page: number
}

const STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  ...CUSTOMER_STATUS.map(
    status =>
      ({
        label: CUSTOMER_STATUS_LABELS[status],
        value: status,
      }) as SelectOption,
  ),
]

export const CustomerPage = () => {
  const router = useRouter()
  const params = useSearchParams()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryObj: CustomerFilterForm = useMemo(() => {
    return {
      name: params.get('name') ?? '',
      email: params.get('email') ?? '',
      phone: params.get('phone') ?? '',
      status: (params.get('status') as KindOfCustomerStatus) ?? 'all',
      page: parseInt(params.get('page') ?? '1'),
    }
  }, [params])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['customers', queryObj],
    queryFn: () =>
      getCustomers({
        name: queryObj.name === '' ? undefined : queryObj.name,
        email: queryObj.email === '' ? undefined : queryObj.email,
        phone: queryObj.phone === '' ? undefined : queryObj.phone,
        status: queryObj.status === 'all' ? undefined : queryObj.status,
        page: queryObj.page,
      }),
    refetchOnWindowFocus: false,
  })

  const { isStableLoading } = useStableLoading(isLoading || isFetching)

  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFilterForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: 'all',
      page: 1,
    },
  })

  const handleSearch = handleSubmit(data => {
    const q = new URLSearchParams()
    if (data.name?.trim()) q.set('name', data.name.trim())
    if (data.email?.trim()) q.set('email', data.email.trim())
    if (data.phone?.trim()) q.set('phone', data.phone.trim())
    if (data.status) q.set('status', data.status)
    if (data.page) q.set('page', data.page.toString())
    const qs = q.toString()
    router.push(qs ? `?${qs}` : '?')
  })

  useEffect(() => {}, [])

  useEffect(() => {
    reset(queryObj)
  }, [queryObj, reset])

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
      <div className="grid grid-cols-2 gap-2">
        <FormField label="이름" errorMessage={errors.name?.message}>
          <Input
            placeholder="고객 이름을 입력하세요"
            isError={!!errors.name}
            {...register('name', {
              pattern: {
                value: VALIDATION_NAME.pattern,
                message: VALIDATION_NAME.message,
              },
            })}
          />
        </FormField>
        <FormField label="이메일" errorMessage={errors.email?.message}>
          <Input
            placeholder="example@email.com"
            isError={!!errors.email}
            {...register('email', {
              pattern: {
                value: VALIDATION_EMAIL.pattern,
                message: VALIDATION_EMAIL.message,
              },
            })}
          />
        </FormField>
        <FormField label="전화번호" errorMessage={errors.phone?.message}>
          <Input
            placeholder="01012345678"
            isError={!!errors.phone}
            {...register('phone', {
              pattern: {
                value: VALIDATION_PHONE.pattern,
                message: VALIDATION_PHONE.message,
              },
            })}
          />
        </FormField>
        <FormField label="상태">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select options={STATUS_OPTIONS} {...field} />
            )}
          />
        </FormField>
      </div>

      {/* Filter Actions */}
      <div className="flex items-center gap-2 justify-between">
        <Beacon>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              reset({
                name: '',
                email: '',
                phone: '',
                status: 'all',
                page: 1,
              })
              handleSearch()
            }}
          >
            <FunnelX className="w-4 h-4" />
            필터 초기화
          </Button>
        </Beacon>
        <Beacon>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              setValue('page', 1)
              handleSearch()
            }}
          >
            <Search className="w-4 h-4" />
            검색
          </Button>
        </Beacon>
      </div>

      {/* Table */}
      <Table
        data={data?.customers ?? []}
        columns={tableColumns}
        isLoading={isStableLoading}
      />

      {/* Pagination */}
      <Controller
        control={control}
        name="page"
        render={({ field }) => (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            currentPage={field.value}
            onPageChange={page => {
              field.onChange(page)
              handleSearch()
            }}
          />
        )}
      />

      {/* Modals */}
      <AddCustomerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainLayout>
  )
}
