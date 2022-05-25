import Stuff from './Stuff'
import Bucket from './Bucket'

export default (props: object) => {
  return (
    <div>
      <h1>DEMO-0002: React DnD Lab</h1>
      <div style={{ display: 'flex' }}>
        {/* Drag Source */}
        <Stuff title='Item A' />
        <Stuff title='Item B' />
        <Stuff title='Item C' />
      </div>

      {/* Drop Target */}
      <Bucket />
    </div>
  )
}
