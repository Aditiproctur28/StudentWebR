import React, { useState } from 'react';
import '../../../../css/assignment/submit_assignment.css';
import addlink from '../../../../assets/assignment/attachimg.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const regex_for_url_validation = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

const Submit_link = (props) => {  
  const [temp_url, setUrl] = useState({ display_name: "", url: "" });

  const onAddLink = () => {
    if (!regex_for_url_validation.test(temp_url.url)) {
      toast.error("Please enter valid url!");
    } else if (temp_url.display_name.length < 1) {
      toast.error("Please enter valid url name.");
    } else {
      let temp = props.details.url_List;
      temp.push(temp_url);
      props.valueChange('url_List', temp);
      setUrl({ display_name: "", url: "" });
    }
  }

  const setData = (k, v) => {
    let temp = temp_url;
    temp[k] = v;
    setUrl({...temp_url, ...temp});
  }

  return (
    <>
      <div className="sl_maindiv">

        <div className="sl_linkname">
          <input maxLength="50" placeholder="Link Name" onChange={(e) => { setData('display_name', e.target.value) }} value={temp_url.display_name} />
        </div>

        <div className="sl_inputlink">
          <input  rows="5" cols="60" placeholder="Add your Link here" onChange={(e) => { setData('url', e.target.value) }} type={'url'} value={temp_url.url} />
        </div>

      </div>

      <div className="addlinkbutton" onClick={onAddLink}>
        <button>  <p style={{color:"#A8A8A8" , fontSize:'10px'}}> Add new link </p> <i class="fa fa-plus-circle" aria-hidden="true" style={{color:"blue"}}></i></button>
       
      </div>

      <ToastContainer/>

    </>
  )
}
export default Submit_link;