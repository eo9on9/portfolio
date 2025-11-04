import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'

interface IDType {
  id: string | number
}

export interface TableColumn<T extends IDType> {
  header: string
  accessorKey: keyof T
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T extends IDType> {
  columns: TableColumn<T>[]
  data: T[]
}

export const Table = <T extends IDType>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <div className="border border-gray-300 rounded-md">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              {columns.map(column => (
                <th
                  key={column.accessorKey as string}
                  className={tableCellVariants({ align: column?.align })}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr
                key={item.id}
                className="border-b border-gray-300 last:border-b-0"
              >
                {columns.map(column => (
                  <td
                    key={column.accessorKey as string}
                    className={tableCellVariants({ align: column?.align })}
                  >
                    {item[column.accessorKey] as ReactNode}
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

const tableCellVariants = cva('p-2 text-sm text-gray-800', {
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
