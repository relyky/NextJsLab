import type { FC } from 'react'
import type { DragItem } from './interface'
import { memo, useEffect, useState } from 'react'
import clsx from 'clsx'
import ss from './Card.module.css'

/// Dragging Card, 拖拉中的 Card 元件
export const CardPreview: FC<DragItem> = memo((props) => {
  const [tickTock, setTickTock] = useState(true)

  useEffect(() => {
    // subscribe to interval tick tock.
    const interval = setInterval(() => setTickTock(!tickTock), 500)
    return () => clearInterval(interval)
  },
    [tickTock]
  )

  return (
    <div
      className={clsx(ss.card, ss.preview)}
      style={{ backgroundColor: tickTock ? 'yellow' : 'lightgrey' }}
    >
      <span>Preivew:{props.originalIndex}:{props.id}</span>
      <br />
      {props.text}
    </div>
  )
})
