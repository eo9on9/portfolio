import { setup } from '@/test/setup'
import {
  ToastProvider as PrimitiveToastProvider,
  ToastViewport as PrimitiveToastViewport,
} from '@radix-ui/react-toast'
import { Toast } from '.'

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

describe('<Toast />', () => {
  test('Toast 컴포넌트가 렌더링된다.', () => {
    const setIsOpen = vi.fn()

    const { getByText } = setup(
      <PrimitiveToastProvider>
        <Toast isOpen={true} setIsOpen={setIsOpen} message="Hello" />,
        <PrimitiveToastViewport />
      </PrimitiveToastProvider>,
    )

    getByText('Hello')
  })
  test('3초 후에 Toast가 닫힌다.', () => {
    const setIsOpen = vi.fn()

    setup(
      <PrimitiveToastProvider>
        <Toast isOpen={true} setIsOpen={setIsOpen} message="Hello" />,
        <PrimitiveToastViewport />
      </PrimitiveToastProvider>,
    )

    vi.advanceTimersByTime(3000)

    expect(setIsOpen).toHaveBeenCalledWith(false)
  })
})
