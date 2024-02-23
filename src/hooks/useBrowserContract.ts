import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { ContractService } from '../contract/contractService'

function useBrowserContract() {
  const [provider, setProvider] = useState<ethers.BrowserProvider>()
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()

  const [contractService, setContractService] = useState<ContractService>()

  const { isConnected } = useAccount()

  const initializeSigner = async (provider: ethers.BrowserProvider) => {
    if (provider) {
      const newSigner = await provider.getSigner()
      setSigner(newSigner)

      setContractService(new ContractService(newSigner))
    }
  }

  const initializeProvider = async () => {
    const newProvider = new ethers.BrowserProvider(window.ethereum)
    setProvider(newProvider)
    initializeSigner(newProvider)
  }

  useEffect(() => {
    if (isConnected === true) { initializeProvider() }
    else {
      setProvider(undefined)
      setSigner(undefined)
    }
  }, [isConnected])

  return {
    provider,
    signer,
    initializeProvider,
    contractService,
  }
}

export default useBrowserContract
