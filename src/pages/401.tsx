import type { NextPage } from 'next'
import Head from 'next/head'
import { Typography, Container, colors } from '@mui/material'

const Unauthorized: NextPage = () => (
    <>
        <Head>
            <title>401</title>
        </Head>
        <Container>
            <Typography variant='h2' color='error'>401 Unauthorized!</Typography>
        </Container>
    </>
)

export default Unauthorized
