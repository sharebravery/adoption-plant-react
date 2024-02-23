import React from 'react'
import { priceRanges } from '../home/priceRanges'
import type { MarketPlantInfo } from '@/models/MarketPlantInfo'
import { PlantType } from '@/models/PlantType'

const PlantInfo: React.FC<PlantInfoProps> = ({ label, value }) => {
  return (
    <span>
      {label}
      {value}
    </span>
  )
}

interface PlantCardProps {
  plant: MarketPlantInfo
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <div className="w-full bg-green p6 text-center">
      <p>
        植物编号：
        {String(plant.plantId)}
      </p>

      <div>{PlantType[plant.plantType]}</div>

      <div className="my-4 flex flex-col">
        <PlantInfo label="最低领养价格：" value={`${priceRanges[plant.plantType]?.minEth} ETH`} />
        <PlantInfo label="最高领养价格：" value={`${priceRanges[plant.plantType]?.maxEth} ETH`} />
        <PlantInfo label="开始时间：" value={`${priceRanges[plant.plantType]?.startTime} 小时`} />
        <PlantInfo label="结束时间：" value={`${priceRanges[plant.plantType]?.endTime} 小时`} />
        <PlantInfo label="收益天数：" value={`${priceRanges[plant.plantType]?.profitDays}`} />
        <PlantInfo label="收益率：" value={`${priceRanges[plant.plantType]?.profitRate}%`} />
      </div>
    </div>
  )
}

interface PlantInfoProps {
  label: string
  value: string
}

export default PlantCard
