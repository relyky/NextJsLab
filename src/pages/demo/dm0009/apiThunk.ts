import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import swal from 'sweetalert2'
import * as act from './dm0009Slice'
import { blockUi, unblockUi } from 'store/metaDataSlice'

// API Thunk
export const qryDataList = createAsyncThunk(
    'dm0009API/qryDataList',
    async (arg: object, thunkAPI) => {
        thunkAPI.dispatch(blockUi())
        try {
            const dataList = await postData('/api/form09/qryDataList', arg)
            thunkAPI.dispatch(act.updDataList(dataList))
        }
        catch (err) {
            swal.fire('出現錯誤', err.message, 'error')
        }
        finally {
            thunkAPI.dispatch(unblockUi())
        }
    }
)

///----------------------------------------------------------------------------
/// 在此加入通用的參數
async function postData(url: string, args: object): Promise<any> {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
    })

    if (resp.status === 299) {
        const { errMsg } = await resp.json()
        throw new Error(errMsg)
    }

    if (resp.status !== 200) {
        const { status, statusText } = resp
        throw new Error(`${status} ${statusText}`)
    }

    // success
    const result = await resp.json()
    return result
}
