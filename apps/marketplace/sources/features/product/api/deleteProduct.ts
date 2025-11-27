import { request } from '@shared/api/request'

interface DeleteProductParams {
  id: string
}

export const deleteProduct = async (params: DeleteProductParams) => {
  const response = await request.delete<null>(`/product`, {
    data: params,
  })

  return response
}
