import { request } from '@shared/api/request'

interface ResetPasswordParams {
  oldPassword: string
  newPassword: string
}

export const resetPassword = async (params: ResetPasswordParams) => {
  await request.put('/profile/reset-password', {
    data: params,
  })
}
