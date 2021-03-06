import Head from 'next/head'
import AppForm from 'views/demo/dm0001/AppForm'

export default function(props) {
  return (
    <>
      <Head>
        <title>DM0001</title>
      </Head>
      <AppForm {...props} />
    </>
  )
}
