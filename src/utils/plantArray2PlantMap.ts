import type { PlantMarketV1 } from '@/abis/types'
import type { Plant } from '@/models/Plant'

export function plantArray2PlantMap(data: PlantMarketV1.PlantStructOutput[]): Plant[] {
  return data.map(e => ({
    plantId: e[0],
    plantType: Number(e[1]),
    valueEth: e[2],
    adoptedTimestamp: Number(e[3]),
    address: String(e[4]),
    isAdopted: e[5],
    isSplit: e[5],
  })).reverse()
}
