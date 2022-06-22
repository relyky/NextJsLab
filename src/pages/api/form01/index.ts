
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export default function (req: NextApiRequest, res: NextApiResponse<any>) {
    const { query, body } = req
    //res.json({ query, body })
    res.status(404).end(`Your Princess Is In Another Castle!`)
    return
}