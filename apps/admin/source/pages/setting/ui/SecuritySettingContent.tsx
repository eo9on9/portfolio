import { getPasswordUpdatedAt } from '@entities/user/api/getPasswordUpdatedAt'
import { resetPassword } from '@entities/user/api/resetPassword'
import { useToast } from '@repo/ui-common'
import {
  VALIDATION_PASSWORD,
  VALIDATION_REQUIRED,
} from '@shared/constant/validation'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { toDate } from '@shared/util/format'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

interface SecuritySettingForms {
  oldPassword: string
  newPassword: string
  newPasswordConfirm: string
}

export const SecuritySettingContent = () => {
  const toast = useToast()
  const { data } = useQuery({
    queryKey: ['profile', 'password-updated-at'],
    queryFn: getPasswordUpdatedAt,
  })

  const { isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('비밀번호 변경 성공')
    },
    onError: () => {
      toast.error('비밀번호 변경 실패')
    },
  })

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SecuritySettingForms>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  const handleResetPassword = handleSubmit(() => {
    toast.success('원활한 데모를 위해 비밀번호 변경 기능은 비활성화되었습니다.')
  })

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-sm border border-gray-200">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-gray-800">비밀번호 변경</h3>
        <p className="text-sm text-gray-500">
          정기적으로 비밀번호를 변경하세요.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormField label="마지막 변경일">
          <Input
            value={data ? toDate(data.lastPasswordChangedAt) : ''}
            readOnly
          />
        </FormField>
        <FormField
          label="현재 비밀번호"
          errorMessage={errors.oldPassword?.message}
        >
          <Input
            type="password"
            placeholder="••••••"
            isError={!!errors.oldPassword}
            {...register('oldPassword', {
              required: VALIDATION_REQUIRED.message,
            })}
          />
        </FormField>
        <FormField
          label="새 비밀번호"
          errorMessage={errors.newPassword?.message}
        >
          <Input
            type="password"
            placeholder="••••••"
            isError={!!errors.newPassword}
            {...register('newPassword', {
              required: VALIDATION_REQUIRED.message,
              pattern: {
                value: VALIDATION_PASSWORD.pattern,
                message: VALIDATION_PASSWORD.message,
              },
              validate: value => {
                if (value === getValues('oldPassword')) {
                  return '새 비밀번호와 기존 비밀번호가 같습니다.'
                }
                return true
              },
            })}
          />
        </FormField>
        <FormField
          label="새 비밀번호 확인"
          errorMessage={errors.newPasswordConfirm?.message}
        >
          <Input
            type="password"
            placeholder="••••••"
            isError={!!errors.newPasswordConfirm}
            {...register('newPasswordConfirm', {
              required: VALIDATION_REQUIRED.message,
              validate: value => {
                if (value !== getValues('newPassword')) {
                  return '비밀번호가 일치하지 않습니다.'
                }
                return true
              },
            })}
          />
        </FormField>
      </div>
      <div className="flex items-center justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleResetPassword}
          isLoading={isPending}
        >
          비밀번호 변경
        </Button>
      </div>
    </div>
  )
}
