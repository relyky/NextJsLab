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
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
}

export const Card: FC<CardProps> = memo(({
  id,
  text,
  moveCard,
  findCard,
}) => {
  const originalIndex = findCard(id).index
  const [{ isDragging }, drag] = useDrag<DragItem, void, CardDragCollected>(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex, text },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveCard]
  )

  const [{ handlerId, isOver, canDrop }, drop] = useDrop<DragItem, void, CardDropCollected>(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id)
          moveCard(draggedId, overIndex)
        }
      },
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
    }),
    [findCard, moveCard]
  )

  const opacity = isDragging ? 0.5 : 1
  return (
    <div className={ss.card} ref={(node) => drag(drop(node))} style={{ opacity }}>
      <span>{handlerId}:{originalIndex}:{id}</span>
      {isDragging && <span>{'[isDragging]'}</span>}
      {canDrop && <span>{'[canDrop]'}</span>}
      {isOver && <span>{'[isOver]'}</span>}
      <br />
      {text}
    </div>
  )
})
