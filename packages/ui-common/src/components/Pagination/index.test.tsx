import { setup } from '@/test/setup'
import { Pagination } from '.'

describe('<Pagination />', () => {
  test('Pagination 컴포넌트가 렌더링된다.', () => {
    const { getByLabelText } = setup(
      <Pagination totalPages={12} currentPage={1} />,
    )

    getByLabelText('pagination')
  })

  describe('first page button', () => {
    test('현재가 첫 페이지면 비활성화된다.', () => {
      const { getByRole } = setup(
        <Pagination totalPages={12} currentPage={1} />,
      )

      expect(getByRole('button', { name: 'first page' })).toBeDisabled()
    })
    test('클릭하면 onPageChange 함수가 호출된다.', async () => {
      const onPageChange = vi.fn()
      const { user, getByRole } = setup(
        <Pagination
          totalPages={12}
          currentPage={2}
          onPageChange={onPageChange}
        />,
      )

      await user.click(getByRole('button', { name: 'first page' }))
      expect(onPageChange).toHaveBeenCalledWith(1)
    })
  })
  describe('last page of previous group button', () => {
    test('현재가 첫 페이지 그룹이면 비활성화된다.', () => {
      const { getByRole } = setup(
        <Pagination totalPages={12} currentPage={2} />,
      )

      expect(
        getByRole('button', { name: 'last page of previous group' }),
      ).toBeDisabled()
    })
    test('클릭하면 onPageChange 함수가 호출된다.', async () => {
      const onPageChange = vi.fn()
      const { user, getByRole } = setup(
        <Pagination
          totalPages={12}
          currentPage={6}
          onPageChange={onPageChange}
        />,
      )

      await user.click(
        getByRole('button', { name: 'last page of previous group' }),
      )
      expect(onPageChange).toHaveBeenCalledWith(5)
    })
  })
  describe('first page of next group button', () => {
    test('현재가 마지막 페이지 그룹이면 비활성화된다.', () => {
      const { getByRole } = setup(
        <Pagination totalPages={12} currentPage={11} />,
      )

      expect(
        getByRole('button', { name: 'first page of next group' }),
      ).toBeDisabled()
    })
    test('클릭하면 onPageChange 함수가 호출된다.', async () => {
      const onPageChange = vi.fn()
      const { user, getByRole } = setup(
        <Pagination
          totalPages={12}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      )

      await user.click(
        getByRole('button', { name: 'first page of next group' }),
      )
      expect(onPageChange).toHaveBeenCalledWith(6)
    })
  })
  describe('last page button', () => {
    test('현재가 마지막 페이지면 비활성화된다.', () => {
      const { getByRole } = setup(
        <Pagination totalPages={12} currentPage={12} />,
      )

      expect(getByRole('button', { name: 'last page' })).toBeDisabled()
    })
    test('클릭하면 onPageChange 함수가 호출된다.', async () => {
      const onPageChange = vi.fn()
      const { user, getByRole } = setup(
        <Pagination
          totalPages={12}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      )

      await user.click(getByRole('button', { name: 'last page' }))
      expect(onPageChange).toHaveBeenCalledWith(12)
    })
  })
  describe('page buttons', () => {
    test('현재 페이지임을 표시한다.', () => {
      const { getByRole } = setup(
        <Pagination totalPages={12} currentPage={1} />,
      )

      expect(getByRole('button', { name: '1' })).toHaveAttribute(
        'aria-current',
        'true',
      )
    })
    test('클릭하면 onPageChange 함수가 호출된다.', async () => {
      const onPageChange = vi.fn()
      const { user, getByRole } = setup(
        <Pagination
          totalPages={12}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      )

      await user.click(getByRole('button', { name: '2' }))
      expect(onPageChange).toHaveBeenCalledWith(2)
    })
  })
})
