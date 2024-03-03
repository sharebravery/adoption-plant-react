import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { ethers } from 'ethers'
import { priceRanges } from '../home/priceRanges'
import MyPlantCard from './components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'

export default function My() {
  const { contractService } = useBrowserContract()

  const [plantList, setPlantList] = useState<Plant[]>([])

  const [listLoading, setListLoading] = useState(false)

  const [treeTokens, setTreeTokens] = useState('0')

  useEffect(() => {
    async function fetchData() {
      if (!contractService)
        return
      const balance = await contractService.getUserBalance()
      setTreeTokens(ethers.formatEther(balance))
      console.log('%c🚀[balance]-20:', 'color: #675d94', balance)
    }

    fetchData()
  }, [contractService])

  async function fetchData() {
    const res = await contractService?.getUserAdoptedPlants()
    if (res) {
      const data = plantArray2PlantMap(res).map(e => ({
        ...e,
        minEth: String(Number(e.valueEth) + Number(e.valueEth) * priceRanges[e.plantType].profitRate / 100),
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

      <p>
        TREE:
        {treeTokens}
      </p>
      <p className="c-blue">{import.meta.env.VITE_PLANT_ERC20_CONTRACT}</p>

      {plantList.map(item => (
        <div key={item.plantId}>
          <MyPlantCard plant={item} />
          <Button loading={listLoading} onClick={() => onList(item.plantId)}>挂单</Button>
        </div>
      ))}

    </div>
  )
}
