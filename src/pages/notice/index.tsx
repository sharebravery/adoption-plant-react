import { getLanguageLib } from '@/utils/getLanguageLib'

export default function Notice() {
  const { browserLanguage } = getLanguageLib()

  const richTextCN = `
    <div>
      <p>AiTree树DAPP产品为实验性去中心化互助养成小游戏，部署在BLAST主网；</p>
      <p>游戏目的：</p>
      <p>1、BLAST主网交互并获得BLAST空投；</p>
      <p>2、领养固定收益，抢到赚到；</p>
      <p>3、免费预约获取TREE代币。</p>

      <p>TREE代币限制总量10亿枚，公平获得，
参与预约就可以获得TREE代币，具体预约一次获得数量在市场页面查看，
如果市场没有对应树可抢时，预约只能获得1000个TREE，预约次数不限，
10亿枚产完预约将不会在获得TREE代币。</p>

      <p>领养规则为先抢先得，需要提前准备价值区间最高的ETH余额才可以领养，
      领养需要消耗TREE，具体消耗数量跟预约产出一致，领养成功才扣除，
      领养成功后在收益天数到期前12小时可以进行挂单放到市场。
      </p>
      
      <p>2024-3-12 8:00 开放预约挖TREE，14:00 正式开始抢领养游戏，</p>
      连续7天每天只投放一颗Seed（价值0.005 ETH）到市场可领养，先抢先得。。
      </p>

      <p>
      AiTree 团队 
      </p>

      <p>
      反馈邮箱：aitreeshop@outlook.com
      </p>
    </div>
  `
  const richTextEN = `
  <div>
      <p>AiTree DAPP product is an experimental decentralized mutual aid cultivation mini-game, deployed on the BLAST mainnet;</p>
      <p> Game Objectives:</p>
      
      <p>1. Interact with the BLAST mainnet and receive BLAST airdrops;</p>
      <p>2. Adopt fixed income, seize the opportunity to earn;</p>
      <p>3. Reserve TREE tokens for free.</p>

      <p>The total limit of TREE tokens is 1 billion, obtained fairly,
Participate in the reservation to receive TREE tokens, the specific quantity obtained by reserving once can be viewed on the market page,
If there is no corresponding tree available for adoption in the market, the reservation can only get 1000 TREE tokens, and there is no limit on the number of reservations.
When the total supply of 1 billion tokens is exhausted, no more TREE tokens will be obtained through reservations.</p>

      <p>The adoption rule is first come, first served, and you need to prepare the highest value range of ETH balance in advance to adopt.
      Adoption requires consuming TREE tokens, the specific consumption quantity is consistent with the reservation output, and it will only be deducted after successful adoption.
      After successful adoption, you can list it on the market for sale 12 hours before the end of the profit days.
      </p>
      
      <p>On March 12, 2024, at 8:00 AM, reservation for TREE mining will open. At 2:00 PM, the official adoption game will start,</p>
      <p>For seven consecutive days, only one Seed (valued at 0.005 ETH) will be released to the market for adoption each day, on a first-come, first-served basis.</p>

      <p>
      AiTree Team
      </p>

      <p>
      Feedback email: aitreeshop@outlook.com
      </p>
    </div>

`

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full text-left lg:w-1/2 md:w-3/4 xl:w-2/3">
        {
          browserLanguage === 'zh-CN'
            ? <div dangerouslySetInnerHTML={{ __html: richTextCN }} />
            : <div dangerouslySetInnerHTML={{ __html: richTextEN }} />

        }
      </div>
    </div>
  )
}
