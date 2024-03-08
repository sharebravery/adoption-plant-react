import { getLanguageLib } from '@/utils/getLanguageLib'

export default function Notice() {
  const { browserLanguage } = getLanguageLib()

  const richTextCN = `
    <div>
      <p>AiTree树DAPP产品为实验性去中心化互助养成小游戏，部署在BLAST主网；</p>
      <p>TREE代币限制总量10亿枚，公平获得，
      参与预约就可以获得TREE代币，具体预约一次获得数量在市场页面查看，
      如果市场没有对应树可抢时，预约只能获得1000个TREE，
      10亿枚产完预约将不会在获得TREE代币。</p>

      <p>领养规则为先抢先得，需要提前准备价值区间最高的ETH余额才可以领养，
      领养需要消耗TREE，具体消耗数量跟预约产出一致，领养成功才扣除。</p>
      <p>2024-3-10 8:00 开放预约挖TREE，
      2024-3-13 14:00 正式开始游戏，第一轮限量连续7天每天只投放一颗Seed（价值0.005ETH）到市场可领养。</p>
    </div>
  `
  const richTextEN = `
  <div>
    <p>AiTree DAPP product is an experimental decentralized mutual aid cultivation mini-game, deployed on the BLAST mainnet;</p>
    <p>The total supply of TREE tokens is 1 billion, fairly obtained,</p>
    <p>Participate in reservations to receive TREE tokens, the specific amount received per reservation can be viewed on the market page,</p>
    <p>If there are no corresponding trees available for grabs in the market, reservations will only receive 1000 TREE tokens,</p>
    <p>After the 1 billion tokens are produced, reservations will no longer receive TREE tokens.</p>

    <p>The adoption rule is first come, first served, requiring preparation of the highest value range of ETH balance in advance to adopt,</p>
    <p>Adoption requires consuming TREE tokens, and the specific consumption amount is consistent with the reservation output. Adoption will only be deducted upon success.</p>
    <p>Reservation mining for TREE will open at 8:00 on March 10, 2024,</p>
    <p>The game officially begins at 14:00 on March 13, 2024, with the first round limited to one Seed (valued at 0.005ETH) per day for 7 consecutive days, which can be adopted from the market.</p>
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
