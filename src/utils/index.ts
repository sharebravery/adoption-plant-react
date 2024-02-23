export function assignIfExist<T extends object, U extends object>(source: T, target: U & any): T {
  for (const key in source) {
    if (target[key] === undefined)
      continue
    source[key] = target[key]
  }
  return source
}

export function enum2Array<T>(enumData: T): { label: string | number, value: any }[] {
  const data: any[] = []
  const regPos = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/
  for (const key in enumData) {
    if (!regPos.test(key))
      data.push({ value: enumData[key], label: key })
  }
  return data
}
