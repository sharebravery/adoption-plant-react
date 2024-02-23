import { PlantType } from './PlantType'

// 植物在市场上的列表信息
export class MarketPlantInfo {
  plantId: bigint = 0n
  plantType: PlantType = PlantType.Ordinary
}
