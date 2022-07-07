import type { CSSProperties, FC } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDragLayer } from 'react-dnd'

import { CardPreview } from './CardPreview'
import ItemTypes from './ItemTypes'

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  //background: 'pink',
  //opacity: .5
}

/// 計算移動位移
function calcItemMovingStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export const CustomDragLayer: FC = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    }))

  function renderItem() {
    switch (itemType) {
      case ItemTypes.CARD:
        return <CardPreview {...item} />
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }

  return (
    <div style={layerStyles}>
      <div style={calcItemMovingStyles(initialOffset, currentOffset)} >
        {renderItem()}
      </div>
    </div>
  )
}
