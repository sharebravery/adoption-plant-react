import { useEffect, useState } from 'react'
import MyPlantCard from '../components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import { priceRanges } from '@/data/priceRanges'
import type { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'

export default function HistoryAdoption() {
  const { contractService } = useBrowserContract()

  const [plantList, setPlantList] = useState<Plant[]>([])

  async function fetchData() {
    const res = await contractService?.getUserAdoptedPlants(true)
    if (res) {
      const data = plantArray2PlantMap(res).map(e => ({
        ...e,
        valueEth: BigInt(BigInt(e.valueEth) + BigInt(e.valueEth) * BigInt(priceRanges[e.plantType].profitRate) / 10000n),
      }))
      console.log('%c🚀[data]-20:', 'color: #a45e4b', data)
      setPlantList(() => data)
    }

    console.log('%c🚀[getUserAdoptedPlants]-9:', 'color: #5c6a37', res)
  }

  useEffect((
  ) => {
    contractService && fetchData()
  }, [contractService])
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-24">

        {plantList.map(item => (
          <div key={item.plantId}>
            <div className="primary-color px-12">
              ID：
              {' '}
              {String(item.plantId)}
            </div>
            <MyPlantCard plant={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
