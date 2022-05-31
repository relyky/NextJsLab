import { useState } from 'react'
import { Container } from '@mui/material'
import { H3, AButton } from 'components/highorder'
import TreeContainer from './TreeContainer'

export default (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    function handleClick() {
        console.info('Pass');
    }

    return (
        <Container>
            <H3>DM2010: Decision Tree UI 畫面試作</H3>
            <pre>selectedIndex:{selectedIndex}</pre>
            <AButton label='測試' mutant='primary' onClick={handleClick} />

            <TreeContainer />
            {/* <TreeCustomLayer /> */}

        </Container>
    )
}
