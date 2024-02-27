import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import PlantCard from '../components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'

export default function My() {
  const { contractService } = useBrowserContract()

  const [plantList, setPlantList] = useState<Plant[]>([])

  const [listLoading, setListLoading] = useState(false)

  async function fetchData() {
    const res = await contractService?.getUserAdoptedPlants()
    if (res)
      setPlantList(() => plantArray2PlantMap(res))

    console.log('%c🚀[getUserAdoptedPlants]-9:', 'color: #5c6a37', res)
  }

  useEffect((
  ) => {
    contractService && fetchData()
  }, [contractService])

  async function onList(id: bigint) {
    setListLoading(true)
    try {
      await contractService?.list(id)
    }
    catch (error) {
      console.log('%c🚀[error]-30:', 'color: #448f18', error)
      message.error('执行错误')
    }
    finally {
      setListLoading(false)
    }
  }

  return (
    <div className="flex gap-24">
      {plantList.map(item => (
        <div key={item.plantId}>
          <PlantCard plant={item} />
          <Button loading={listLoading} onClick={() => onList(item.plantId)}>挂单</Button>
        </div>
      ))}

    </div>
  )
}
