import { setup } from '@/test/setup'
import { within } from '@testing-library/react'
import { Button } from '.'

describe('<Button />', () => {
  test('버튼 컴포넌트가 렌더링된다.', () => {
    const { getByRole } = setup(<Button>Click me</Button>)

    getByRole('button', { name: /Click me/ })
  })
  test('as 속성이 있으면 전달된 컴포넌트로 렌더링된다.', () => {
    const { getByRole } = setup(
      <Button as="a" href="https://www.test.com">
        Click me
      </Button>,
    )

    expect(getByRole('link', { name: /Click me/ })).toHaveAttribute(
      'href',
      'https://www.test.com',
    )
  })
  test('로딩 상태가 켜져있으면 로딩 아이콘이 렌더링된다.', () => {
    const { getByRole } = setup(<Button isLoading>Click me</Button>)

    within(getByRole('button', { name: /Click me/ })).getByLabelText(
      'now loading',
    )
  })
  test('로딩 상태가 켜져있으면 버튼이 비활성화된다.', () => {
    const { getByRole } = setup(<Button isLoading>Click me</Button>)

    expect(getByRole('button', { name: /Click me/ })).toBeDisabled()
  })
})
