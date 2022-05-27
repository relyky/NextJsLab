import type { CSSProperties, FC } from 'react'
import type { DragItem } from './interface'
import { memo, useEffect, useState } from 'react'
import clsx from './Card.module.css'

const styles: CSSProperties = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
  border: 'dashed 2px red',
  opacity: .7,
  width: 400,
}

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
    <div className={clsx.card} style={{ ...styles, backgroundColor: tickTock ? 'yellow' : 'lightgrey' }} >
      <span>Preivew:{props.index}:{props.id}</span>
      <br />
      {props.text}
    </div>
  )
})
