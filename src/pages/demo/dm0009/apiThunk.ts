import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import swal from 'sweetalert2'
import * as act from './dm0009Slice'
//import { blockUi, unblockUi } from 'metaDataSlice'

// 進階應用：Thunk: logical layer
export const qryDataList = createAsyncThunk(
    'dm0009API/qryDataList',
    async (arg: { simsFail: boolean }, thunkAPI) => {
        //thunkAPI.dispatch(blockUI())
        try {
            const resp = await fetch('/api/form09/qryDataList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
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
            const dataList = await resp.json()
            thunkAPI.dispatch(act.updDataList(dataList))
        }
        catch (err) {
            swal.fire('出現錯誤', err.message, 'error')
        }
        finally {
            //thunkAPI.dispatch(unblockUI())
        }
    }
)

// // 進階應用：Thunk
// export const qryDataList = createAsyncThunk(
//     'dm0009API/qryDataList',
//     async (args:object, thunkAPI) => {
//         await postData('/api/form09/qryDataList', args, dataList => 
//             thunkAPI.dispatch(api.updDataList(dataLisg))
//         );        
//     }
// )
