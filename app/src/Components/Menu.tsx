import { FC } from 'react' 

type Props = {
    hex: any;
    texture: any;
    isLight: boolean;
}

const format = (s: string) => {
    return s.substring(0, s.length - 4).replaceAll('_',' ')
}

const Menu: FC<Props> = ( { hex, texture, isLight } ) => {

    return (
        <div className={`coolor-menu ${isLight ? 'is-light' : ''}`}>
           <div className="coolor-header">
               <div className="coolor-hex">{hex}</div>
               <div className="coolor-name" id="coolor-name">{format(texture)}</div>
           </div>
        </div>
    )

}

export default Menu;