import type {
  Chain,
} from '@rainbow-me/rainbowkit'
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import {
  QueryClient,
} from '@tanstack/react-query'

const blast = {
  id: 81457,
  name: 'Blast',
  iconUrl: 'https://blastscan.io/images/svg/brands/main-light.svg?v=24.2.2.1',
  iconBackground: 'black',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: [import.meta.env.VITE_JSON_RPC] },
  },
  blockExplorers: {
    default: { name: 'Blast', url: 'https://blastscan.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain

const blastSepolia = {
  id: 168587773,
  name: 'Blast Sepolia',
  iconUrl: 'https://blastscan.io/images/svg/brands/main-light.svg?v=24.2.2.1',
  iconBackground: 'black',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: [import.meta.env.VITE_JSON_RPC] },
  },
  blockExplorers: {
    default: { name: 'BlastSepolia', url: 'https://testnet.blastscan.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain

const walletCConfig = getDefaultConfig({
  appName: import.meta.env.VITE_DAPP_TITLE,
  projectId: import.meta.env.VITE_PROJECT_ID_FOR_WALLETS,
  chains: [blast],
})

const queryClient = new QueryClient()

export {
  walletCConfig,
  queryClient,
}
