import { PlantType } from './PlantType'

// 植物信息
export class Plant {
  plantId: bigint = 0n
  plantType: PlantType = PlantType.Ordinary// 植物种类
  minEth: string = ''
  maxEth: string = ''
  startTime: number = 0 // 领养时间
  endTime: number = 0 // 结束时间
  adoptedTimestamp = 0 // 领养时间 时间戳
  owner?: string | undefined = undefined// 拥有者地址
  isAdopted: boolean = false // 是否被领养
  profitDays = 0 // 收益天数
  profitRate = 0 // 收益率
}
