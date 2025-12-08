import { setup } from '@/test/setup'
import { Table, type TableColumn } from '.'

type SampleData = {
  id: string
  name: string
  age: number
  email: string
}

const onClickDetail = vi.fn()

const SAMPLE_COLUMNS: TableColumn<SampleData>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Age', accessorKey: 'age', align: 'center' },
  { header: 'Email', accessorKey: 'email', align: 'center' },
  {
    headerRender: () => <span>Action</span>,
    render: item => (
      <button type="button" onClick={() => onClickDetail(item)}>
        상세보기
      </button>
    ),
  },
]

const SAMPLE_DATA: SampleData[] = [
  { id: '1', name: 'John Doe', age: 25, email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
  { id: '3', name: 'Jim Beam', age: 35, email: 'jim.beam@example.com' },
]

describe('<Table />', () => {
  test('데이터가 없을 때 emptyMessage가 표시된다.', () => {
    const { getByText } = setup(
      <Table data={[]} columns={[]} emptyMessage="No data" />,
    )

    getByText('No data')
  })
  test('데이터가 없고 emptyMessage가 없으면 "데이터가 없습니다."가 표시된다.', () => {
    const { getByText } = setup(<Table data={[]} columns={[]} />)

    getByText('데이터가 없습니다.')
  })
  test('로딩 상태가 켜져있으면 로딩 아이콘이 렌더링된다.', () => {
    const { getByLabelText } = setup(<Table data={[]} columns={[]} isLoading />)

    getByLabelText('now loading')
  })
  test('컬럼의 header가 표시된다.', () => {
    const { getByRole } = setup(
      <Table data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />,
    )

    getByRole('columnheader', { name: 'Name' })
    getByRole('columnheader', { name: 'Age' })
    getByRole('columnheader', { name: 'Email' })
  })
  test('컬럼의 headerRender가 표시된다.', () => {
    const { getByRole } = setup(
      <Table data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />,
    )

    getByRole('columnheader', { name: 'Action' })
  })
  test('컬럼의 accessorKey에 해당하는 데이터가 표시된다.', () => {
    const { getByRole } = setup(
      <Table data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />,
    )

    getByRole('cell', { name: 'John Doe' })
    getByRole('cell', { name: '25' })
    getByRole('cell', { name: 'john.doe@example.com' })
  })
  test('컬럼의 render가 표시된다.', () => {
    const { getAllByRole } = setup(
      <Table data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />,
    )

    const buttons = getAllByRole('button', { name: '상세보기' })

    expect(buttons).toHaveLength(3)
  })
  test('컬럼의 render는 해당 데이터를 전달받아 렌더링된다.', async () => {
    const { user, getAllByRole } = setup(
      <Table data={SAMPLE_DATA} columns={SAMPLE_COLUMNS} />,
    )

    const buttons = getAllByRole('button', { name: '상세보기' })

    buttons.forEach(async (button, index) => {
      await user.click(button)

      expect(onClickDetail).toHaveBeenCalledWith(SAMPLE_DATA[index])
    })
  })
})
