import type { FC } from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useAppSelector } from 'hooks/hooks'
import { Container } from '@mui/material'
import { H3, AButton } from 'components/highorder'
import TreeContainer from './TreeContainer'
import Swal from 'sweetalert2'

export default (props) => {
    const decisionTree = useAppSelector(store => store.decisionTree2)
    //const dispatch = useAppDispatch()

    const [f_show, setShowFlag] = useState(false)

    function handleClick() {
        Swal.fire('未實作')
    }

    function handleShowData() {
        setShowFlag(f => !f)
    }

    return (
        <Container>
            <H3>DM2020: Decision Tree UI 試作II</H3>
            <pre>decisionTree 筆數:{decisionTree.length}</pre>
            <AButton label='驗證' mutant='primary' onClick={handleClick} />
            <AButton label='複製(sub tree)' mutant='primary' onClick={handleClick} />
            <AButton label='查看編輯資料' mutant='secondary0' onClick={handleShowData} />

            <TreeContainer />
            {/* <TreeCustomLayer /> */}

            {f_show &&
                <DisplayDialog
                    data={decisionTree}
                    onClose={() => setShowFlag(false)}
                />
            }
        </Container>
    )
}

//---------------------------
const DisplayDialog: FC<{
    data: any,
    onClose: () => void,
}> = props => (
    <Dialog open={true} onClose={() => props.onClose()}>
        <DialogTitle>查看資料</DialogTitle>
        <DialogContent>
            <pre>
                {JSON.stringify(props.data, null, '  ')}
            </pre>
        </DialogContent>
        <DialogActions>
            <AButton mutant="primary0" label="關閉" onClick={() => props.onClose()} />
        </DialogActions>
    </Dialog>
)
