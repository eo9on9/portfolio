import { request } from '@shared/api/request'
import { SummaryState } from '@widgets/dashboard/model/summaryState'
import { KindOfSummaryStateCategory } from '@widgets/dashboard/model/summaryStateCategory'
import { fromSummaryStateDTO, SummaryStateDTO } from './dto/summaryState'

export interface GetSummaryStatesResDTO {
  customer: SummaryStateDTO
  order: SummaryStateDTO
  product: SummaryStateDTO
  sales: SummaryStateDTO
}

export type GetSummaryStatesRes = Record<
  KindOfSummaryStateCategory,
  SummaryState
>

const fromGetSummaryStatesResDTO = (
  dto: GetSummaryStatesResDTO,
): GetSummaryStatesRes => {
  return {
    customer: fromSummaryStateDTO(dto.customer),
    order: fromSummaryStateDTO(dto.order),
    product: fromSummaryStateDTO(dto.product),
    sales: fromSummaryStateDTO(dto.sales),
  }
}

export const getSummaryStates = async () => {
  const response = await request.get<GetSummaryStatesResDTO>(
    '/dashboard/summary-states',
  )

  return fromGetSummaryStatesResDTO(response)
}
