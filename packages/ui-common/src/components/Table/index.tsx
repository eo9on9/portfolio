import { cnMerge } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'

export interface IDType {
  id: string | number
}

export interface TableColumn<T extends IDType> {
  header?: string
  headerRender?: () => ReactNode
  accessorKey?: keyof T
  align?: 'left' | 'center' | 'right'
  render?: (item: T) => ReactNode
}

export interface TableProps<T extends IDType> {
  columns: TableColumn<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
}

export const Table = <T extends IDType>({
  data,
  columns,
  isLoading,
  emptyMessage,
}: TableProps<T>) => {
  return (
    <div className="w-fit min-w-full rounded-sm border border-gray-200 overflow-hidden font-pretendard">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-white">
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
              <td
                colSpan={columns.length}
                className="h-48 text-center text-gray-500 bg-white"
              >
                <div className="flex items-center justify-center h-full">
                  <LoaderCircle
                    className="size-8 animate-spin"
                    aria-label="now loading"
                  />
                </div>
              </td>
            </tr>
          ) : !data.length ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-48 text-center text-gray-500 bg-white"
              >
                {emptyMessage || '데이터가 없습니다.'}
              </td>
            </tr>
          ) : (
            data.map(item => (
              <tr key={item.id} className="bg-white hover:bg-gray-50">
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

const cellVariants = cva('h-12 p-2 text-sm text-gray-800', {
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
