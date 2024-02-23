import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { NavLink } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
}

const MobileDropdown: React.FC<IProps> = ({ children }) => {
  const items: MenuProps['items'] = [
    {
      key: 'Home',
      label: (
        <NavLink to="/portal" target="_blank" className="text-white hover:c-#5ec1d0">
          Home
        </NavLink>
      ),
    },
    {
      key: 'Tokens',
      label: (
        <NavLink to="/tokens" target="_blank" className={`text-white  hover:c-#5ec1d0 ${['/tokens', '/my-glyph', '/token-detail'].includes(location.pathname) && 'c-#5ec1d0'}`}>
          Tokens
        </NavLink>
      ),
    },
    {
      key: 'Market',
      label: (
        <NavLink to="/market" target="_blank" className={`text-white hover:c-#5ec1d0 ${['/market', '/market-token'].includes(location.pathname) && 'c-#5ec1d0'}`}>
          Market
        </NavLink>
      ),
    },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottomRight" overlayClassName="pt-12 text-12 box-border h18 w-30%">
      {children}
    </Dropdown>
  )
}

export default MobileDropdown
