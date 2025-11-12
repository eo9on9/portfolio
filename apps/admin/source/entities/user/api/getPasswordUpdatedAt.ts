import { request } from '@shared/api/request'

type GetPasswordUpdatedAtResDTO = {
  lastPasswordChangedAt: number
}

export type GetPasswordUpdatedAtRes = {
  lastPasswordChangedAt: number
}

const fromGetPasswordUpdatedAtResDTO = (
  dto: GetPasswordUpdatedAtResDTO,
): GetPasswordUpdatedAtRes => {
  return {
    lastPasswordChangedAt: dto.lastPasswordChangedAt,
  }
}

export const getPasswordUpdatedAt =
  async (): Promise<GetPasswordUpdatedAtRes> => {
    const response = await request.get<GetPasswordUpdatedAtResDTO>(
      '/profile/password-updated-at',
    )

    return fromGetPasswordUpdatedAtResDTO(response)
  }
