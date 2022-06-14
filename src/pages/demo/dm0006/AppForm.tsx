import type { FC } from 'react'
import { useState } from 'react'
import { useAppSelector } from 'hooks/hooks'
import { Container, Paper, Stack, Box } from '@mui/material'
import { H3, H4, H5, H6, P1, P2, AButton } from 'components/highorder'
import Swal from 'sweetalert2'

import { html } from "diff2html"
import { createTwoFilesPatch } from 'diff'
import htmlRenderer from 'html-react-parser'

// CSS
import "diff2html/bundles/css/diff2html.min.css";

const oldStr = `開始
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

const newStr = `開始
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

export default function AppForm(props) {

    // generate unified diff patchcreateTwoFilesPatch
    const diff = createTwoFilesPatch("資料版本１", "資料版本２", oldStr, newStr);

    let outputHtml = html(diff, {
        matching: "lines",
        drawFileList: false,
        outputFormat: "side-by-side"
    });

    return (
        <Container>
            <H3>DM0006: jsdiff lab</H3>
            <P1>參考：<a href="https://codesandbox.io/s/pbk84?file=/src/App.js:1715-1727">jsdiff+diff2html (forked)</a></P1>

            <H4>原始資料</H4>
            <Stack direction="row" spacing={1}>
                <Paper sx={{ flexGrow: 1, p: 1 }} >
                    <H6 text="資料版本１" />
                    <pre style={{ textAlign: "left" }}>{oldStr}</pre>
                </Paper>
                <Paper sx={{ flexGrow: 1, p: 1 }} >
                    <H6 text="資料版本２" />
                    <pre style={{ textAlign: "left" }}>{newStr}</pre>
                </Paper>
            </Stack>

            <H4>原始 unified diff patch</H4>
            <Paper sx={{ p: 2 }}>
                <pre style={{ textAlign: "left" }}>{diff}</pre>
            </Paper>

            <H4>unified diff patch 2 HTML</H4>
            {htmlRenderer(outputHtml)}

        </Container>
    )
}
