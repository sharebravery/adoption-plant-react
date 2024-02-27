import type { PlantMarket } from '@/abis/types'
import type { Plant } from '@/models/Plant'

export function plantArray2PlantMap(data: PlantMarket.PlantStructOutput[]): Plant[] {
  return data.map(e => ({
    plantId: e[0],
    plantType: Number(e[1]),
    minEth: String(e[2]),
    maxEth: String(e[3]),
    startTime: Number(e[4]),
    endTime: Number(e[5]),
    adoptedTimestamp: Number(e[6]),
    profitDays: Number(e[7]),
    profitRate: Number(e[8]),
    address: String(e[9]),
    isAdopted: e[10],
  })).reverse()
}
