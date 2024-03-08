import { PlantType } from './PlantType'

// 植物信息
export class Plant {
  plantId: bigint = 0n
  plantType: PlantType = PlantType.Seed// 植物种类
  valueEth: bigint = 0n
  adoptedTimestamp = 0 // 领养时间 时间戳
  owner?: string | undefined = undefined// 拥有者地址
  isAdopted: boolean = false // 是否被领养
  isSplit: boolean = false
}
