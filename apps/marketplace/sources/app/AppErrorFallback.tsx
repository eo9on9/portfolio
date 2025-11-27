import { ApiError } from '@shared/api/ApiError'
import { FallbackProps } from 'react-error-boundary'

export const AppErrorFallback = ({ error }: FallbackProps) => {
  if (error instanceof ApiError) {
    return (
      <p>서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
    )
  }

  return <p>알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
}
