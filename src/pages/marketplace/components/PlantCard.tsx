import React from 'react'
import { useTranslation } from 'react-i18next'
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

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const { t } = useTranslation()

  return (
    <div className="h390 w-300 primary-color p6 text-center">
      {/* <p>
        植物编号：
        {String(plant.plantId)}
      </p> */}

      <Tree plantType={plant.plantType} depthValue={plant.plantType + 2} width={300} height={220} />
      <h3 className="m0 p0">{PlantType[plant.plantType]}</h3>

      <div className="my-4 flex flex-col primary-text">
        <PlantInfo label={t('market.plant.value')} value={`：${priceRanges[plant.plantType].minEth} - ${priceRanges[plant.plantType].maxEth} ETH`} />
        <PlantInfo label={t('market.plant.adoptionTime')} value={`：${priceRanges[plant.plantType].startTime}:00 - ${priceRanges[plant.plantType].endTime}:00`} />
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

export default PlantCard
