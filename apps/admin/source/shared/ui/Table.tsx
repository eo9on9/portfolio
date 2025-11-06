import { cn } from '@shared/util/cn'
import { cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface IDType {
  id: string | number
}

export interface TableColumn<T extends IDType> {
  header: string
  accessorKey?: keyof T
  align?: 'left' | 'center' | 'right'
  render?: (item: T) => ReactNode
}

interface TableProps<T extends IDType> {
  columns: TableColumn<T>[]
  data: T[]
  isLoading?: boolean
  // loadingMessage?: string
  // emptyMessage?: string
}

export const Table = <T extends IDType>({
  data,
  columns,
  isLoading,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <div className="w-fit min-w-full rounded-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              {columns.map((column, index) => (
                <th
                  key={(column.accessorKey as string) ?? index}
                  className={cn(
                    cellCn({ align: column?.align }),
                    'h-12 font-medium',
                  )}
                >
                  {column.header}
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
                    <LoaderCircle className="w-8 h-8 animate-spin" />
                  </div>
                </td>
              </tr>
            ) : !data.length ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-48 text-center text-gray-500 bg-white"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              data.map(item => (
                <tr key={item.id} className="bg-white hover:bg-gray-50">
                  {columns.map((column, index) => (
                    <td
                      key={(column.accessorKey as string) ?? index}
                      className={cn(cellCn({ align: column?.align }), 'h-12')}
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
    </div>
  )
}

const cellCn = cva('p-2 text-sm text-gray-800', {
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
