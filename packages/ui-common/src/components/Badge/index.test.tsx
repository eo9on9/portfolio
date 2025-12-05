import { setup } from '@/test/setup'
import { Badge } from '.'

describe('<Badge />', () => {
  test('뱃지 컴포넌트가 렌더링된다.', () => {
    const { getByText } = setup(<Badge>테스트뱃지</Badge>)

    getByText('테스트뱃지')
  })
  test('span 속성이 전달되면 전달된 속성으로 렌더링된다.', () => {
    const { getByRole } = setup(<Badge role="status">테스트뱃지</Badge>)

    const el = getByRole('status')

    expect(el).toHaveAttribute('role', 'status')
  })
})
