import { FC, createRef, useEffect, useState, useCallback } from 'react' 
import { FiLock, FiUnlock, FiMaximize2, FiX, FiPlusCircle } from 'react-icons/fi'
import AddBtn from './AddBtn';

import Menu from './Menu';

const rgbToHex = ([r, g, b]: any) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).split('.')[0];
}

const isLight = ([r, g, b]: any) => {
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 128;
}

type Props = {
    texture: any;
    palette: any;
    locked: boolean;
    onDrag: () => void;
    onLock: () => void;
    addColor: () => void;
    deleteColor: () => void;
}

const useRefHeight = (ref: any) => {
    const [height, setHeight] = useState(0)

    const recalcHeight = () => {
        if (ref.current) {
            const { current } = ref
            const boundingRect = current.getBoundingClientRect()
            setHeight(Math.round(boundingRect.height))
          }
    }
    
    useEffect( () => {
      recalcHeight()
    }, [ref] )

    useEffect( () => {
        window.addEventListener( 'resize', recalcHeight )
        return () => window.removeEventListener( 'resize', recalcHeight )
    }, [])

    return height
  }

const Coolor: FC<Props> = ( { texture, palette, locked, onDrag, onLock, addColor, deleteColor } ) => {

    const ref = createRef()
    const [hover, setHover] = useState<boolean>(false)
    const textureHeight = useRefHeight(ref) 

    const paletteKeys = Object.keys(palette)

    const changeHover = (val: boolean) => {
        setHover(val)
    }

    const LockIcon = locked ? FiLock : FiUnlock;

    return (
        <div className={`coolor-wrapper`}>
            <div 
                className="coolor-texture" 
                ref={ref as React.RefObject<HTMLDivElement>}
                style={{backgroundImage: `url(/minecraft/${texture})`}} >
                <div className="texture-icons" style={{height: `${textureHeight}px`}}>
                    <div className='icon delete-icon' onClick={deleteColor}><FiX/></div>
                    <div className={`icon ${locked ? 'icon-checked' : ''}`} onClick={onLock} ><LockIcon /></div>
                    <div className='icon drag-icon' onMouseOver={onDrag}><FiMaximize2 className="rotated-icon"/></div>
                </div>
                
            </div>
            <div className={`colors ${hover ? 'colors-hover' : ''}`} style={{height: `calc((100vh - ${textureHeight}px) ${hover ? '' : '* 4'})`}} 
                onMouseEnter={()=>changeHover(true)} onMouseLeave={()=>changeHover(false)}>
                { paletteKeys.map( (color: any, i: number) => {
                    const hex = rgbToHex(palette[color])
                    return <div 
                        key={Math.random() + 2}
                        className="color" 
                        style={{background: `rgb(${palette[color]})`}}>
                        <Menu hex={hex} texture={texture} isLight={isLight(palette[color])}/>
                    </div>
                })}
            </div>
            <AddBtn textureHeight={textureHeight} addColor={addColor}/>
        </div>
    )
} 

export default Coolor;