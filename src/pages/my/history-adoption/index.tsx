import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import MyPlantCard from '../components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'

export default function HistoryAdoption() {
  const { contractService } = useBrowserContract()

  const { t } = useTranslation()

  const [plantList, setPlantList] = useState<Plant[]>([])

  async function fetchData() {
    const res = await contractService?.getUserAdoptionRecordPlantIds()
    setPlantList(() => res ?? [])

    console.log('%c🚀[getUserAdoptedPlants]-9:', 'color: #5c6a37', res)
  }

  useEffect((
  ) => {
    contractService && fetchData()
  }, [contractService])

  return (
    <div>

      <div className="flex flex-wrap items-center justify-center gap-24">
        <Button type="text" onClick={fetchData}>
          <ReloadOutlined />
          {t('refresh')}
        </Button>

        {plantList.map(item => (
          <div key={item.adoptedTimestamp}>
            <MyPlantCard plant={item} page="history" />
          </div>
        ))}
      </div>
    </div>
  )
}
