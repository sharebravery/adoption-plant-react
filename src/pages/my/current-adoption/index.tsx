import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { ReloadOutlined } from '@ant-design/icons'
import { priceRanges } from '../../../data/priceRanges'
import MyPlantCard from '../components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'

export default function CurrentAdoption() {
  const { contractService } = useBrowserContract()

  const { t } = useTranslation()

  const [plantList, setPlantList] = useState<Plant[]>([])

  const [listLoading, setListLoading] = useState(false)

  async function fetchData() {
    const res = await contractService?.getUserAdoptedCurrentPlants()
    setPlantList(() => res ?? [])
    console.log('%c🚀[getUserAdoptedPlants]-9:', 'color: #5c6a37', res)
  }

  useEffect((
  ) => {
    contractService && fetchData()
  }, [contractService])

  async function onList(plant: Plant) {
    setListLoading(true)
    try {
      // TODO 时间检查
      if (dayjs().unix() < plant.adoptedTimestamp + priceRanges[plant.plantType].profitDays) {
        message.warning(t('message.market.contractHasNotExpired'))
        return
      }

      await contractService?.list(plant.plantId)
    }
    catch (error) {
      console.log('%c🚀[error]-30:', 'color: #448f18', error)
      message.error(t('message.market.executionError'))
    }
    finally {
      setListLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">

      <Button type="text" onClick={fetchData}>
        <ReloadOutlined />
        {t('refresh')}
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-24">

        {plantList.map(item => (
          <div key={item.plantId}>
            <MyPlantCard plant={item} />
            {/* { dayjs.unix(dayjs().unix()).format('YYYY-MM-DD HH:mm:ss')}
            ___
            {
            dayjs.unix(item.adoptedTimestamp + priceRanges[item.plantType].profitDays * 60).format('YYYY-MM-DD HH:mm:ss')
          } */}
            <div className="flex justify-center gap-x-12 primary-color py-6">
              <Button className="w-200 primary-btn" loading={listLoading} onClick={() => onList(item)}>{t('my.button.list')}</Button>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
