import React from 'react'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Button, Image } from 'antd'
import { PlantType } from '@/models/PlantType'
import type { Plant } from '@/models/Plant'
import { priceRanges } from '@/data/priceRanges'
import Tree from '@/pages/components/Tree'

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
  const { t } = useTranslation()

  return (
    <div className="h400 w-300 primary-color p6 text-center">

      <Tree depthValue={plant.plantType + 2} width={300} height={220} />

      <div className="flex justify-center gap-x-24 text-center">
        <h3 className="m0 p0">
          {t('market.plant.id')}
          ：

          {String(plant.plantId)}
        </h3>

        <h3 className="m0 p0">{PlantType[plant.plantType]}</h3>
      </div>

      <div className="my-4 flex flex-col primary-text">
        <PlantInfo label={t('market.plant.value')} value={`：${ethers.formatEther(plant.valueEth)} ETH`} />
        <PlantInfo label={t('market.plant.adoptionTime')}value={`：${dayjs.unix(plant.adoptedTimestamp).format('YYYY MM-DD HH:mm:ss')}`} />
        <PlantInfo label={t('market.plant.profitDays')} value={`：${priceRanges[plant.plantType].profitDays}`} />
        <PlantInfo label={t('market.plant.profitRate')} value={`：${priceRanges[plant.plantType].profitRate / 100}%`} />
        <PlantInfo label={t('market.plant.diggableTREE')} value={`：${[priceRanges[plant.plantType].rewardAmounts]}`} />
        <PlantInfo label={t('market.plant.blastAirdrop')} value={`：${[priceRanges[plant.plantType].blast / 100]}%`} />

      </div>
    </div>
  )
}

interface PlantInfoProps {
  label: string
  value: string
}

export default MyPlantCard
