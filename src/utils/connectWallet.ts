import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import {
  arbitrum,
  polygonMumbai,
} from 'wagmi/chains'

import { alchemyProvider } from 'wagmi/providers/alchemy'
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
        http: [import.meta.env.VITE_JSON_RPC],
        webSocket: [`wss://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`],
      },
      default: {
        http: [import.meta.env.VITE_JSON_RPC],
      },
      public: {
        http: [import.meta.env.VITE_JSON_RPC],
      },
    },
  },
}

const blast = {
  ...polygonMumbai,
  id: 168587773,
  name: 'Blast Sepolia',
  network: 'BlastSepolia',
  rpcUrls: {
    ...polygonMumbai.rpcUrls,
    ...{
      localhost: {
        http: [import.meta.env.VITE_JSON_RPC],
        // webSocket: [`wss://polygon-mumbai.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`],
      },
      default: {
        http: [import.meta.env.VITE_JSON_RPC],
      },
      public: {
        http: [import.meta.env.VITE_JSON_RPC],
      },
    },
  },
}

const chainList = [blast, polygonMumbai]

if (import.meta.env.DEV)
  chainList.unshift(...[polygonMumbai, localhost] as any)

const { chains, publicClient } = configureChains(
  chainList,
  [
    alchemyProvider({
      apiKey: import.meta.env.VITE_ALCHEMY_ID,
    }),
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
