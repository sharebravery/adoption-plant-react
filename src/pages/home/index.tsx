import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import Marketplace from '../marketplace'
import My from '../my'
import Test from '../test/Test'

export default function Home() {
  const { t } = useTranslation()

  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: 'Marketplace',
      label: t('tab.market.title'),
      children: <Marketplace />,
    },
    {
      key: 'My',
      label: t('tab.my.title'),
      children: <My />,
    },
    {
      key: 'Test',
      label: 'Test',
      children: <Test />,
    },
  ]

  return (
    <div>
      <Tabs centered defaultActiveKey="Marketplace" items={items} onChange={onChange} />
    </div>

  )
}
