import { Button } from 'antd'
import { useState } from 'react'
import { priceRanges } from '../../data/priceRanges'
import { PlantType } from '@/models/PlantType'
import useBrowserContract from '@/hooks/useBrowserContract'

export default function Test() {
  const { contractService } = useBrowserContract()

  const [claimGasLoading, setClaimGasLading] = useState(false)
  const [withdrawLoading, setWithdrawLading] = useState(false)

  async function withdraw() {
    setWithdrawLading(true)
    try {
      await contractService?.withdraw()
    }
    catch (error) {
      console.log('%c🚀[error]-17:', 'color: #73335b', error)
    }
    finally {
      setWithdrawLading(false)
    }
  }

  async function claimGas() {
    setClaimGasLading(true)
    try {
      await contractService?.claimMyContractsGas()
    }
    catch (error) {
      console.log('%c🚀[error]-17:', 'color: #73335b', error)
    }
    finally {
      setClaimGasLading(false)
    }
  }

  return (
    <div>
      <div className="flex gap-24">
        <Button type="primary" className="primary-btn" loading={withdrawLoading} onClick={withdraw}>提取合约余额</Button>
        <Button type="primary" className="primary-btn" loading={claimGasLoading} onClick={claimGas}>提取合约Gas</Button>
      </div>
      {Object.entries(priceRanges).map(([plantType, priceRange]) => (
        <div key={plantType} className="flex gap-24">
          <h3 className="c-green">
            Plant Type:
            {PlantType[plantType as any]}
          </h3>
          <p>
            Min ETH:
            {priceRange.minEth}
          </p>
          <p>
            Max ETH:
            {priceRange.maxEth}
          </p>
          <p>
            Start Time:
            {priceRange.startTime}
          </p>
          <p>
            End Time:
            {priceRange.endTime}
          </p>
          <p className="c-red">
            Profit Days:
            {priceRange.profitDays}
          </p>
          <p>
            Profit Rate:
            {priceRange.profitRate}
          </p>

          <Button type="primary" onClick={() => contractService?.createPlant(priceRange as any, plantType)}>官方创建植物</Button>

        </div>
      ))}
    </div>
  )
}
