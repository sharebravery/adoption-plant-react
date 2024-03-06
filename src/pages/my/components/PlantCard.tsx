import React from 'react'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import { PlantType } from '@/models/PlantType'
import type { Plant } from '@/models/Plant'
import { priceRanges } from '@/pages/home/priceRanges'

const PlantInfo: React.FC<PlantInfoProps> = ({ label, value }) => {
  return (
    <span>
      {label}
      {value}
    </span>
  )
}

interface PlantCardProps {
  plant: Plant
}

const MyPlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <div className="w-full bg-green p6 text-center">
      <p>
        植物编号：
        {String(plant.plantId)}
      </p>

      <div>{PlantType[plant.plantType]}</div>

      <div className="my-4 flex flex-col">
        <PlantInfo label="价值：" value={`${ethers.formatEther(plant.valueEth)} ETH`} />
        <PlantInfo label="领养时间：" value={`${dayjs.unix(plant.adoptedTimestamp).format('YYYY MM-DD HH:mm:ss')}`} />
        <PlantInfo label="收益天数：" value={`${priceRanges[plant.plantType].profitDays}`} />
        <PlantInfo label="收益率：" value={`${priceRanges[plant.plantType].profitRate / 100}%`} />
        <PlantInfo label="可挖TREE：" value={`${[priceRanges[plant.plantType].rewardAmounts]}`} />
        <PlantInfo label="Blast空投：" value={`${[priceRanges[plant.plantType].blast / 100]}%`} />
      </div>
    </div>
  )
}

interface PlantInfoProps {
  label: string
  value: string
}

export default MyPlantCard
