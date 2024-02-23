/**
 *合约地址
 *
 * @param {*} address
 * @return {*}
 */
export function isContractAddress(address: string) {
  // 匹配以0x开头，长度为40的十六进制字符串
  const regex = /^0x[0-9a-fA-F]{40}$/
  return regex.test(address)
}

/**
 *是否是推特号
 *
 * @param {string} handle
 * @return {*}
 */
export function isTwitterHandle(handle: string) {
  // 匹配以@开头，后面跟着字母、数字和下划线的字符串，长度为1到15个字符
  const regex = /^@[a-zA-Z0-9_]{1,15}$/
  return regex.test(handle)
}
