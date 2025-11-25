import { FallbackProps } from 'react-error-boundary'

export const AppErrorFallback = ({ error }: FallbackProps) => {
  if (error === 'INTERNAL_SERVER_ERROR') {
    return <p>서버 에러가 발생했습니다.</p>
  }

  return <p>알 수 없는 에러가 발생했습니다.</p>
}
