import { responsiveProperty } from '@mui/material/styles/cssUtils';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { SecUnit } from './interfaces'

export default function (req: NextApiRequest, res: NextApiResponse) {
    // 解析 request 封包
    const { method, query: { action } } = req

    // method 只支援 POST。
    if (method !== 'POST') {
        res.status(404).end(`Your Princess Is In Another Castle!`);
        return
    }

    // 取得 相應的 Action Handler
    const actionHandler = actions[action as string];

    // 若不存在相應的 Action Handler
    if (!actionHandler) {
        res.status(404).end(`Your Princess Is In Another Castle!`)
        return
    }

    // invoke action
    actionHandler(req, res)
}

const actions = {
    qryDataList: async (req: NextApiRequest, resp: NextApiResponse) => {
        const { simsFail } = req.body
        //const { action } = req.query

        // simulate IO latency
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // 模擬失敗
        if (simsFail) {
            resp.statusCode = 299
            resp.json({ errMsg: '模擬查詢失敗訊息！' })
            return
        }

        // 模擬成功
        const dataList: SecUnit[] = []
        dataList.push({ unitId: 'ADM', unitName: '模擬系統管理部' })
        dataList.push({ unitId: 'OWP', unitName: '離岸風電業者' })
        resp.json(dataList)
    },
    getFormData: (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '取得表單資料', action, formNo })
    },
    updFormData: (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '更新表單資料', action, formNo })
    },
    delFormData: (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '刪除表單資料', action, formNo })
    },
    addFormData: (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '新增表單資料', action, formNo })
    },
}
