export interface AdoptionPriceRange {
  minEth: number // 最小领养价格（单位：以太）
  maxEth: number // 最大领养价格（单位：以太）
  startTime: number // 开始时间（单位：小时）
  endTime: number // 结束时间（单位：小时）
  profitDays: number // 收益天数
  profitRate: number // 收益率（单位：百分比）
  rewardAmounts: number // 挖矿收益
  blast: number
  image: string
}
