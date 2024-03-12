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
import { Provider, ErrorBoundary } from '@rollbar/react'
import { getLanguageLib } from './utils/getLanguageLib.ts'
import { queryClient, walletCConfig } from './utils/connectWalletCustomChains.ts'
import App from './App.tsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const browserLanguageLib = getLanguageLib()

const rollbarConfig = {
  accessToken: 'cab2efcd5b4b414d8edf8199cf9ac6d7',
  environment: 'testenv',
}



root.render(
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
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
      </ConfigProvider>
    </ErrorBoundary>
  </Provider>
)
