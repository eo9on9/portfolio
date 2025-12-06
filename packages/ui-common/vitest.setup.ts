import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

// radix-ui/react-select 라이브러리 테스트 환경 설정
HTMLElement.prototype.hasPointerCapture = () => false
HTMLElement.prototype.setPointerCapture = () => {}
HTMLElement.prototype.releasePointerCapture = () => {}
HTMLElement.prototype.scrollIntoView = function () {}

beforeAll(() => {})

afterEach(() => {
  cleanup()

  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})
