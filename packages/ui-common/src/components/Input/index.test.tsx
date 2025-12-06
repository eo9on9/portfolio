import { setup } from '@/test/setup'
import { Search } from 'lucide-react'
import { Input } from '.'

describe('<Input />', () => {
  test('input 컴포넌트가 렌더링된다.', () => {
    const { getByRole } = setup(<Input />)

    getByRole('textbox')
  })
  test('icon 속성이 있으면 전달된 아이콘이 렌더링된다.', () => {
    const { getByTestId } = setup(
      <Input icon={<Search data-testid="search-icon" />} />,
    )

    getByTestId('search-icon')
  })
  test('isError 속성이 참이면 input 컴포넌트에 aria-invalid 속성이 추가된다.', () => {
    const { getByPlaceholderText } = setup(
      <Input isError placeholder="Enter your name" />,
    )

    expect(getByPlaceholderText('Enter your name')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })
})
