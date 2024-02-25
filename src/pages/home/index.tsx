import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import Marketplace from '../marketplace'
import My from '../my'

export default function Home() {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: 'Marketplace',
      label: 'Marketplace',
      children: <Marketplace />,
    },
    {
      key: 'My',
      label: 'My',
      children: <My />,
    },
  ]

  return (
    <div>
      <Tabs defaultActiveKey="Marketplace" items={items} onChange={onChange} />
    </div>

  )
}
