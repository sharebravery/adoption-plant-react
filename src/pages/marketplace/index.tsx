import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { priceRanges } from '../home/priceRanges'
import PlantCard from './components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'
import type { AdoptionPriceRange } from '@/models/AdoptionPriceRange'
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

  const [plantRecord, setPlantRecord] = useState<Record<string, Plant[]>>()

  const [adoptLoading, setAdoptLoading] = useState(false)

  async function fetchData() {
    const res = await contractService?.getMarketListings()

    if (res) {
      const data = plantArray2PlantMap(res)

      const grouped = groupBy(data, item => item.plantType.toString())
      console.log('%c🚀[grouped]-36:', 'color: #5d44ce', grouped)

      setPlantRecord(() => grouped)
    }

    console.log('%c🚀[res]-9:', 'color: #8d411d', res)
  }

  useEffect(() => {
    contractService && fetchData()
  }, [contractService])

  async function adoptPlant(plantType: PlantType) {
    console.log('%c🚀[plantType]-50:', 'color: #4d0c01', plantType)
    setAdoptLoading(true)
    try {
      if (!plantRecord)
        return

      const ids = plantRecord[plantType].map(e => Number(e.plantId))

      const randomId = getRandomId(ids)
      if (!randomId) {
        message.error('没有植物可以领养')
        return
      }
      console.log('%c🚀[randomId]-55:', 'color: #be5076', randomId)
      const plant = plantRecord[plantType].find(e => Number(e.plantId) === randomId)!

      const res = await contractService?.adoptPlant(plant.plantId, plant.minEth)
      console.log('%c🚀[res]-31:', 'color: #148ae5', res)

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
      message.error('执行错误')
    }
    finally {
      setAdoptLoading(false)
    }
  }

  return (
    <div>
      <div className="flex gap-24">

        {
        Object.entries(priceRanges).map(([plantType, priceRange]) => (
          <div key={plantType}>
            <PlantCard plant={({ ...new Plant(), ...priceRange, profitRate: priceRange.profitRate / 100, plantType: Number(plantType) }) as any} />

            {
                plantRecord
                && <Button disabled={plantRecord[plantType] ? plantRecord[plantType].length <= 0 : true} loading={adoptLoading} type="primary" onClick={() => adoptPlant(Number(plantType))}>领养</Button>

            }
          </div>
        ))
     }

        {/* {plantList.map(item => (

          <div key={item.plantId}>
            <PlantCard plant={item} />
            <Button loading={adoptLoading} type="primary" onClick={() => adoptPlant(item)}>领养</Button>
          </div>
        ))} */}

      </div>
    </div>
  )
}
