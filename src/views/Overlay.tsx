import type { FC } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useAppSelector } from 'hooks/hooks'

const Overlay: FC = () => {
    const { blocking } = useAppSelector(store => store.metaData)
    return (
        <Backdrop
            sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={blocking}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Overlay
