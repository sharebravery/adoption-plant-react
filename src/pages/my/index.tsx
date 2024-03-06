import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { ethers } from 'ethers'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { ReloadOutlined } from '@ant-design/icons'
import { priceRanges } from '../../data/priceRanges'
import MyPlantCard from './components/PlantCard'
import useBrowserContract from '@/hooks/useBrowserContract'
import type { Plant } from '@/models/Plant'
import { plantArray2PlantMap } from '@/utils/plantArray2PlantMap'
import { addTokenToMetaMask } from '@/utils/addTokenToMetaMask'

export default function My() {
  const { contractService } = useBrowserContract()

  const { t } = useTranslation()

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
        message.warning(t('message.market.contractHasNotExpired'))
        return
      }

      await contractService?.list(plant.plantId)
    }
    catch (error) {
      console.log('%c🚀[error]-30:', 'color: #448f18', error)
      message.error(t('message.market.executionError'))
    }
    finally {
      setListLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>

        <Button type="text" onClick={fetchData}>
          <ReloadOutlined />
          Refresh
        </Button>

        <div className="mb-12 flex items-center gap-24 px-24 text-center">
          <p className="primary-text">
            TREE：
            {treeTokens}
          </p>
          <Button className="primary-btn" onClick={() => addTokenToMetaMask(import.meta.env.VITE_AUTHORIZED_ERC20_CONTRACT, 'TREE', 18)}>{t('my.button.add2Wallet')}</Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-24">

        {plantList.map(item => (
          <div key={item.plantId}>
            <MyPlantCard plant={item} />
            {/* { dayjs.unix(dayjs().unix()).format('YYYY-MM-DD HH:mm:ss')}
            ___
            {
            dayjs.unix(item.adoptedTimestamp + priceRanges[item.plantType].profitDays * 60).format('YYYY-MM-DD HH:mm:ss')
          } */}
            <div className="flex justify-center gap-x-12 primary-color py-6">
              <Button className="w-200 primary-btn" loading={listLoading} onClick={() => onList(item)}>{t('my.button.list')}</Button>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
