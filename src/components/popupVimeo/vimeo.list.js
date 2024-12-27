import React from 'react';
import downlode from '../../assets/liveclass/downlode.png'
import './vimeo.list.css'
const vimeo_list = (props) => {

    return (<>
        <div className="radio-button">
            <div> <p>{props.width+ "*" +props.height}</p></div>
            <div> <p>{props.size_short}</p></div>
            <button className="download-popup" onClick={() => { window.open(props.link) }} > <img src={downlode} /></button>
        </div>
    </>)
}
export default vimeo_list;