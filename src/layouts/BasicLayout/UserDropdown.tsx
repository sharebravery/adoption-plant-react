import { useAccountModal } from '@rainbow-me/rainbowkit'
import Dropdown from 'antd/es/dropdown'
import type { MenuProps } from 'antd/es/menu'
import React from 'react'
import { Link } from 'react-router-dom'
import GlyphImg from '@/assets/home.png'
import DisconnectImg from '@/assets/Disconnect.png'

interface IProps {
  children: React.ReactNode
}

const UserDropdown: React.FC<IProps> = ({ children }) => {
  const { openAccountModal } = useAccountModal()

  const items: MenuProps['items'] = [
    {
      key: 'Glyph',
      label: (
        <Link className="flex items-center c-#fff" to="/my-glyph">
          <img src={GlyphImg} alt="" className="mr-9 h15 w15" />
          My Glyph
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'signOut',
      label: (
        <a className="flex items-center c-#fff" onClick={openAccountModal}>
          <img src={DisconnectImg} alt="" className="mr-9 h15 w15" />
          {' '}
          Sign Out
        </a>
      ),
    },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottomRight" overlayClassName="pt-12 text-12 box-border h18">
      {children}
    </Dropdown>
  )
}

export default UserDropdown
