import type { AdoptionPriceRange } from '@/models/AdoptionPriceRange'
import { PlantType } from '@/models/PlantType'

export const priceRanges: Record<PlantType, AdoptionPriceRange> = {
  [PlantType.Ordinary]: {
    minEth: 0.005,
    maxEth: 0.015,
    startTime: 7,
    endTime: 23,
    profitDays: 7,
    profitRate: 2100,
    rewardAmounts: 1000,
    blast: 220,

  },
  [PlantType.SmallTree]: {
    minEth: 0.0151,
    maxEth: 0.045,
    startTime: 7,
    endTime: 23,
    profitDays: 3,
    profitRate: 900,
    rewardAmounts: 3000,
    blast: 680,
  },
  [PlantType.MediumTree]: {
    minEth: 0.0451,
    maxEth: 0.125,
    startTime: 7,
    endTime: 23,
    profitDays: 5,
    profitRate: 1250,
    rewardAmounts: 5000,
    blast: 1130,
  },
  [PlantType.HighTree]: {
    minEth: 0.1251,
    maxEth: 0.3,
    startTime: 7,
    endTime: 23,
    profitDays: 12,
    profitRate: 2100,
    rewardAmounts: 10000,
    blast: 2270,
  },
  [PlantType.KingTree]: {
    minEth: 0.3001,
    maxEth: 0.75,
    startTime: 7,
    endTime: 23,
    profitDays: 20,
    profitRate: 4000,
    rewardAmounts: 20000,
    blast: 4540,
  },
}
