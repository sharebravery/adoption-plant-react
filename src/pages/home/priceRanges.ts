import type { AdoptionPriceRange } from '@/models/AdoptionPriceRange'
import { PlantType } from '@/models/PlantType'

export const priceRanges: Record<PlantType, AdoptionPriceRange> = {
  [PlantType.Ordinary]: {
    minEth: 0.005,
    maxEth: 0.015,
    startTime: 14,
    endTime: 15,
    profitDays: 7,
    profitRate: 21,
  },
  [PlantType.SmallTree]: {
    minEth: 0.0151,
    maxEth: 0.045,
    startTime: 15,
    endTime: 16,
    profitDays: 3,
    profitRate: 9,
  },
  [PlantType.MediumTree]: {
    minEth: 0.0451,
    maxEth: 0.125,
    startTime: 16,
    endTime: 17,
    profitDays: 5,
    profitRate: 13,
  },
  [PlantType.HighTree]: {
    minEth: 0.1251,
    maxEth: 0.3,
    startTime: 17,
    endTime: 18,
    profitDays: 12,
    profitRate: 21,
  },
  [PlantType.KingTree]: {
    minEth: 0.3001,
    maxEth: 0.75,
    startTime: 18,
    endTime: 19,
    profitDays: 20,
    profitRate: 40,
  },
}
