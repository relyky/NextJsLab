import type { FC } from 'react'
import type { Identifier } from 'dnd-core'
import type { DragItem } from './interface'
import { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import ss from './Card.module.css'
import ItemTypes from './ItemTypes'

interface CardDragCollected {
  isDragging: boolean
}

interface CardDropCollected {
  handlerId: Identifier | null
  isOver: boolean
  canDrop: boolean
}

interface CardProps {
  id: string
  text: string
  moveCard: (id: string, to: number, from: number, by: string) => void
  findCard: (id: string) => { index: number }
}

export const Card: FC<CardProps> = memo(props => {
  const originalIndex = props.findCard(props.id).index

  const [{ isDragging }, drag] = useDrag<DragItem, void, CardDragCollected>(
    () => ({
      type: ItemTypes.CARD,
      item: { id: props.id, originalIndex, text: props.text },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          props.moveCard(droppedId, originalIndex, originalIndex, 'end')
        }
      },
    }),
    [props.id, originalIndex, props.moveCard]
  )

  const [{ handlerId, isOver, canDrop }, drop] = useDrop<DragItem, void, CardDropCollected>(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId, originalIndex: fromIndex }) {
        if (draggedId !== props.id) {
          const { index: overIndex } = props.findCard(props.id)
          props.moveCard(draggedId, overIndex, fromIndex, 'hover')
        }
      },
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
    }),
    [props.findCard, props.moveCard]
  )

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={ss.card}
      style={{ opacity: isDragging ? .5 : 1 }}
    >
      <span>{handlerId}:{originalIndex}:{props.id}</span>
      {isDragging && <span>{'[isDragging]'}</span>}
      {canDrop && <span>{'[canDrop]'}</span>}
      {isOver && <span>{'[isOver]'}</span>}
      <br />
      {props.text}
    </div>
  )
})
