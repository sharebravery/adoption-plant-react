import dayjs from 'dayjs'

// 将天数转换为秒数时间戳
export function daysToTimestamp(days: number) {
  const timestamp = dayjs().add(days, 'day').unix() // 将当前日期加上指定天数，然后获取对应的秒数时间戳
  return timestamp
}
