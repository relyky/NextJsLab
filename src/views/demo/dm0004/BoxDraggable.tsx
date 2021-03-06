import type { CSSProperties, FC } from 'react'
import { memo, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Box } from './Box'
import ItemTypes from './ItemTypes'

function getStyles(left: number, top: number, isDragging: boolean,): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

interface BoxDraggableProps {
  id: string
  title: string
  left: number
  top: number
}

export const BoxDraggable: FC<BoxDraggableProps> = memo((props) => {
  const { id, title, left, top } = props
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title],
  )

  useEffect(() => {
    // 效果：等同把預設 preview 移除，之後再用 BoxDragPreview 物件補上。
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="BoxDraggable"
    >
      <Box title={title} />
    </div>
  )
})
