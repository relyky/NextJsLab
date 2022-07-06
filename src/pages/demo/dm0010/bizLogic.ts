import type { Commodity } from './interfaces'

/// 模擬自主機取值
export function qryCommodityList(): Commodity[] {
  return [
    { cid: 'C01', cname: '商品1號', amount: 17 },
    { cid: 'C02', cname: '商品2號', amount: 21 },
    { cid: 'C03', cname: '商品3號', amount: 390 },
    { cid: 'C04', cname: '商品4號', amount: 434 },
    { cid: 'C05', cname: '商品5號', amount: 5 },
    { cid: 'C06', cname: '商品6號', amount: 6 },
    { cid: 'C07', cname: '商品7號', amount: 7 },
    { cid: 'C08', cname: '商品8號', amount: 87 },
    { cid: 'C09', cname: '商品9號', amount: 93 },
    { cid: 'C10', cname: '商品10號', amount: 102 },
  ]
}
