import { request } from '@shared/api/request'

interface DeleteProductParamsDTO {
  product_id: string
}

interface DeleteProductParams {
  productId: string
}

const toDeleteProductParamsDTO = (
  params: DeleteProductParams,
): DeleteProductParamsDTO => {
  return {
    product_id: params.productId,
  }
}

export const deleteProduct = async (params: DeleteProductParams) => {
  const response = await request.delete<null>(`/product`, {
    data: toDeleteProductParamsDTO(params),
  })

  return response
}
