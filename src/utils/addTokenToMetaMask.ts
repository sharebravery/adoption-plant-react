export async function addTokenToMetaMask(tokenAddress: string, tokenSymbol: string, tokenDecimals: number) {
  if (!window.ethereum) {
    console.error('MetaMask is not installed!')
    return
  }

  try {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
        },
      },
    })
    console.log('Token added successfully to MetaMask wallet!')
  }
  catch (error) {
    console.error('Error adding token to MetaMask wallet:', error)
  }
}

// 使用你的代币合约地址、符号和小数位数调用addTokenToMetaMask函数，例如：
// const tokenAddress = '0xTokenAddress';
// const tokenSymbol = 'TOKEN';
// const tokenDecimals = 18;
// addTokenToMetaMask(tokenAddress, tokenSymbol, tokenDecimals);
