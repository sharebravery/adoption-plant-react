import { Contract, ethers } from 'ethers'
import { handleTransaction } from './handleTransaction'
import PlantMarket_ABI from '@/abis/PlantMarketV1.json'
import PlantERC20_ABI from '@/abis/AuthorizedERC20.json'
import type { AuthorizedERC20, PlantMarketV1 as PlantMarket } from '@/abis/types'
import { enum2Array } from '@/utils'
import { PlantType } from '@/models/PlantType'
import { PlantDTO } from '@/models/PlantDTO'
import type { AdoptionPriceRange } from '@/models/AdoptionPriceRange'

function createContract<T>(
  address: string,
  abi: any,
  signer: ethers.Signer,
): T {
  return new Contract(address, abi, signer) as T
}

export class ContractService {
  constructor(private signer: ethers.JsonRpcSigner) {
  }

  /**
   *not a address
   *
   * @readonly
   * @type {ethers.JsonRpcSigner}
   * @memberof BrowserContractService
   */
  get getSigner(): ethers.JsonRpcSigner {
    return this.signer
  }

  private _plantMarketContract: PlantMarket | undefined = undefined

  private _plantERC20Contract: AuthorizedERC20 | undefined = undefined

  getPlantERC20Contract() {
    if (this._plantERC20Contract)
      return this._plantERC20Contract

    return this._plantERC20Contract = createContract<AuthorizedERC20>(
      import.meta.env.VITE_AUTHORIZED_ERC20_CONTRACT,
      PlantERC20_ABI.abi,
      this.getSigner,
    )
  }

  getPlantMarketContract() {
    if (this._plantMarketContract)
      return this._plantMarketContract

    return this._plantMarketContract = createContract<PlantMarket>(
      import.meta.env.VITE_PLANT_MARKET_CONTRACT,
      PlantMarket_ABI.abi,
      this.getSigner,
    )
  }

  /**
   * 查询用户拥有的TREE代币
   *
   * @return {*}
   * @memberof ContractService
   */
  async getUserBalance() {
    const contract = await this.getPlantERC20Contract()

    return contract.balanceOf(this.getSigner.address)
  }

  /**
   * 市场列表
   *
   * @return {*}
   * @memberof ContractService
   */
  async getMarketListings() {
    const contract = await this.getPlantMarketContract()

    return contract.getMarketListings()
  }

  /**
   * 用户曾经领养植物种类次数
   *
   * @memberof ContractService
   */
  async getUserAdoptionRecord() {
    const contract = await this.getPlantMarketContract()

    const list = enum2Array(PlantType).reduce((pre, cur) => {
      const temp = contract.getUserAdoptionRecord(this.getSigner.address, cur.value)
      pre.push(temp)
      return pre
    }, [] as Promise<bigint>[])

    const res = await Promise.all(list)
    console.log('%c🚀[getUserAdoptionRecord]-67:', 'color: #5f7d1d', res)
    return res
  }

  /**
   * 查询用户当前已领养的植物
   *
   * @return {*}
   * @memberof ContractService
   */
  async getUserAdoptedPlants(includeSplit = false) {
    const contract = await this.getPlantMarketContract()
    return contract.getUserAdoptedPlants(this.getSigner.address, includeSplit) // bool 是否包含已分裂的
  }

  /**
   * 预约
   *
   * @param {PlantType} type
   * @return {*}
   * @memberof ContractService
   */
  async scheduleAdoption(type: PlantType) {
    const contract = await this.getPlantMarketContract()

    const res = await contract.scheduleAdoption(type)
    return handleTransaction(res)
  }

  /**
   * 官方创建植物
   *
   * @return {*}
   * @memberof ContractService
   *
   */
  async createPlant(info: AdoptionPriceRange, type: any) {
    // info.minEth = ethers.parseEther(String(info.minEth) as any)
    // info.maxEth = ethers.parseEther(String(info.maxEth) as any)
    const data = new PlantDTO(type, ethers.parseEther(String(info.minEth)), ethers.parseEther(String(info.maxEth)))
    // // console.log('%c🚀[aa]-99:', 'color: #f930a8', aa)

    // const temp = { ...info, plantType: Number(type) }
    // console.log('%c🚀[temp]-99:', 'color: #310156', temp)

    const contract = await this.getPlantMarketContract()

    await contract.createPlant(data, this.getSigner.address)
  }

  /**
   * 将代币授权给市场合约管理
   *
   * @return {*}  {Promise<boolean>}
   * @memberof ContractService
   */
  async approveMarket(): Promise<boolean> {
    const marketContract = await this.getPlantMarketContract()

    const ERC20Contract = await this.getPlantERC20Contract()

    const a = await marketContract.getAddress()

    const allowance = await ERC20Contract.allowance(this.getSigner.address, a)
    console.log('%c🚀[allowance]-148:', 'color: #2b6903', ethers.parseEther(String(allowance)))

    try {
      if (allowance <= 0n) {
        const res = await ERC20Contract.approve(a, ethers.parseEther(BigInt(10 ** 9).toString()))
        await handleTransaction(res)
      }
      return true
    }
    catch (error) {
      console.log('%c🚀[error]-152:', 'color: #f7182e', error)
      return false
    }
  }

  /**
   * 领养植物
   *
   * @param {bigint} plantId
   * @return {*}
   * @memberof ContractService
   */
  async adoptPlant(plantId: bigint, fee: bigint) {
    console.log('%c🚀[fee]-117:', 'color: #866414', fee)

    try {
      const s = await this.approveMarket()
      console.log('%c🚀[s]-175:', 'color: #06342f', s)
      if (s === false)
        throw new Error('Approve Error')

      const contract = await this.getPlantMarketContract()
      const res = await contract.adoptPlant(plantId, { value: fee })
      console.log('%c🚀[666res]-176:', 'color: #2d495d', res)
      return handleTransaction(res)
    }
    catch (error) {
      console.log('%c🚀[error]-175:', 'color: #830b4a', error)
      throw new Error('error')
    }
  }

  /**
   *挂单
   *
   * @param {bigint} plantId
   * @return {*}
   * @memberof ContractService
   */
  async list(plantId: bigint) {
    console.log('%c🚀[plantId]-199:', 'color: #0011f7', plantId)
    const contract = await this.getPlantMarketContract()

    const res = await contract.list(plantId)
    console.log('%c🚀[res]-203:', 'color: #2c8f08', res)
    return handleTransaction(res)
  }
}
