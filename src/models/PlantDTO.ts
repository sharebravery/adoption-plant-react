import { ethers } from 'ethers'
import type { PlantType } from './PlantType'

export class PlantDTO {
  plantType: PlantType // 植物种类
  minEth: bigint // 最小领养价格（单位：以太）
  maxEth: bigint // 最大领养价格（单位：以太）
  // startTime: number // 领养时间 hour
  // endTime: number // 结束时间 hour
  // profitDays: number // 收益天数
  // profitRate: number // 收益率（单位：百分比）

  constructor(
    plantType: PlantType,

    minEth: bigint,
    maxEth: bigint,
    // startTime: number,
    // endTime: number,
    // profitDays: number,
    // profitRate: number,
  ) {
    this.plantType = plantType
    this.minEth = ethers.parseEther(String(minEth))
    this.maxEth = ethers.parseEther(String(maxEth))
    // this.startTime = startTime
    // this.endTime = endTime
    // this.profitDays = profitDays
    // this.profitRate = profitRate
  }
}
