import Stuff from './Stuff'
import Bucket from './Bucket'

export default (props: object) => {
  return (
    <div>
      <h1>DEMO-0002: React DnD Lab</h1>
      <p>參考：<a href='https://www.youtube.com/watch?v=4bzJrEETW4w&ab_channel=PedroTech' target="_blank" rel="noreferrer">React Drag And Drop Tutorial - React-DND Made Simple</a></p>
      <div style={{ display: 'flex' }}>
        {/* Drag Source */}
        <Stuff title='Item A' />
        <Stuff title='Item B' />
        <Stuff title='Item C' />
      </div>

      <br/>

      {/* Drop Target */}
      <Bucket />
    </div>
  )
}
