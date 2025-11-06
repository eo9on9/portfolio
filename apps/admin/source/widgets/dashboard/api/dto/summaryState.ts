import { SummaryState } from '@widgets/dashboard/model/summaryState'

export interface SummaryStateDTO {
  total: number
  percentage: number
}

export const fromSummaryStateDTO = (dto: SummaryStateDTO): SummaryState => {
  return {
    total: dto.total,
    percentage: dto.percentage,
  }
}
