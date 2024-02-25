import { ethers } from 'ethers'
import type { PlantType } from './PlantType'

export class PlantDTO {
  minEth: bigint // 最小领养价格（单位：以太）
  maxEth: bigint // 最大领养价格（单位：以太）
  startTime: number // 领养时间 hour
  endTime: number // 结束时间 hour
  plantType: PlantType // 植物种类
  profitDays: number // 收益天数
  profitRate: number // 收益率（单位：百分比）

  constructor(
    minEth: string,
    maxEth: string,
    startTime: number,
    endTime: number,
    plantType: PlantType,
    profitDays: number,
    profitRate: number,
  ) {
    this.minEth = ethers.parseEther(minEth)
    this.maxEth = ethers.parseEther(maxEth)
    this.startTime = startTime
    this.endTime = endTime
    this.plantType = plantType
    this.profitDays = profitDays
    this.profitRate = profitRate
  }
}
