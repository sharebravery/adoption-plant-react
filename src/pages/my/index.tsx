import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import { priceRanges } from '../home/priceRanges'
import MyPlantCard from './components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'
import { addTokenToMetaMask } from '@/utils/addTokenToMetaMask'

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

  async function onList(plant: Plant) {
    setListLoading(true)
    try {
      if (dayjs().unix() < plant.adoptedTimestamp + priceRanges[plant.plantType].profitDays * 60) {
        message.warning('未到合约期限')
        return
      }

      await contractService?.list(plant.plantId)
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
      <p className="c-blue">{import.meta.env.VITE_AUTHORIZED_ERC20_CONTRACT}</p>
      <Button onClick={() => addTokenToMetaMask(import.meta.env.VITE_AUTHORIZED_ERC20_CONTRACT, 'TREE', 18)}>添加到钱包</Button>

      {plantList.map(item => (
        <div key={item.plantId}>
          <MyPlantCard plant={item} />
          { dayjs.unix(dayjs().unix()).format('YYYY-MM-DD HH:mm:ss')}
          ___
          {
            dayjs.unix(item.adoptedTimestamp + priceRanges[item.plantType].profitDays * 60).format('YYYY-MM-DD HH:mm:ss')
          }
          <Button loading={listLoading} onClick={() => onList(item)}>挂单</Button>
        </div>
      ))}

    </div>
  )
}
