
import { FC, useState } from 'react';
import { FiRefreshCcw, FiChevronRight, FiChevronLeft, FiCornerUpLeft, FiCornerUpRight, FiDownload } from 'react-icons/fi'
import { Color } from '../assets/models';
import { formatTexture } from './Menu';

import '../css/sidebar.css';
import DownloadBtn from './DownloadBtn';

type Props = {
    coolors: Color[]
    previous: () => void;
    refresh: () => void;
    next: () => void;
}

const Sidebar: FC<Props> = ( { coolors, previous, refresh, next } ) => {

    const [hover, setHover] = useState(false)
    const onMouseOver = () => setHover(true)
    const onMouseOut = () => setHover(false)
    const ArrowIcon = hover ? FiChevronLeft : FiChevronRight

    return (
        <div className="sidebar-wrapper" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            <ArrowIcon className="param-icon" />
            <div className="move-updates">
                <FiCornerUpLeft className="bar-icon" onClick={previous}/>
                <FiRefreshCcw className="bar-icon" onClick={refresh}/>
                <FiCornerUpRight className="bar-icon" onClick={next}/>
            </div>
            <div className="bar-coolors">
                { coolors.map( c => {
                    return <div key={`barcolor${Math.random()}`} className="bar-coolor">
                        <div className="main-color" style={{backgroundImage: `url(/minecraft/${c.texture})`}}></div>
                        <div className="main-color" style={{background: `rgb(${c.palette.Vibrant || c.palette.Muted})`}}></div>
                        {formatTexture(c.texture)}
                    </div>
                })}
            </div>
            <DownloadBtn coolors={coolors} />
        </div>
    );
}

export default Sidebar;
