import type { FC } from 'react'
import { useState } from 'react'
import { useAppSelector } from 'hooks/hooks'
import { Container, Paper } from '@mui/material'
import { H3, H4, AButton } from 'components/highorder'
import Swal from 'sweetalert2'

import { html } from "diff2html"
import { createTwoFilesPatch } from 'diff'
import htmlParse from 'html-react-parser'

// CSS
import "diff2html/bundles/css/diff2html.min.css";

const text1 = `開始
當 Staff = Y, 是否為DBS員工
　　值為 A,
當 Small_White = N, 信用小白(沒有JCIC紀錄申請)
　　值為 B,
當 職稱 in '16','29','36','34', Customer Segment
　　當 客戶層級 = VIP, Customer Segment
　　　值為 Z,
　　否則
　　　　值為 GUEST, 來賓層級
否則
　　值為 Otherwise, 其他
`

const text2 = `開始
當 Staff = Y, 是否為DBS員工
　　值為 A,
當 Small_White = X, 信用大白(有JCIC紀錄申請)
　　值為 C,
當 職稱 in '16','29','36','34', Customer Segment
　　當 客戶層級 = VIP, Customer Segment
　　　值為 Z,
　　否則
　　　　值為 GUEST, 來賓層級
否則
　　值為 Otherwise, 其他
`

export default (props) => {
    //const decisionTree = useAppSelector(store => store.decisionTree)
    //const dispatch = useAppDispatch()

    // generate unified diff patchcreateTwoFilesPatch
    const diff = createTwoFilesPatch("資料版本１", "資料版本２", text1, text2, "old header", "new header");

    let outputHtml = html(diff, {
        matching: "lines",
        outputFormat: "side-by-side"
    });

    return (
        <Container>
            <H3>DM2010: Decision Tree UI 試作(reset)</H3>

            <H4>原始 unified diff patch</H4>
            <Paper sx={{ p: 2 }}>
                <pre style={{ textAlign: "left" }}>{diff}</pre>
            </Paper>

            <H4>unified diff patch 2 HTML</H4>

            <Paper sx={{ p: 2 }}>
                {htmlParse(outputHtml)}
            </Paper>

        </Container>
    )
}
