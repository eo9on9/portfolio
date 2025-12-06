import { setup } from '@/test/setup'
import { ToggleGroup } from '.'

const OPTIONS = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
]

describe('<ToggleGroup />', () => {
  test('ToggleGroup 컴포넌트가 렌더링된다.', () => {
    const { getByRole } = setup(<ToggleGroup options={OPTIONS} />)

    getByRole('radiogroup')
  })
  test('옵션이 렌더링된다.', () => {
    const { getByRole } = setup(<ToggleGroup options={OPTIONS} />)

    getByRole('radio', { name: 'Option 1' })
    getByRole('radio', { name: 'Option 2' })
  })
  test('defaultValue 속성이 있으면 전달된 값이 셀렉트 버튼의 값으로 설정된다.', () => {
    const { getByRole } = setup(
      <ToggleGroup options={OPTIONS} defaultValue="option1" />,
    )

    expect(getByRole('radio', { name: 'Option 1' })).toBeChecked()
  })
  test('value 속성이 있으면 전달된 값이 셀렉트 버튼의 값으로 설정된다.', () => {
    const { getByRole } = setup(
      <ToggleGroup options={OPTIONS} value="option1" />,
    )

    expect(getByRole('radio', { name: 'Option 1' })).toBeChecked()
  })
  test('현재와 같은 옵션을 클릭하면 onChange 함수가 호출되지 않는다.', async () => {
    const onChange = vi.fn()

    const { user, getByRole } = setup(
      <ToggleGroup options={OPTIONS} onChange={onChange} value="option1" />,
    )

    await user.click(getByRole('radio', { name: 'Option 1' }))

    expect(onChange).not.toHaveBeenCalled()
  })
  test('현재와 다른 옵션을 클릭하면 onChange 함수가 호출된다.', async () => {
    const onChange = vi.fn()

    const { user, getByRole } = setup(
      <ToggleGroup options={OPTIONS} onChange={onChange} value="option1" />,
    )

    await user.click(getByRole('radio', { name: 'Option 2' }))

    expect(onChange).toHaveBeenCalledWith('option2')
  })
})
