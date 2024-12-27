import React from "react";
import './vimeo.css';
import cancle from '../../assets/liveclass/cancle.png'
import Vimeo_list from "./vimeo.list";

class vimeo extends React.Component {
   render() {
      return (<>
         <div className="vimeo-popup-box">
            <div className="vimeo-box">
               <div className="vimeo-box-cointainer">
                  <div className="vimeo-box-cointainer-left">
                     <p> Download</p>
                  </div>
                  <div className="vimeo-box-cointainer-right">
                     <button onClick={() => this.props.open_modal(false)} className="cancel_button"><img src={cancle}  /></button>
                  </div>
               </div>
               <div className="vimeo-box-second-line">
                  <div className="vimeo-box-second-line-sizename">
                     <p>Size*Height</p>
                  </div>
                  <div className="vimeo-box-second-line-sizevalue">
                     <p>Size</p>
                  </div>
                  <div className="vimeo-box-second-line-action">
                     <p>Action</p>
                  </div>

               </div>
               <div>
                  {(this.props.vimeo_download_links).map((res, index) => (
                     <Vimeo_list width={res.width}
                        height={res.height}
                        link={res.link}
                        size_short={res.size_short}
                        size={res.size}
                     />
                  ))}
               </div>
            </div>



         </div>



      </>)
   }
}
export default vimeo;