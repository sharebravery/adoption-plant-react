import { ConnectButton } from '@rainbow-me/rainbowkit'
import UserDropdown from './UserDropdown'

// import walletImage from '@/assets/wallet.png'
// import menuImage from '@/assets/menu.png'

function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected
          = ready
          && account
          && chain
          && (!authenticationStatus
          || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <>
                    <button onClick={openConnectModal} type="button" className="h48 w170 rounded-30 font-size-18 max-md:hidden primary-btn">
                      Connect Wallet
                    </button>

                    <div className="hidden max-md:block">
                      <div className="flex gap-x-16">
                        {/* <Image className="transition-opacity hover:opacity-80" preview={false} src={walletImage} onClick={openConnectModal} />

                        <MobileDropdown>
                          <Image preview={false} src={menuImage} />
                        </MobileDropdown> */}

                      </div>
                    </div>
                  </>
                )
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                )
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="max-md:hidden">
                    <button
                      onClick={openChainModal}
                      className="h36 w166 border-[#7189f7] rounded-full bg-transparent text-14 c-purple"
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
                  </div>

                  <UserDropdown>
                    <button className="h36 border-[#7189f7] rounded-full bg-transparent text-14 c-purple" type="button">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}

                      {account.displayName}
                    </button>
                  </UserDropdown>

                  {/* <div className="hidden max-md:block">
                    <MobileDropdown>
                      <Image width={30} height={30} preview={false} src={menuImage} />
                    </MobileDropdown>
                  </div> */}

                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default WalletConnectButton
