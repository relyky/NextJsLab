import type { CSSProperties, FC } from 'react'
import { memo, useEffect, useState } from 'react'

const styles: CSSProperties = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
  border: 'dashed 2px red'
}

//export interface CardPreviewProps {
//  title: string
//}

export const CardPreview: FC<{ 
  title: string 
}> = memo((props) => {
  const [tickTock, setTickTock] = useState(false)

  useEffect(() => {
    // subscribe to interval tick tock.
    const interval = setInterval(() => setTickTock(!tickTock), 500)
    return () => clearInterval(interval)
  },
    [tickTock]
  )

  return (
    <div style={{ ...styles, backgroundColor: tickTock ? 'yellow' : 'lightgrey' }}>
      <span>Preivew: {props.title}</span>
    </div>
  )
})
