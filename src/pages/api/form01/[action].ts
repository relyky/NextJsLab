import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export default function (req: NextApiRequest, res: NextApiResponse) {
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
