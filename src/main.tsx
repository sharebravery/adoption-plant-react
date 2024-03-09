import 'uno.css'
import '@rainbow-me/rainbowkit/styles.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import type { Locale } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import '@/locale/i18n.ts'
import { getLanguageLib } from './utils/getLanguageLib.ts'

import { queryClient, walletCConfig } from './utils/connectWalletCustomChains.ts'
import App from './App.tsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const browserLanguageLib = getLanguageLib()

root.render(
  <ConfigProvider
    locale={browserLanguageLib.locale}
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <BrowserRouter>
      <WagmiProvider config={walletCConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()} locale={browserLanguageLib.browserLanguage as Locale}>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </ConfigProvider>,
)
