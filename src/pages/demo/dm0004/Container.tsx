import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { BoxDraggable } from './BoxDraggable'
import type { DragItem } from './interfaces'
import ItemTypes from './ItemTypes'
import { snapToGrid as doSnapToGrid } from './snapToGrid'

const styles: CSSProperties = {
  width: 600,
  height: 400,
  border: '1px solid black',
  position: 'relative',
}

export interface ContainerProps {
  snapToGrid: boolean
}

interface DropCollectedProps {
  isOver: boolean
  canDrop: boolean
}

interface BoxMap {
  [key: string]: { top: number; left: number; title: string }
}

export const Container: FC<ContainerProps> = (props) => {
  const [boxes, setBoxes] = useState<BoxMap>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  })

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, DropCollectedProps>(() => ({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number
        y: number
      }

      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      if (props.snapToGrid) {
        [left, top] = doSnapToGrid(left, top)
      }

      moveBox(item.id, left, top)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }),
    [moveBox]
  )

  return (
    <div ref={drop} style={styles}>
      {isOver && <span style={{ float: 'right' }}>{'[isOver]'}</span>}
      {canDrop && <span style={{ float: 'right' }}>{'[canDrop]'}</span>}
      
      {Object.keys(boxes).map((key) => (
        <BoxDraggable
          key={key}
          id={key}
          {...(boxes[key] as { top: number; left: number; title: string })}
        />
      ))}
    </div>
  )
}
