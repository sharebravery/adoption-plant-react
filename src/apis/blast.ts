import axios from 'axios'

// POST /v1/dapp-auth/challenge
interface Request {
  contractAddress: string // contract with points to be distributed
  operatorAddress: string // the EOA configured with IBlastPoints
}

interface Response {
  success: boolean
  challengeData: string // save this for later; don't sign it
  message: string // this is what you need to sign
}

export class BlastService {
  static async Authenticating() {
    return axios.request<Response>({ headers: { 'Content-Type': 'application/json' }, ...{
      url: `/api/v1/dapp-auth/challenge`,
      method: 'POST',
      params: {
        contractAddress: import.meta.env.VITE_PLANT_MARKET_CONTRACT,
        operatorAddress: import.meta.env.VITE_OPERATOR_ADDRESS,
      } as Request,
    } })
  }
}
