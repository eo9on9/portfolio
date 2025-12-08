import { setup } from '@/test/setup'
import { TestErrorBoundary } from '@/test/TestErrorBoundary'
import { FormField } from '.'
import { Input } from '../Input'

describe('<FormField />', () => {
  test('label 요소가 렌더링된다.', () => {
    const { getByLabelText } = setup(
      <FormField label="Name">
        <Input placeholder="Enter your name" />
      </FormField>,
    )

    getByLabelText('Name')
  })
  test('children 폼 요소가 렌더링된다.', () => {
    const { getByPlaceholderText } = setup(
      <FormField label="Name">
        <Input placeholder="Enter your name" />
      </FormField>,
    )

    getByPlaceholderText('Enter your name')
  })
  test('label 요소와 children 폼 요소가 연결된다.', () => {
    const { getByRole } = setup(
      <FormField label="Name">
        <Input placeholder="Enter your name" />
      </FormField>,
    )

    getByRole('textbox', { name: 'Name' })
  })
  test('label 요소를 클릭하면 children 폼 요소에 포커스가 된다.', async () => {
    const { user, getByLabelText, getByRole } = setup(
      <FormField label="Name">
        <Input placeholder="Enter your name" />
      </FormField>,
    )

    await user.click(getByLabelText('Name'))

    expect(getByRole('textbox', { name: 'Name' })).toHaveFocus()
  })
  test('errorMessage 요소가 렌더링된다.', () => {
    const { getByText } = setup(
      <FormField label="Name" errorMessage="Error message">
        <Input placeholder="Enter your name" />
      </FormField>,
    )

    getByText('Error message')
  })
  test('자식 요소가 하나가 아니면 에러가 발생한다.', () => {
    const onError = vi.fn()

    setup(
      <TestErrorBoundary onError={onError}>
        <FormField label="Name">
          <Input placeholder="Enter your name" />
          <Input placeholder="Enter your name" />
        </FormField>
      </TestErrorBoundary>,
    )

    expect(onError).toHaveBeenCalled()
  })
})
