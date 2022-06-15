import type { FC } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useAppSelector } from 'hooks/hooks'
import { Container, Paper, Stack, Box, Collapse } from '@mui/material'
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, FormGroup, Checkbox, InputLabel, Input } from '@mui/material'
import { H3, H4, H5, H6, P1, P2, AButton, ASwitch } from 'components/highorder'
import Swal from 'sweetalert2'

// diff & diff2html
import type { PatchOptions } from 'diff'
import type { Diff2HtmlConfig } from "diff2html"
import type { LineMatchingType, OutputFormatType } from 'diff2html/lib/types'
import { createTwoFilesPatch, diffTrimmedLines, diffLines } from 'diff'
import { html, parse } from "diff2html"
import htmlRenderer from 'html-react-parser'

// CSS
import "diff2html/bundles/css/diff2html.min.css";

const filename = '決策樹D1'
const oldVersion = 'version 1'
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
const newVersion = 'version 2'
const newStr = `開始
當 Small_White = X, 信用小白(有JCIC紀錄申請)
　　值為 C,
當 職稱 in '16','29','36','34', Customer Segment
　　當 客戶層級 = VIP, Customer Segment
　　　　值為 Z,
　　否則
　　　　值為 GUEST, 來賓層級
當 Big_Black = PQ, 信用大黑(士紳土豪)
　　值為 V, 賺翻了
否則
　　值為 Otherwise, 其他
`

export default function AppForm(props) {
    const [f_originalDiff, setOriginalDiff] = useState(false)

    // diff options 參數

    // diff2html 參數
    const [htmlOption, setHtmlOption] = useState<Diff2HtmlConfig>({
        matching: "none", // 'lines' | 'words' | 'none', default:'none'
        drawFileList: false,
        outputFormat: "line-by-line" // 'line-by-line' | 'side-by-side', default:'line-by-line'
    })

    // generate unified diff patch
    const options: PatchOptions = {
        context: 2500, // 顯示關聯行數 default:4
        ignoreWhitespace: false, //
        newlineIsToken: false,
    }

    const unifiedDiffPatch = createTwoFilesPatch(filename, filename, oldStr, newStr, oldVersion, newVersion, options);

    const outputHtml = useMemo(() => html(unifiedDiffPatch, htmlOption),
        [unifiedDiffPatch, htmlOption]
    );

    return (
        <Container>
            <H3>DM0006: jsdiff lab</H3>
            <P1>參考：<a href="https://codesandbox.io/s/pbk84?file=/src/App.js:1715-1727">jsdiff+diff2html (forked)</a></P1>

            <H4>原始資料</H4>
            <Stack direction="row" spacing={1}>
                <Paper sx={{ flexGrow: 1, p: 1 }} >
                    <H6>{filename}<small>{oldVersion}</small></H6>
                    <pre style={{ textAlign: "left" }}>{oldStr}</pre>
                </Paper>
                <Paper sx={{ flexGrow: 1, p: 1 }} >
                    <H6>{filename}<small>{newVersion}</small></H6>
                    <pre style={{ textAlign: "left" }}>{newStr}</pre>
                </Paper>
            </Stack>

            {/* 設定參數 */}
            <Box>
                <ASwitch label='顯示原始 unified diff patch' value={f_originalDiff} onChange={v => setOriginalDiff(v.value)} />
                <br />

                <HtmlOpitonPanel option={htmlOption} onChange={setHtmlOption} />
                
            </Box>

            <Collapse in={f_originalDiff}>
                <H4>原始 unified diff patch</H4>
                <Paper sx={{ p: 2 }}>
                    <pre style={{ textAlign: "left" }}>{unifiedDiffPatch}</pre>
                </Paper>
            </Collapse>

            <H4>轉換 unified diff patch 成 HTML</H4>
            {htmlRenderer(outputHtml)}

        </Container >
    )
}

//-------------------------------
//  [htmlOption, setHtmlOption] = useState<Diff2HtmlConfig>
const HtmlOpitonPanel: FC<{
    option: Diff2HtmlConfig,
    onChange: (option: Diff2HtmlConfig) => void
}> = props => {
    const { option } = props
    //function HtmlOpitonPanel(option: Diff2HtmlConfig, onChange: (option: Diff2HtmlConfig) => void) {
    return (
        <Box>
            <FormControl variant='filled'>
                <FormLabel>outputFormat</FormLabel>
                <RadioGroup row
                    name="outputFormat"
                    value={option.outputFormat}
                    onChange={(e, v: OutputFormatType) => props.onChange({ ...option, outputFormat: v })}
                >
                    <FormControlLabel value="line-by-line" control={<Radio />} label="line-by-line" />
                    <FormControlLabel value="side-by-side" control={<Radio />} label="side-by-side" />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>matching</FormLabel>
                <RadioGroup row
                    name="matching"
                    value={option.matching}
                    onChange={(e, v: LineMatchingType) => props.onChange({ ...option, matching: v })}
                >
                    <FormControlLabel value="none" control={<Radio />} label="none" />
                    <FormControlLabel value="lines" control={<Radio />} label="lines" />
                    <FormControlLabel value="words" control={<Radio />} label="words" />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>drawFileList</FormLabel>
                <FormGroup>
                    <FormControlLabel label="drawFileList" control={
                        <Checkbox value={option.drawFileList} onChange={(e, v) => props.onChange({ ...option, drawFileList: v })} />
                    } />
                </FormGroup>
            </FormControl>
        </Box>

    )
}