import { FC, useState } from 'react' 
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

const getColorsHeight = (width: number, hover: boolean) => {
    return `calc((100vh - ${width}vw) ${hover ? '' : '* 4'})`
}

type Props = {
    texture: any;
    palette: any;
    width: number;
    locked: boolean;
    onDrag: () => void;
    onLock: () => void;
}

const Coolor: FC<Props> = ( { width, texture, palette, locked, onDrag, onLock } ) => {

    const [hover, setHover] = useState<boolean>(false)
    const [colorsHeight, setColorsHeight] = useState<string>(getColorsHeight(width, false)) 

    const size = `${width}vw`
    const paletteKeys = Object.keys(palette)

    const changeHover = (val: boolean) => {
        setHover(val)
        setColorsHeight(getColorsHeight(width, val))
    }

    const LockIcon = locked ? FiLock : FiUnlock;

    return (
        <div className={`coolor-wrapper`} style={{width: size}}>
            <div 
                className="coolor-texture" 
                style={{backgroundImage: `url(/minecraft/${texture})`, width: size, height: size}} >
                <div className="texture-icons">
                    <div className='icon delete-icon'><FiX/></div>
                    <div className={`icon ${locked ? 'icon-checked' : ''}`} onClick={onLock} ><LockIcon /></div>
                    <div className='icon drag-icon' onMouseOver={onDrag}><FiMaximize2 className="rotated-icon"/></div>
                </div>
                
            </div>
            <div className={`colors ${hover ? 'colors-hover' : ''}`} style={{height: colorsHeight}} 
                onMouseEnter={()=>changeHover(true)} onMouseLeave={()=>changeHover(false)}>
                { paletteKeys.map( (color: any, i: number) => {
                    const hex = rgbToHex(palette[color])
                    return <div 
                        key={Math.random() + 2}
                        className="color" 
                        style={{width: size, height: "25%", background: `rgb(${palette[color]})`}}>
                        <Menu hex={hex} texture={texture} isLight={isLight(palette[color])}/>
                    </div>
                })}
            </div>
            <AddBtn />
        </div>
    )
} 

export default Coolor;