import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import ItemTypes from './ItemTypes'
import styles from './Card.module.css'

export interface CardProps {
    id: any
    text: string
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

interface DropCollectedProps {
    handlerId: Identifier | null
    isOver: boolean
    canDrop: boolean
}

export const Card: FC<CardProps> = ({ id, text, index, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [{ handlerId, isOver, canDrop }, drop] = useDrop<
        DragItem,
        void,
        DropCollectedProps
    >({
        accept: ItemTypes.CARD,
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                //console.log('useDrop', 'nil');
                return;
            }

            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                //console.log('useDrop', 'none', { dragIndex, hoverIndex });
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                //console.log('useDrop', '↓', { dragIndex, hoverIndex });
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                //console.log('useDrop', '↑', { dragIndex, hoverIndex });
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref)) //※ 尚不懂含義為何。

    return (
        <div className={styles.card} ref={ref} style={{ opacity: isDragging ? .5 : 1 }} data-handler-id={handlerId}>
            <span>{handlerId}</span>
            {isDragging && <span>{'[isDragging]'}</span>}
            {canDrop && <span>{'[canDrop]'}</span>}
            {isOver && <span>{'[isOver]'}</span>}
            <br/>
            {text}
        </div>
    )
}
