import { FC, useEffect, useRef, useState } from 'react' 
import { FiPlusCircle } from 'react-icons/fi'


const MIN_DISTANCE = 150;

const AddBtn: FC = () => {
    
    const [hover, setHover] = useState<boolean>(false)
    const [pos, setPos] = useState<number[]>([0, 0])
    const ref = useRef(null)

    const onMouseMove = (event: any) => {
        const x = event.clientX - pos[0]
        const y = event.clientY - pos[1]
        const dist = Math.sqrt(x * x + y * y)

        if ( dist < MIN_DISTANCE )
            setHover(true)
        else
            setHover(false)
    }

    useEffect( () => {
        const { x, y, width, height } = (ref.current as any).getBoundingClientRect()
        setPos([x + width / 2, y + height / 2])

        document.addEventListener('mousemove', onMouseMove);
        return () => document.removeEventListener('mousemove', onMouseMove)
    }, [])

    const addColor = () => {
        console.log("add");
    }


    return (    
        <div ref={ref} className={`add-color-container ${hover ? 'add-color-container-hover' : ''}`}  onClick={addColor}>
            <FiPlusCircle/>
        </div>
    )
} 

export default AddBtn;