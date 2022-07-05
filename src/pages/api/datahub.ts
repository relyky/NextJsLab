import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Request, Connection } from 'tedious'

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

/// NextApiHandler
export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { amount = 1 } = req.body

  // file.js
  const conn = new Connection(config);
  conn.connect(async (err: Error) => {
    if (err) {
      // 連接 SQL Server 失敗！
      res.json({ message: 'Connect SQL Server failed!', err })
      return;
    }

    // If no error, then good to go...
    await executeStatementAsync();
  });

  async function executeStatementAsync() {
    const request = new Request("select sn = 42, text = 'hello world'", (err, rowCount, rows) => {
      if (err) {
        // 執行 SQL 指令失敗！
        res.json({ message: 'Execute SQL statement failed!', err })
        return
      }

      // DONE:關閉連線
      conn.close()

      // 轉換執行結果: convert rows as dataList
      const dataList = rows.map(columns =>
        Object.fromEntries(columns.map(column => ([column.metadata.colName, column.value]))))

      // SUCCESS & response
      res.json({ message: 'Execute SQL statement success.', rowCount, dataList })
    });

    conn.execSql(request);
  }
}
