import { cn, cnMerge } from '@shared/util/cn'
import { cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface IDType {
  id: string | number
}

export interface TableColumn<T extends IDType> {
  header?: string
  headerRender?: () => ReactNode
  accessorKey?: keyof T
  align?: 'left' | 'center' | 'right'
  render?: (item: T) => ReactNode
}

interface TableProps<T extends IDType> {
  columns: TableColumn<T>[]
  data: T[]
  isLoading?: boolean
}

export const Table = <T extends IDType>({
  data,
  columns,
  isLoading,
}: TableProps<T>) => {
  return (
    <div className={containerCn}>
      <table className={tableCn}>
        <thead>
          <tr className={headRowCn}>
            {columns.map((column, index) => (
              <th
                key={(column.accessorKey as string) ?? index}
                className={cnMerge(
                  cellVariants({ align: column?.align }),
                  'font-medium',
                )}
              >
                {column.headerRender ? column.headerRender() : column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className={messageCellCn}>
                <div className={loadingCn}>
                  <LoaderCircle className={loadingIconCn} />
                </div>
              </td>
            </tr>
          ) : !data.length ? (
            <tr>
              <td colSpan={columns.length} className={messageCellCn}>
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map(item => (
              <tr key={item.id} className={bodyRowCn}>
                {columns.map((column, index) => (
                  <td
                    key={(column.accessorKey as string) ?? index}
                    className={cnMerge(cellVariants({ align: column?.align }))}
                  >
                    {column.render
                      ? column.render(item)
                      : (item[column.accessorKey!] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

const containerCn = cn`w-fit min-w-full rounded-sm border border-gray-200 overflow-hidden`

const tableCn = cn`w-full`

const headRowCn = cn`border-b border-gray-200 bg-white`

const messageCellCn = cn`h-48 text-center text-gray-500 bg-white`

const loadingCn = cn`flex items-center justify-center h-full`

const loadingIconCn = cn`size-8 animate-spin`

const bodyRowCn = cn`bg-white hover:bg-gray-50`

const cellVariants = cva(cn`h-12 p-2 text-sm text-gray-800`, {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'left',
  },
})
