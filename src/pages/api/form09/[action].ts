import { responsiveProperty } from '@mui/material/styles/cssUtils';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Request, Connection } from 'tedious'
import type { SecUnit } from './interfaces'

const config = {
  "server": "192.168.0.71",
  "authentication": {
    "type": "default",
    "options": {
      "userName": "sa",
      "password": "1qaz@WSX"
    }
  },
  "options": {
    "port": 1433,
    "database": "BOEOWDB",
    "trustServerCertificate": true,
    "rowCollectionOnRequestCompletion": true,
  }
}


export default async function (req: NextApiRequest, res: NextApiResponse) {
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
    await actionHandler(req, res)
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

        // 連線
        const conn = new Connection(config);
        conn.connect(async (err: Error) => {
          if (err) {
            // 連接 SQL Server 失敗！
            resp.statusCode = 299
            resp.json({ errMsg: 'Connect SQL Server failed!', err })
            return;
          }
      
          // If no error, then good to go...
          await executeStatementAsync();
        });

        async function executeStatementAsync() {
            const sql = "SELECT unitId, unitName FROM SecUnit ";
            const request = new Request(sql, (err, rowCount, rows) => {
              if (err) {
                // 執行 SQL 指令失敗！
                resp.statusCode = 299
                resp.json({ errMsg: 'Execute SQL statement failed!', err })
                return
              }
        
              // DONE:關閉連線
              conn.close()
        
              // 轉換執行結果: convert rows as dataList
              const dataList = rows.map(columns =>
                Object.fromEntries(columns.map(column => ([column.metadata.colName, column.value]))))
        
              // SUCCESS & response
              resp.json(dataList)
            });
        
            conn.execSql(request);
          }

        // // 模擬成功
        // const dataList: SecUnit[] = []
        // dataList.push({ unitId: 'ADM', unitName: '模擬系統管理部' })
        // dataList.push({ unitId: 'OWP', unitName: '離岸風電業者' })
        // resp.json(dataList)
    },
    getFormData: async (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '取得表單資料', action, formNo })
    },
    updFormData: async (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '更新表單資料', action, formNo })
    },
    delFormData: async (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '刪除表單資料', action, formNo })
    },
    addFormData: async (req: NextApiRequest, res: NextApiResponse) => {
        const { formNo } = req.body
        const { action } = req.query
        res.json({ message: '新增表單資料', action, formNo })
    },
}
