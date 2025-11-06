import { request } from '@shared/api/request'
import { StateSummary } from '@widgets/dashboard/model/stateSummary'
import { KindOfSummaryStateCategory } from '@widgets/dashboard/model/stateSummaryCategory'
import { fromStateSummaryDTO, StateSummaryDTO } from './dto/stateSummary'

export interface GetStateSummariesResDTO {
  customer: StateSummaryDTO
  order: StateSummaryDTO
  product: StateSummaryDTO
  sales: StateSummaryDTO
}

export type GetStateSummariesRes = Record<
  KindOfSummaryStateCategory,
  StateSummary
>

const fromGetSummaryStatesResDTO = (
  dto: GetStateSummariesResDTO,
): GetStateSummariesRes => {
  return {
    customer: fromStateSummaryDTO(dto.customer),
    order: fromStateSummaryDTO(dto.order),
    product: fromStateSummaryDTO(dto.product),
    sales: fromStateSummaryDTO(dto.sales),
  }
}

export const getStateSummaries = async () => {
  const response = await request.get<GetStateSummariesResDTO>(
    '/dashboard/state-summaries',
  )

  return fromGetSummaryStatesResDTO(response)
}
