import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import Marketplace from '../marketplace'
import My from '../my'
import Notice from '../notice'

export default function Home() {
  const { t } = useTranslation()

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
      key: 'Notice',
      label: t('tab.notice.title'),
      children: <Notice />,
    },
  ]

  return (
    <div>
      <Tabs centered defaultActiveKey="Marketplace" items={items} />
    </div>

  )
}
