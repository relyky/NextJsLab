import { useState } from 'react'
import { useDrop } from 'react-dnd'
import Stuff from './Stuff'
import styles from './Bucket.module.css'

export default (props) => {
  const [itemList, setItemList] = useState([])

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    drop: (item) => addBoxToBucket(item),
    // Props to collect with monitor.
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  function addBoxToBucket(item) {
    console.info('addBoxToBucket', item)
    setItemList(itemList => [...itemList, item])
  }

  console.log('Bucket',{ canDrop, isOver })
  return (
    <div
      className={styles.bucket}
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? 'red' : 'lightgrey' }}
    >
      <div>
        {canDrop ? 'Release to drop' : 'Drag a box here'}
        {canDrop && <span>{`[canDrop]`}</span>}
        {isOver && <span>{`[isOver]`}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {itemList.map((c, idx) =>
          <Stuff key={idx} title={c.title} />
        )}
      </div>
    </div>
  )
}
