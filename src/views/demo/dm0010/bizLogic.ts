import type { Commodity } from './interfaces'
import db from './db.json'

/// 模擬自主機取值
export function qryCommodityList(category: string): Commodity[] {
  return db.commodityList.filter(c => !category || c.category === category)
}
