import { useDrag } from 'react-dnd'
import styles from './Stuff.module.css'

export default ({ title }) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'BOX',
        item: { title },
        // Props to collect with monitor.
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <div className={styles.box} ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {/* This is optional. The dragPreview will be attached to the dragSource by default */}
            {/* The drag ref marks this node as being the "pick-up" node */}
            <div role="Handle" ref={drag} style={{ width: 160, height: 90, verticalAlign: 'middle' }}>
                Drag Source:{title}
            </div>
        </div>
    )
}
