import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

beforeAll(() => {})

afterEach(() => {
  cleanup()

  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})
