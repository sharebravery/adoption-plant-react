import { useEffect, useState } from 'react'
import MyPlantCard from '../components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'

export default function HistoryAdoption() {
  const { contractService } = useBrowserContract()

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

        {plantList.map(item => (
          <div key={item.plantId}>
            <MyPlantCard plant={item} page="history" />
          </div>
        ))}
      </div>
    </div>
  )
}
