import type { CSSProperties, FC } from 'react'
import { memo, useEffect, useState } from 'react'

import { Box } from './Box'

const styles: CSSProperties = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
}

export interface BoxDragPreviewProps {
  title: string
}

export const BoxDragPreview: FC<BoxDragPreviewProps> = memo((props) => {
  const [tickTock, setTickTock] = useState(false)

  useEffect(() => {
    // subscribe to interval tick tock.
    const interval = setInterval(() => setTickTock(!tickTock), 500)
    return () => clearInterval(interval)
  },
    [tickTock]
  )

  return (
    <div style={styles}>
      <Box title={props.title} yellow={tickTock} preview />
    </div>
  )
})
