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

    // // 官方制式 Dragging 表示法
    // return isDragging ? (
    //     <div className={styles.box} ref={dragPreview} style={{ opacity: 0.5 }}>
    //         Dragging: {title} X
    //     </div>
    // ) : (
    //     <div className={styles.box} ref={drag} style={{ opacity: 1 }}>
    //         Drag Source: {title} 
    //     </div>
    // )

    //## 一般來說不需要 dragPreview，可以簡化
    return (
        <div className={styles.box} ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            Drag Source: {title}
        </div>
    )
}
