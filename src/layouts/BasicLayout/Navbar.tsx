import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import Logo from '/logo.png'

interface NavbarProps {
  title: string
  showInput?: boolean
}

const Navbar: React.FC<NavbarProps> = () => {
  const { address, isConnected } = useAccount({ onConnect({ address }) {
    localStorage.setItem('currentAccount', address as string)
  } })

  useEffect(() => {
    const currentAccount = localStorage.getItem('currentAccount')
    if (currentAccount !== address && isConnected)
      window.location.reload()
  }, [address, isConnected])

  return (
    <nav className="h68 w-full flex items-center justify-between text-white" id="navBar">
      <div><img onClick={() => window.location.href = '/'} src={Logo} alt="" className="top-8 mx6 h44 w150 cursor-pointer max-sm:w-120" /></div>

      <ConnectButton />
    </nav>
  )
}

export default Navbar
