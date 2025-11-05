import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Key, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/router'

export const LoginPage = () => {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/customer')
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-500">
      <div className="flex flex-col w-[400px] gap-4 p-6 rounded-sm bg-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-2xl font-medium text-gray-800">로그인</h2>
          <p className="text-sm text-gray-500">
            관리자 계정으로 시스템에 접속해주세요
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <FormField label="아이디">
            <Input
              icon={<Mail className="w-4 h-4 text-gray-500" />}
              placeholder="admin@example.com"
            />
          </FormField>
          <FormField label="비밀번호">
            <Input
              type="password"
              icon={<Key className="w-4 h-4 text-gray-500" />}
              placeholder="••••••"
            />
          </FormField>
        </div>
        <Button variant="primary" size="lg" onClick={handleLogin}>
          로그인
        </Button>
        <div className="flex flex-col items-center justify-center gap-2 bg-gray-100 p-2 rounded-sm">
          <p className="text-sm font-medium text-gray-800">테스트 계정</p>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xs text-gray-500">아이디: admin@example.com</p>
            <p className="text-xs text-gray-500">비밀번호: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
