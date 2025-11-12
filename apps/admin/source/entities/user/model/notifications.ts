export interface Notifications {
  /** 새로운 주문 */
  newOrder: boolean
  /** 재고 부족 */
  lowStock: boolean
  /** 고객 문의 */
  customerInquiry: boolean
  /** 배송 상태 변경 */
  deliveryStatusChange: boolean
  /** 주간 리포트 */
  weeklyReport: boolean
}
