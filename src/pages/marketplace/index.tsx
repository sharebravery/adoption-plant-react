import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReloadOutlined } from '@ant-design/icons'
import { priceRanges } from '../../data/priceRanges'
import PlantCard from './components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'
import { groupBy } from '@/utils/groupBy'
import type { PlantType } from '@/models/PlantType'

function getRandomId(ids: number[]): number | null {
  // 检查 ID 集合是否为空
  if (ids.length === 0)
    return null // 如果为空，返回 null

  // 生成一个随机索引，范围在 0 到 ids.length - 1 之间
  const randomIndex = Math.floor(Math.random() * ids.length)
  // 返回对应索引位置的 ID
  return ids[randomIndex]
}

export default function Marketplace() {
  const { contractService } = useBrowserContract()

  const { t } = useTranslation()

  const [plantRecord, setPlantRecord] = useState<Record<string, Plant[]>>()

  const [adoptLoading, setAdoptLoading] = useState(false)

  const [scheduleLoading, setScheduleLoading] = useState(false)

  async function fetchData() {
    const res = await contractService?.getMarketListings()
    console.log('%c🚀[getMarketListings]-32:', 'color: #295ed1', res)

    if (res) {
      const data = plantArray2PlantMap(res)

      const grouped = groupBy(data, item => item.plantType.toString())

      setPlantRecord(() => grouped)
    }

    console.log('%c🚀[res]-9:', 'color: #8d411d', res)
  }

  useEffect(() => {
    contractService && fetchData()
  }, [contractService])

  async function adoptPlant(plantType: PlantType) {
    setAdoptLoading(true)
    try {
      if (!plantRecord)
        return

      const balance = await contractService?.getUserBalance()
      console.log('%c🚀[balance]-60:', 'color: #426820', balance)

      if (Number(balance ?? 0n) < priceRanges[plantType].rewardAmounts / 100) {
        message.warning(t('message.market.notEnoughTreePleaseSchedule'))
        return
      }

      const ids = plantRecord[plantType].map(e => Number(e.plantId))

      if (ids.length <= 0) {
        message.error(t('message.market.noPlantsToAdopts'))
        return
      }

      const randomId = getRandomId(ids)

      const plant = plantRecord[plantType].find(e => Number(e.plantId) === randomId)!

      const res = await contractService?.adoptPlant(plant.plantId, plant.valueEth)

      if (res?.status === 1) {
        // 成功领养后从记录中删除已领养的植物
        setPlantRecord((prevState) => {
          const updatedRecords = { ...prevState }
          updatedRecords[plantType] = prevState![plantType].filter(e => Number(e.plantId) !== randomId)
          return updatedRecords
        })
      }
    }
    catch (error) {
      console.log('%c🚀[error]-32:', 'color: #0c10e0', error)
      message.error(t('message.market.maybeEnoughOrTimeNotUp'))
    }
    finally {
      setAdoptLoading(false)
    }
  }

  async function scheduleAdoption(type: PlantType) {
    setScheduleLoading(true)
    try {
      await contractService?.scheduleAdoption(type)
    }
    catch (error) {
      message.error(t('message.market.maybeNoHavePlat'))
      console.log('%c🚀[error]-94:', 'color: #1c1ab9', error)
    }
    finally {
      setScheduleLoading(false)
    }
  }

  return (
    <div>
      <div className="w-full">
        <Button className="mx-10% mb-24" type="text" onClick={fetchData}>
          <ReloadOutlined />
          {t('refresh')}
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-24">

          {
        Object.entries(priceRanges).map(([plantType, priceRange]) => (
          <div key={plantType}>
            <PlantCard plant={({ ...new Plant(), ...priceRange, profitRate: priceRange.profitRate / 100, plantType: Number(plantType) }) as any} />

            <div className="flex justify-center gap-x-12 primary-color py-6">
              <Button className="w-120 primary-btn" loading={scheduleLoading} onClick={() => scheduleAdoption(Number(plantType))}>{t('market.button.schedule')}</Button>
              {
                plantRecord
                && <Button className="w-120 primary-btn" type="primary" disabled={plantRecord[plantType] ? plantRecord[plantType].length <= 0 : true} loading={adoptLoading} onClick={() => adoptPlant(Number(plantType))}>{t('market.button.adoption')}</Button>

            }
            </div>
          </div>
        ))
     }

        </div>
      </div>
    </div>
  )
}
