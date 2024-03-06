// import { NavLink, useLocation } from 'react-router-dom'

// import WalletConnectButton from './WalletConnectButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Logo from '@/assets/react.svg'

interface NavbarProps {
  title: string
  showInput?: boolean
}

const Navbar: React.FC<NavbarProps> = () => {
  // const location = useLocation()

  return (
    <nav className="h68 w-full flex items-center justify-between text-white" id="navBar">
      <div><img src={Logo} alt="" className="top-8 mx6 h44 w150 max-sm:w-120" /></div>

      {/* <ul className="flex list-none justify-around p0 font-size-16 text-[#D2D2D2] max-md:hidden">
        <li className="inline-block scale-100 transform transition-transform hover:scale-110 hover:text-white hover:font-bold">
          <NavLink to="/portal" target="_blank" className="text-white hover:c-#5ec1d0">
            Home
          </NavLink>
        </li>
        <li className="ml-30 inline-block scale-100 transform transition-transform hover:scale-110 hover:text-white hover:font-bold">
          <NavLink to="/tokens" target="_blank" className={`text-white  hover:c-#5ec1d0 ${['/tokens', '/my-glyph', '/token-detail'].includes(location.pathname) && 'c-#5ec1d0'}`}>
            Tokens
          </NavLink>
        </li>
        <li className="ml-30 inline-block scale-100 transform transition-transform hover:scale-110 hover:text-white hover:font-bold">
          <NavLink to="/market" target="_blank" className={`text-white hover:c-#5ec1d0 ${['/market', '/market-token'].includes(location.pathname) && 'c-#5ec1d0'}`}>
            Market
          </NavLink>
        </li>
      </ul> */}

      <ConnectButton />

      {/* <WalletConnectButton /> */}

      {/* <div className="max-md:hidden">
        <WalletConnectButton />
      </div> */}

      {/* <div className="hidden max-md:block">
        <div className="flex">
          <span>wallet</span>
          <MobileDropdown />
        </div>
      </div> */}

    </nav>
  )
}

export default Navbar
