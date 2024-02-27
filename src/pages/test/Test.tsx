import { Button } from 'antd'
import { priceRanges } from '../home/priceRanges'
import { PlantType } from '@/models/PlantType'
import useBrowserContract from '@/hooks/useBrowserContract'

export default function Test() {
  const { contractService } = useBrowserContract()

  return (
    <div>
      {Object.entries(priceRanges).map(([plantType, priceRange]) => (
        <div key={plantType} className="flex gap-24">
          <h3>
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
          <p>
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
