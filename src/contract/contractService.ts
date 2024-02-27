import { Contract, ethers } from 'ethers'
import { handleTransaction } from './handleTransaction'
import PlantMarket_ABI from '@/abis/PlantMarket.json'
import type { PlantMarket } from '@/abis/types'
import { enum2Array } from '@/utils'
import { PlantType } from '@/models/PlantType'
import { PlantDTO } from '@/models/PlantDTO'
import { AdoptionPriceRange } from '@/models/AdoptionPriceRange'

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
    console.log('%c🚀[res]-67:', 'color: #5f7d1d', res)
    return res
  }

  /**
   * 查询用户当前已领养的植物
   *
   * @return {*}
   * @memberof ContractService
   */
  async getUserAdoptedPlants() {
    const contract = await this.getPlantMarketContract()
    return contract.getUserAdoptedPlants(this.getSigner.address, false)
  }

  /**
   * 官方创建植物
   *
   * @return {*}
   * @memberof ContractService
   *
   */
  async createPlant(info: PlantDTO, type: any) {
    info.minEth = ethers.parseEther(String(info.minEth) as any)
    info.maxEth = ethers.parseEther(String(info.maxEth) as any)
    const aa = new PlantDTO('0', '0', 0, 0, 1, 0, 0)
    console.log('%c🚀[aa]-99:', 'color: #f930a8', aa)

    const temp = { ...info, plantType: Number(type) }
    console.log('%c🚀[temp]-99:', 'color: #310156', temp)

    const contract = await this.getPlantMarketContract()

    await contract.createPlant(temp)
  }

  /**
   * 领养植物
   *
   * @param {bigint} plantId
   * @return {*}
   * @memberof ContractService
   */
  async adoptPlant(plantId: bigint, fee: string) {
    console.log('%c🚀[fee]-117:', 'color: #866414', fee)
    const contract = await this.getPlantMarketContract()
    const res = await contract.adoptPlant(plantId, { value: fee })
    return handleTransaction(res)
  }

  /**
   *挂单
   *
   * @param {bigint} plantId
   * @return {*}
   * @memberof ContractService
   */
  async list(plantId: bigint) {
    const contract = await this.getPlantMarketContract()

    const res = await contract.list(plantId)
    return handleTransaction(res)
  }

  /**
   * 结算测试
   *
   * @return {*}
   * @memberof ContractService
   */
  // async autoSplitAndSettle() {
  //   console.log('%c🚀[this]-131:', 'color: #b3385c', this)
  //   const contract = await this.getPlantMarketContract()
  //   console.log('%c🚀[contract]-131:', 'color: #48220f', contract)

  //   const res = await contract.autoSplitAndSettle()
  //   console.log('%c🚀[autoSplitAndSettle]-117:', 'color: #6f6606', res)
  //   return handleTransaction(res)
  // }
}
