import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import PlantCard from '../components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { MarketPlantInfo } from '@/models/MarketPlantInfo'
import { PlantType } from '@/models/PlantType'

export default function Home() {
  const { contractService } = useBrowserContract()

  const [plantList, setPlantList] = useState<MarketPlantInfo[]>([])

  const [adoptLoading, setAdoptLoading] = useState(false)

  async function fetchData() {
    const res = await contractService?.getMarketListings()

    if (res) {
      setPlantList(() => res.map(e => ({
        plantId: e[0],
        plantType: Number(e[1]),
      })))
    }
    console.log('%c🚀[res]-9:', 'color: #8d411d', res)
  }

  useEffect(() => {
    contractService && fetchData()
  }, [contractService])

  async function adoptPlant(plantId: bigint) {
    setAdoptLoading(true)
    try {
      const res = await contractService?.adoptPlant(plantId)
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
    <div className="flex gap-24">

      <Button onClick={() => contractService?.createPlant(PlantType.Ordinary)}>官方创建植物</Button>

      {plantList.map(item => (

        <div key={item.plantId}>
          <PlantCard plant={item} />

          <Button loading={adoptLoading} type="primary" onClick={() => adoptPlant(item.plantId)}>领养</Button>
        </div>
        // <p key={item.plantId}>
        //   {item.plantId}
        //   {item.plantType}
        // </p>
      ))}

    </div>

  )
}
