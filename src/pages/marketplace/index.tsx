import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import PlantCard from '../components/PlantCard'
import type { MarketPlantInfo } from '@/models/MarketPlantInfo'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'

export default function Marketplace() {
  const { contractService } = useBrowserContract()

  const [plantList, setPlantList] = useState<Plant[]>([])

  const [adoptLoading, setAdoptLoading] = useState(false)

  async function fetchData() {
    const res = await contractService?.getMarketListings()

    if (res)
      setPlantList(() => plantArray2PlantMap(res))

    console.log('%c🚀[res]-9:', 'color: #8d411d', res)
  }

  useEffect(() => {
    contractService && fetchData()
  }, [contractService])

  async function adoptPlant(plant: Plant) {
    setAdoptLoading(true)
    try {
      const res = await contractService?.adoptPlant(plant.plantId, plant.minEth)
      console.log('%c🚀[res]-31:', 'color: #148ae5', res)
    }
    catch (error) {
      console.log('%c🚀[error]-32:', 'color: #0c10e0', error)
      message.error('执行错误')
    }
    finally {
      setAdoptLoading(false)
    }
  }

  return (
    <div>
      <div className="flex gap-24">

        <Button onClick={contractService?.autoSplitAndSettle}>结算测试</Button>

        {plantList.map(item => (

          <div key={item.plantId}>
            <PlantCard plant={item} />
            <Button loading={adoptLoading} type="primary" onClick={() => adoptPlant(item)}>领养</Button>
          </div>
        ))}

      </div>
    </div>
  )
}
