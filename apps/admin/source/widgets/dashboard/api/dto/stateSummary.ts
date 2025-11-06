import { StateSummary } from '@widgets/dashboard/model/stateSummary'

export interface StateSummaryDTO {
  total: number
  percentage: number
}

export const fromStateSummaryDTO = (dto: StateSummaryDTO): StateSummary => {
  return {
    total: dto.total,
    percentage: dto.percentage,
  }
}
