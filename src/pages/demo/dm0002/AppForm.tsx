import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styles from './AppForm.module.css'

export default (props: object) => {
  return (
    <div>
      <h1>DEMO-0002: React DnD Lab</h1>
      <div style={{ display: 'flex' }}>
        <Stuff title='Item A' />
        <Stuff title='Item B' />
        <Stuff title='Item C' />
      </div>

      <Bucket />
    </div>
  )
}

function Stuff({ title }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: 'BOX',
    item: { title },
    // Props to collect with monitor.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div className={styles.box} ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* This is optional. The dragPreview will be attached to the dragSource by default */}
      {/* The drag ref marks this node as being the "pick-up" node */}
      <div role="Handle" ref={drag} style={{ width: 160, height: 90, verticalAlign: 'middle' }}>
        Drag Source:{title}
      </div>
    </div>
  )
}

function Bucket() {
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

  return (
    <div
      className={styles.bucket}
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? 'red' : 'lightgrey' }}
    >
      <div>
        {canDrop ? 'Release to drop' : 'Drag a box here'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {itemList.map((c, idx) =>
          <Stuff key={idx} title={c.title} />
        )}
      </div>
    </div>
  )
}
