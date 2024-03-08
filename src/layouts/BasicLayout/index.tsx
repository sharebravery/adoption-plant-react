import React from 'react'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

interface IProps {
  children: React.ReactNode
}

const BasicLayout: React.FC<IProps> = ({ children }) => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-cover bg-fixed bg-center bg-no-repeat bg-origin-border">
      <header className="fixed z-110 h68 w-100% bg-#242424 2xl:w-1400 lg:w-1000 xl:w-1200">
        <div className="w-98%">
          <Navbar title="Follow" />
        </div>
      </header>

      <div className="fixed top-68 h1 w-full bg-#070404"></div>

      <div className="h-100"></div>

      <div className="h16 w-full" />

      <main className="h-full w-375 items-center lg:w-800 md:w-400 sm:w-375 xl:w-1200">
        <Menu mode="horizontal" className="flex justify-center bg-#242424">
          <Menu.Item key="Marketplace">
            <Link to="/">
              {t('tab.market.title')}
            </Link>
          </Menu.Item>
          <Menu.Item key="My">
            <Link to="/my">
              {t('tab.my.title')}
            </Link>
          </Menu.Item>
          <Menu.Item key="Notice">
            <Link to="/notice">
              {t('tab.notice.title')}
            </Link>
          </Menu.Item>
        </Menu>

        <div className="h20" />
        {children}
      </main>

      <div className="h-60 w-full" />
    </div>
  )
}

export default BasicLayout
