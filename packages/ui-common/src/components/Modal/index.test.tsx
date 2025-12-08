import { setup } from '@/test/setup'
import { within } from '@testing-library/react'
import { Modal } from '.'

describe('<Modal />', () => {
  test('open 속성이 false일 때 모달 컴포넌트가 렌더링되지 않는다.', () => {
    const { queryByRole } = setup(
      <Modal title="Modal Title" open={false}>
        Modal Content
      </Modal>,
    )

    expect(
      queryByRole('dialog', { name: 'Modal Title' }),
    ).not.toBeInTheDocument()
  })
  test('open 속성이 true일 때 모달 컴포넌트가 렌더링된다.', () => {
    const { getByRole } = setup(
      <Modal title="Modal Title" open={true}>
        Modal Content
      </Modal>,
    )

    getByRole('dialog', { name: 'Modal Title' })
  })
  test('children 요소가 렌더링된다.', () => {
    const { getByRole } = setup(
      <Modal title="Modal Title" open={true}>
        Modal Content
      </Modal>,
    )

    within(getByRole('dialog', { name: 'Modal Title' })).getByText(
      'Modal Content',
    )
  })
  test('Close 버튼을 클릭하면 onClose 함수가 호출된다.', async () => {
    const onClose = vi.fn()
    const { user, getByRole } = setup(
      <Modal title="Modal Title" open={true} onClose={onClose}>
        Modal Content
      </Modal>,
    )

    await user.click(getByRole('button', { name: 'Close' }))

    expect(onClose).toHaveBeenCalled()
  })
})
