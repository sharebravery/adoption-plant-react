import { useEffect, useState } from 'react'
import PlantCard from '../components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'

export default function My() {
  const { contractService } = useBrowserContract()

  const [plantList, setPlantList] = useState<Plant[]>([])

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

  return (
    <div className="flex gap-24">
      {plantList.map(item => (
        <div key={item.plantId}>
          <PlantCard plant={item} />
        </div>
      ))}

    </div>
  )
}
