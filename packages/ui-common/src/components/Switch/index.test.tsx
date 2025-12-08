import { setup } from '@/test/setup'
import { Switch } from '.'

describe('<Switch />', () => {
  test('Switch 컴포넌트가 렌더링된다.', () => {
    const { getByRole } = setup(<Switch />)

    getByRole('checkbox')
  })
  test('defaultValue 속성이 있으면 전달된 값이 스위치의 값으로 설정된다.', () => {
    const { getByRole } = setup(<Switch defaultValue={true} />)

    expect(getByRole('checkbox')).toBeChecked()
  })
  test('value 속성이 있으면 전달된 값이 스위치의 값으로 설정된다.', () => {
    const { getByRole } = setup(<Switch value={true} />)

    expect(getByRole('checkbox')).toBeChecked()
  })
  test('disabled 속성이 있으면 스위치가 비활성화된다.', () => {
    const { getByRole } = setup(<Switch disabled />)

    expect(getByRole('checkbox')).toBeDisabled()
  })
  test('Switch를 클릭하면 onChange 함수가 호출된다.', async () => {
    const onChange = vi.fn()

    const { user, getByRole } = setup(
      <Switch onChange={onChange} value={true} />,
    )

    await user.click(getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledWith(false)
  })
})
