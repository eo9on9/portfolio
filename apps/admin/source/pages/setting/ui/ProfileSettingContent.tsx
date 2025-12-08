import { getProfile } from '@entities/user/api/getProfile'
import { updateProfile } from '@entities/user/api/updateProfile'
import { KindOfUserRole, USER_ROLE_LABELS } from '@entities/user/model/userRole'
import {
  Beacon,
  Button,
  FormField,
  Input,
  Select,
  useToast,
} from '@repo/ui-common'
import {
  VALIDATION_NAME,
  VALIDATION_PHONE,
  VALIDATION_REQUIRED,
} from '@shared/constant/validation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface UpdateProfileForms {
  name: string
  email: string
  phone: string
  role: KindOfUserRole
}

const USER_ROLE_OPTIONS = Object.entries(USER_ROLE_LABELS).map(
  ([key, value]) => ({
    label: value,
    value: key,
  }),
)

export const ProfileSettingContent = () => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    throwOnError: true,
    retry: false,
  })

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileForms>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '' as KindOfUserRole,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('프로필 업데이트 성공')
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
    onError: () => {
      toast.error('프로필 업데이트 실패')
    },
  })

  const handleUpdateProfile = handleSubmit(data => {
    mutate(data)
  })

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
      })
    }
  }, [data, reset])

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-sm border border-gray-200">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-gray-800">프로필</h3>
        <p className="text-sm text-gray-500">프로필 정보를 관리합니다.</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormField label="이메일">
          <Input readOnly {...register('email')} />
        </FormField>
        <FormField label="이름" errorMessage={errors.name?.message}>
          <Input
            isError={!!errors.name}
            {...register('name', {
              required: VALIDATION_REQUIRED.message,
              pattern: {
                value: VALIDATION_NAME.pattern,
                message: VALIDATION_NAME.message,
              },
            })}
          />
        </FormField>
        <FormField label="전화번호" errorMessage={errors.phone?.message}>
          <Input
            isError={!!errors.phone}
            {...register('phone', {
              required: VALIDATION_REQUIRED.message,
              pattern: {
                value: VALIDATION_PHONE.pattern,
                message: VALIDATION_PHONE.message,
              },
            })}
          />
        </FormField>
        <FormField label="권한">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select options={USER_ROLE_OPTIONS} {...field} />
            )}
          />
        </FormField>
      </div>
      <div className="flex items-center justify-end">
        <Beacon>
          <Button
            variant="primary"
            size="lg"
            onClick={handleUpdateProfile}
            isLoading={isPending}
          >
            변경사항 저장
          </Button>
        </Beacon>
      </div>
    </div>
  )
}
