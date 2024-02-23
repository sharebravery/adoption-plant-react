import { PlantType } from './PlantType'

// 植物信息
export class Plant {
  plantId: bigint = 0n
  startTime: number = 0 // 领养时间
  endTime: number = 0 // 结束时间
  plantType: PlantType = PlantType.Ordinary// 植物种类
  owner: string | undefined = undefined// 拥有者地址
  isAdopted: boolean = false // 是否被领养
}
