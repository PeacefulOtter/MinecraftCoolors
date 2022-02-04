import { FC, useEffect, useRef, useState } from 'react' 
import { FiPlusCircle } from 'react-icons/fi'


const MIN_DISTANCE = 150;

type Props = {
    textureHeight: number;
    addColor: () => void;
}

const AddBtn: FC<Props> = ( { textureHeight, addColor } ) => {
    
    const [hover, setHover] = useState<boolean>(false)
    const [posX, setPosX] = useState<number>(0)
    const ref = useRef(null)

    const onMouseMove = (event: any) => {
        const x = event.clientX - posX
        const y = event.clientY - textureHeight
        const dist = Math.sqrt(x * x + y * y)

        if ( dist < MIN_DISTANCE )
            setHover(true)
        else
            setHover(false)
    }

    useEffect( () => {
        const { x, width } = (ref.current as any).getBoundingClientRect()
        const posX = x + (width / 2)
        setPosX(posX)

        document.addEventListener('mousemove', onMouseMove);
        return () => document.removeEventListener('mousemove', onMouseMove)
    }, [ref.current, textureHeight])

    return (    
        <div 
            ref={ref} 
            style={{top: `${textureHeight}px`}}
            className={`add-color-container ${hover ? 'add-color-container-hover' : ''}`}
            onClick={addColor} >
            <FiPlusCircle/>
        </div>
    )
} 

export default AddBtn;