import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import {
  arbitrum,
  polygonMumbai,
} from 'wagmi/chains'

// import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const localhost = {
  ...polygonMumbai,
  id: 31337,
  name: 'Localhost',
  network: 'localhost',
  rpcUrls: {
    ...polygonMumbai.rpcUrls,
    ...{
      localhost: {
        http: [import.meta.env.VITE_ALCHEMY_ID],
        webSocket: ['wss://polygon-mumbai.g.alchemy.com/v2/1rxe1gkQ1tGxJ_9jaDDpW-HBSyIBYNKt'],
      },
      default: {
        http: [import.meta.env.VITE_ALCHEMY_ID],
      },
      public: {
        http: [import.meta.env.VITE_ALCHEMY_ID],
      },
    },
  },
}

const chainList = [arbitrum]

console.log('%c🚀[import.meta.env]-40:', 'color: #ca0728', import.meta.env)
if (import.meta.env.DEV)
  chainList.unshift(...[polygonMumbai, localhost] as any)
console.log('%c🚀[localhost]-40:', 'color: #d2448d', localhost)

const { chains, publicClient } = configureChains(
  chainList,
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Plant',
  projectId: import.meta.env.VITE_PROJECT_ID_FOR_WALLETS,
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export { wagmiConfig, chains }
