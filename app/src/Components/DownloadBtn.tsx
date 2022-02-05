
    
import { FC, useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi'
import { Color } from '../assets/models';

import '../css/sidebar.css';

type Props = {
    coolors: Color[]
}

const DownloadBtn: FC<Props> = ( { coolors } ) => {

    const ref = useRef(null)

    const download = () => {
        const content = JSON.stringify(coolors, null, 4)
        console.log(content);
        const blob = new Blob([content]);                   
        console.log(blob);
        const fileDownloadUrl = URL.createObjectURL(blob); 
        console.log(fileDownloadUrl);
        
        (ref.current as any).click();                   
        URL.revokeObjectURL(fileDownloadUrl);
    }

    return (
        <>
        <FiDownload className="bar-icon" onClick={download}/>
        <a style={{display: "none"}}
            download={"textures.json"}
            href={"textures.json"}
            ref={ref}
        ></a>
        </>
    );
}

export default DownloadBtn;
