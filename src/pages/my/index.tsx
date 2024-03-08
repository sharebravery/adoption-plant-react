import { Tabs, type TabsProps } from 'antd'
import { useTranslation } from 'react-i18next'
import CurrentAdoption from './current-adoption'
import HistoryAdoption from './history-adoption'

export default function My() {
  const { t } = useTranslation()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('my.tab.title.currentAdoption'),
      children: <CurrentAdoption />,
    },
    {
      key: '2',
      label: t('my.tab.title.historyAdoption'),
      children: <HistoryAdoption />,
    },
  ]

  return (
    <div>
      <Tabs type="card" defaultActiveKey="1" items={items} />
    </div>
  )
}
