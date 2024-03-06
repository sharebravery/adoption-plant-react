import type { AdoptionPriceRange } from '@/models/AdoptionPriceRange'
import { PlantType } from '@/models/PlantType'
import SeedImg from '@/assets/images/plant/seed.png'
import SeedlingImg from '@/assets/images/plant/Seedling.png'
import VegetativeImg from '@/assets/images/plant/Vegetative.png'
import FloweringImg from '@/assets/images/plant/Flowering.png'
import FruitingImg from '@/assets/images/plant/Fruiting.png'
import VegetativeVariationImg from '@/assets/images/plant/VegetativeVariation.png'

export const priceRanges: Record<PlantType, AdoptionPriceRange> = {
  [PlantType.Seed]: {
    minEth: 0.005,
    maxEth: 0.015,
    startTime: 7,
    endTime: 23,
    profitDays: 7,
    profitRate: 2100,
    rewardAmounts: 1000,
    blast: 220,
    image: SeedImg,
  },
  [PlantType.Seedling]: {
    minEth: 0.0151,
    maxEth: 0.045,
    startTime: 7,
    endTime: 23,
    profitDays: 3,
    profitRate: 900,
    rewardAmounts: 3000,
    blast: 680,
    image: SeedlingImg,
  },
  [PlantType.Vegetative]: {
    minEth: 0.0451,
    maxEth: 0.125,
    startTime: 7,
    endTime: 23,
    profitDays: 5,
    profitRate: 1250,
    rewardAmounts: 5000,
    blast: 1130,
    image: VegetativeImg,
  },
  [PlantType.Flowering]: {
    minEth: 0.1251,
    maxEth: 0.3,
    startTime: 7,
    endTime: 23,
    profitDays: 12,
    profitRate: 2100,
    rewardAmounts: 10000,
    blast: 2270,
    image: FloweringImg,
  },
  [PlantType.Fruiting]: {
    minEth: 0.3001,
    maxEth: 0.75,
    startTime: 7,
    endTime: 23,
    profitDays: 20,
    profitRate: 4000,
    rewardAmounts: 20000,
    blast: 4540,
    image: FruitingImg,
  },
  [PlantType.VegetativeVariation]: {
    minEth: 0.0451,
    maxEth: 0.125,
    startTime: 7,
    endTime: 23,
    profitDays: 1,
    profitRate: 5,
    rewardAmounts: 5000,
    blast: 1130,
    image: VegetativeVariationImg,
  },
}
