import type { AdoptionPriceRange } from '@/models/AdoptionPriceRange'
import { PlantType } from '@/models/PlantType'

export const priceRanges: Record<PlantType, AdoptionPriceRange> = {
  [PlantType.Seed]: {
    minEth: 0.005,
    maxEth: 0.015,
    startTime: 14,
    endTime: 15,
    profitDays: 7,
    profitRate: 2100,
    rewardAmounts: 1000,
    blast: 220,
  },
  [PlantType.Seedling]: {
    minEth: 0.0151,
    maxEth: 0.045,
    startTime: 15,
    endTime: 16,
    profitDays: 3,
    profitRate: 900,
    rewardAmounts: 3000,
    blast: 680,
  },
  [PlantType.Vegetative]: {
    minEth: 0.0451,
    maxEth: 0.125,
    startTime: 16,
    endTime: 17,
    profitDays: 5,
    profitRate: 1250,
    rewardAmounts: 5000,
    blast: 1130,
  },
  [PlantType.Flowering]: {
    minEth: 0.1251,
    maxEth: 0.3,
    startTime: 17,
    endTime: 18,
    profitDays: 12,
    profitRate: 2100,
    rewardAmounts: 10000,
    blast: 2270,
  },
  [PlantType.Fruiting]: {
    minEth: 0.3001,
    maxEth: 0.75,
    startTime: 18,
    endTime: 19,
    profitDays: 20,
    profitRate: 4000,
    rewardAmounts: 20000,
    blast: 4540,
  },
  [PlantType.VegetativeVariation]: {
    minEth: 0.0451,
    maxEth: 0.125,
    startTime: 20,
    endTime: 21,
    profitDays: 1,
    profitRate: 500,
    rewardAmounts: 5000,
    blast: 1130,
  },
}
