import { notification } from 'antd'
import type { ethers } from 'ethers'

export async function handleTransaction(
  transactionResponse: ethers.ContractTransactionResponse | undefined,
  successMessage = 'Transaction Successful',
  failureMessage = 'Transaction Failed',
): Promise<ethers.ContractTransactionReceipt | undefined> {
  if (!transactionResponse)
    throw new Error('Transaction response is undefined')

  try {
    const receipt = await transactionResponse.wait()

    if (!receipt)
      throw new Error('HandleTransaction: Transaction receipt is undefined')

    if (receipt.status === 1) {
      // Transaction succeeded
      notification.success({
        message: successMessage,
        description: 'Your transaction was successful!',
      })
    }
    else {
      // Transaction failed
      notification.error({
        message: failureMessage,
        description: 'Your transaction failed. Please try again.',
      })
      throw new Error('HandleTransaction: Your transaction failed. Please try again.')
    }

    return receipt
  }
  catch (error) {
    console.error('Error while waiting for transaction receipt:', error)

    notification.error({
      message: 'Transaction Error',
      description: 'An error occurred during the transaction. Please try again.',
    })
    throw error
  }
}
