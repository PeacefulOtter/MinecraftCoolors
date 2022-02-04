
import { FiRefreshCcw, FiChevronRight, FiChevronLeft, FiCornerUpLeft, FiCornerUpRight, FiDownload } from 'react-icons/fi'

import '../css/sidebar.css';

const Sidebar = () => {

    const toggleShowBar = () => {
        console.log('toggle');
    }

    const goBackward = () => {
        console.log("backward");
    }

    const goForward = () => {
        console.log('forward');
    }

    const refresh = () => {
        console.log('refresh');
    }

    return (
        <div className="sidebar-wrapper" onClick={toggleShowBar}>
            <FiChevronRight className="param-icon" />
            <div className="move-updates">
                <FiCornerUpLeft className="bar-icon" onClick={goBackward}/>
                <FiRefreshCcw className="bar-icon" onClick={refresh}/>
                <FiCornerUpRight className="bar-icon" onClick={goForward}/>
            </div>
            <FiDownload className="bar-icon" />
        </div>
    );
}

export default Sidebar;
