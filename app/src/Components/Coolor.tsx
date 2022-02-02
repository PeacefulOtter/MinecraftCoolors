import { forwardRef, useImperativeHandle, useState, useEffect } from 'react' 
import { FiLock, FiUnlock, FiMaximize2, FiX } from 'react-icons/fi'

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

const Coolor = forwardRef( (props: any, ref: any) => {

    const [hover, setHover] = useState<boolean>(false)
    const [colorsHeight, setColorsHeight] = useState<string>(getColorsHeight(props.width, false)) 

    const texture = props.texture;
    const palette = props.palette;

    const size = `${props.width}vw`
    const paletteKeys = Object.keys(palette)

    const changeHover = (val: boolean) => {
        setHover(val)
        setColorsHeight(getColorsHeight(props.width, val))
    }

    const LockIcon = props.locked ? FiLock : FiUnlock;

    return (
        <div className={`coolor-wrapper`} style={{width: size}}>
            <div 
                className="coolor-texture" 
                style={{backgroundImage: `url(/minecraft/${texture})`, width: size, height: size}} >
                <div className="texture-icons">
                    <div className={`icon`}><FiX/></div>
                    <div className={`icon ${props.locked ? 'icon-checked' : ''}`} onClick={props.onLock} ><LockIcon /></div>
                    <div className="icon" onMouseOver={props.onDrag}><FiMaximize2 className="rotated-icon"/></div>
                </div>
                
            </div>
            <div className={`colors ${hover ? 'colors-hover' : ''}`} style={{height: colorsHeight}} 
                onMouseEnter={()=>changeHover(true)} onMouseLeave={()=>changeHover(false)}>
                { paletteKeys.map( (color: any, i: number) => {
                    // const restHeight = `calc((100vh - ${props.width}vw) / ${paletteKeys.length})`
                    
                    const hex = rgbToHex(palette[color])
                    return <div 
                        key={Math.random() + 2}
                        className="color" 
                        style={{width: size, height: "25%", background: `rgb(${palette[color]})`}}>
                        <Menu hex={hex} texture={texture} isLight={isLight(palette[color])}/>
                    </div>
                })}
            </div>
        </div>
    )

} )

export default Coolor;