import type { NextPage } from 'next'
import Head from 'next/head'
import { Typography, Container, colors } from '@mui/material'

const PageNotFound: NextPage = () => (
    <>
        <Head>
            <title>404</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
            <Typography variant='h2' color='error'>404 Your Princess Is In Another Castle!</Typography>
        </Container>
    </>
)

export default PageNotFound
