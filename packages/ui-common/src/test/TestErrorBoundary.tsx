import React, { type PropsWithChildren } from 'react'

interface TestErrorBoundaryProps extends PropsWithChildren {
  onError: (error: unknown) => void
}

export class TestErrorBoundary extends React.Component<
  TestErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: TestErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error)
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}
