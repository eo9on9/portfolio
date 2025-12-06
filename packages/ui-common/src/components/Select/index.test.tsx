import { setup } from '@/test/setup'
import { Select } from '.'

const OPTIONS = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '포도', value: 'grape' },
  { label: '딸기', value: 'strawberry' },
]

describe('<Select />', () => {
  test('셀렉트 컴포넌트가 렌더링된다.', () => {
    const { getByRole } = setup(<Select options={OPTIONS} />)

    getByRole('combobox')
  })
  test('placeholder가 있으면 표시된다.', () => {
    const { getByRole } = setup(
      <Select options={OPTIONS} placeholder="Select an option" />,
    )

    expect(getByRole('combobox')).toHaveTextContent('Select an option')
  })
  test('셀렉트 버튼을 클릭하면 옵션 목록이 표시된다.', async () => {
    const { user, getByRole } = setup(<Select options={OPTIONS} />)

    await user.click(getByRole('combobox'))

    getByRole('option', { name: '사과' })
    getByRole('option', { name: '바나나' })
    getByRole('option', { name: '포도' })
    getByRole('option', { name: '딸기' })
  })
  test('옵션을 클릭하면 셀렉트 버튼의 값이 변경된다.', async () => {
    const { user, getByRole } = setup(<Select options={OPTIONS} />)

    await user.click(getByRole('combobox'))

    await user.click(getByRole('option', { name: '사과' }))

    expect(getByRole('combobox')).toHaveTextContent('사과')
  })
  test('defaultValue 속성이 있으면 전달된 값이 셀렉트 버튼의 값으로 설정된다.', () => {
    const { getByRole } = setup(
      <Select options={OPTIONS} defaultValue="banana" />,
    )

    expect(getByRole('combobox')).toHaveTextContent('바나나')
  })
  test('value 속성이 있으면 전달된 값이 셀렉트 버튼의 값으로 설정된다.', () => {
    const { getByRole } = setup(<Select options={OPTIONS} value="grape" />)

    expect(getByRole('combobox')).toHaveTextContent('포도')
  })
  test('셀렉트의 값이 변경되면 onChange 함수가 호출된다.', async () => {
    const onChange = vi.fn()

    const { user, getByRole } = setup(
      <Select options={OPTIONS} onChange={onChange} />,
    )

    await user.click(getByRole('combobox'))

    await user.click(getByRole('option', { name: '사과' }))

    expect(onChange).toHaveBeenCalledWith('apple')
  })
  test('isError 속성이 있으면 aria-invalid 속성이 추가된다.', () => {
    const { getByRole } = setup(<Select options={OPTIONS} isError />)

    expect(getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })
})
