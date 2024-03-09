import { ConnectButton } from '@rainbow-me/rainbowkit'
import Logo from '/logo.png'

interface NavbarProps {
  title: string
  showInput?: boolean
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="h68 w-full flex items-center justify-between text-white" id="navBar">
      <div><img onClick={() => window.location.href = '/'} src={Logo} alt="" className="top-8 mx6 h44 w150 cursor-pointer max-sm:w-120" /></div>

      <ConnectButton />
    </nav>
  )
}

export default Navbar
