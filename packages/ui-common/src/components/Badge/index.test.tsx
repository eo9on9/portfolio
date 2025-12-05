import { setup } from '@/test/setup'
import { Badge } from '.'

describe('<Badge />', () => {
  test('뱃지 컴포넌트가 렌더링된다.', () => {
    const { getByText } = setup(<Badge>테스트뱃지</Badge>)

    getByText('테스트뱃지')
  })
  test('as 속성이 있으면 전달된 컴포넌트로 렌더링된다.', () => {
    const { getByRole } = setup(
      <Badge as="a" href="https://www.test.com">
        Click me
      </Badge>,
    )

    expect(getByRole('link', { name: /Click me/ })).toHaveAttribute(
      'href',
      'https://www.test.com',
    )
  })
})
