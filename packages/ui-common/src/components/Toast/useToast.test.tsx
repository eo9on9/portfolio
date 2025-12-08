import { setup as _setup } from '@/test/setup'
import { waitFor } from '@testing-library/react'
import { ToastProvider, useToast } from '.'

const Tester = () => {
  const toast = useToast()

  return (
    <>
      <button onClick={() => toast.success('This is success toast')}>
        success
      </button>
      <button onClick={() => toast.error('This is error toast')}>error</button>
      <button onClick={() => toast.default('This is default toast')}>
        default
      </button>
    </>
  )
}

const setup = () =>
  _setup(
    <ToastProvider>
      <Tester />
    </ToastProvider>,
  )

describe('useToast', () => {
  test('success 함수를 호출하면 Toast가 노출된다.', () => {
    const { getByRole, getByText } = setup()

    getByRole('button', { name: 'success' })

    waitFor(() => getByText('This is success toast'))
  })
  test('error 함수를 호출하면 Toast가 노출된다.', () => {
    const { getByRole, getByText } = setup()

    getByRole('button', { name: 'error' })

    waitFor(() => getByText('This is error toast'))
  })
  test('default 함수를 호출하면 Toast가 노출된다.', () => {
    const { getByRole, getByText } = setup()

    getByRole('button', { name: 'default' })

    waitFor(() => getByText('This is default toast'))
  })
})
