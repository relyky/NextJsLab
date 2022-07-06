import { useEffect, useState } from 'react'
import type { Commodity } from './interfaces'
import { qryCommodityList } from './bizLogic'

export default (props: {
    commodityList: Commodity[]
}) => {
    return (
        <div>
            <h1>DM0010: SSR 練習</h1>
            <h2>模擬商品清單</h2>
            <ul>
                {Array.isArray(props.commodityList) && props.commodityList.map((item, index) => (
                    <li key={index}>
                        {`${item.cid}-${item.cname} 數量 ${item.amount}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}
