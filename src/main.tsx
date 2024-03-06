import 'uno.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import type { Locale } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import '@/locale/i18n.ts'
import { getLanguageLib } from './utils/getLanguageLib.ts'
import { chains, wagmiConfig } from './utils/connectWallet.ts'
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
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()} locale={browserLanguageLib.browserLanguage as Locale}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </ConfigProvider>,
)
