import { cn } from '@shared/util/cn'
import { cva } from 'class-variance-authority'
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
}

export const Table = <T extends IDType>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <div className="w-fit min-w-full rounded-md border border-gray-300 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300 bg-white">
              {columns.map(column => (
                <th
                  key={column.accessorKey as string}
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
            {data.map(item => (
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
            ))}
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
