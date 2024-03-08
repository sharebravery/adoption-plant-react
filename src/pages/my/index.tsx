import { Tabs, type TabsProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd/lib'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import CurrentAdoption from './current-adoption'
import HistoryAdoption from './history-adoption'
import { addTokenToMetaMask } from '@/utils/addTokenToMetaMask'
import useBrowserContract from '@/hooks/useBrowserContract'

export default function My() {
  const { contractService } = useBrowserContract()

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

  return (
    <div>
      <div className="mb-12 flex items-center gap-24 px-24 text-center">
        <p className="primary-text">
          TREE：
          {treeTokens}
        </p>
        <Button className="primary-btn" onClick={() => addTokenToMetaMask(import.meta.env.VITE_AUTHORIZED_ERC20_CONTRACT, 'TREE', 18)}>{t('my.button.add2Wallet')}</Button>
      </div>
      <Tabs type="card" defaultActiveKey="1" items={items} />
    </div>
  )
}
