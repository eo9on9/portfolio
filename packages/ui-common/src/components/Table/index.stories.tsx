import type { Meta, StoryObj } from '@storybook/react-vite'
import { Edit, Eye } from 'lucide-react'
import { Table, type TableColumn } from '.'
import { Button } from '../Button'

type SampleData = {
  id: string
  name: string
  age: number
  email: string
}

const SAMPLE_COLUMNS: TableColumn<SampleData>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Age', accessorKey: 'age', align: 'center' },
  { header: 'Email', accessorKey: 'email', align: 'center' },
  {
    headerRender: () => <div className="text-center">Action</div>,
    render: item => (
      <div className="flex items-center justify-center gap-2">
        <Button variant="ghost" onClick={() => alert(JSON.stringify(item))}>
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" onClick={() => alert(JSON.stringify(item))}>
          <Edit className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
]

const SAMPLE_DATA: SampleData[] = [
  { id: '1', name: 'John Doe', age: 25, email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
  { id: '3', name: 'Jim Beam', age: 35, email: 'jim.beam@example.com' },
]

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: false,
      description: 'The columns to be displayed in the table',
      table: {
        type: { summary: 'TableColumn<DataType>[]' },
      },
    },
    data: {
      control: false,
      description: 'The data to be displayed in the table',
      table: {
        type: { summary: 'DataType[]' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the table is loading',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'The message to be displayed when the table is empty',
      table: {
        defaultValue: { summary: '데이터가 없습니다.' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_DATA,
    isLoading: false,
    emptyMessage: '데이터가 없습니다.',
  },
} satisfies Meta<typeof Table<SampleData>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithEmpty: Story = {
  args: {
    data: [],
  },
}
