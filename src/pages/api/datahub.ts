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
  const connection = new Connection(config);
  connection.connect((err: Error) => {
    if (err) {
      res.json({ message: 'Connect SQL Server failed!', err })
      //throw err;
    }

    // If no error, then good to go...
    executeStatement();
  });

  function executeStatement() {
    const request = new Request("select sn = 42, text = 'hello world'", (err, rowCount, rows) => {
      if (err) {
        res.json({ message: 'Execute SQL statement failed!', err })
        //throw err;
      }

      // DONE
      connection.close()

      // convert rows as dataList
      const dataList = rows.map(columns =>
        Object.fromEntries(columns.map(column => ([column.metadata.colName, column.value]))))

      // SUCCESS & response
      res.json({ message: 'Execute SQL statement success.', rowCount, dataList })
    });

    connection.execSql(request);
  }
}
