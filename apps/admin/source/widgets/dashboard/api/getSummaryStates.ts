import { request } from '@shared/api/request'
import { KindOfStateCategory } from '@widgets/dashboard/model/stateCategory'

export interface StateSummaryDTO {
  total: number
  percentage: number
}

export interface GetStateSummariesResDTO {
  customer: StateSummaryDTO
  order: StateSummaryDTO
  product: StateSummaryDTO
  sales: StateSummaryDTO
}

export interface StateSummary {
  total: number
  percentage: number
}

export type GetStateSummariesRes = Record<KindOfStateCategory, StateSummary>

const fromStateSummaryDTO = (dto: StateSummaryDTO): StateSummary => {
  return {
    total: dto.total,
    percentage: dto.percentage,
  }
}

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
  const response =
    await request.get<GetStateSummariesResDTO>('/states/summaries')

  return fromGetSummaryStatesResDTO(response)
}
