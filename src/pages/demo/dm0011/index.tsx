import Head from 'next/head'
import AppForm from 'views/demo/dm0011/AppForm'

export default function(props) {
  return (
    <>
      <Head>
        <title>DM0011</title>
      </Head>
      <AppForm {...props} />
    </>
  )
}
