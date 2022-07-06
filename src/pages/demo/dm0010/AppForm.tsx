import type { Commodity } from './interfaces'
import { useState } from 'react'
import { qryCommodityList } from './bizLogic'

export default (props: {
    commodityList: Commodity[] // 初始商品目錄將從 props 送進來。
}) => {
    // 初始商品目錄來自SSR模式。
    const [commodityList, setCommodityList] = useState<Commodity[]>(props.commodityList)

    // 之後操作查詢商品目錄來自CSR模式。
    function handleQuery() {
        const commodityList = qryCommodityList('other')
        setCommodityList(commodityList)
    }

    return (
        <div>
            <h1>DM0010: SSR 練習</h1>
            <button onClick={handleQuery}>查詢</button>
            <h2>模擬商品清單</h2>
            <ul>
                {Array.isArray(commodityList) && commodityList.map((item, index) => (
                    <li key={index}>
                        {`${item.cid}-${item.cname} 數量 ${item.amount} | ${item.category}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}
