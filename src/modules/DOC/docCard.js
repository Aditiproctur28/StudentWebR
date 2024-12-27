import React, { useState } from 'react';
import './docCard.css';
import date from '../../assets/document/date.png'
import ecllips from '../../assets/document/ecllips.png'
import pdf from '../../assets/document/pdf.png'
import mp4 from '../../assets/document/mp4.png'
import png from '../../assets/document/png.png'
import gif from '../../assets/document/gif.png'
import doc from '../../assets/document/doc.png'
import docx from '../../assets/document/docx.png'
import xls from '../../assets/document/xls.png'
import xlsx from '../../assets/document/xlsx.png'
import yout from '../../assets/document/yout.png'
import ass from '../../assets/document/ass.png'
import ebk from '../../assets/document/ebk.png'
import video from '../../assets/document/video.png'
import Loader from '../../components/loader';
import moment from 'moment'

function getHeadImage(el) {
  let fname = el.el.file_name ? el.el.file_name.split(".").pop() : '';
  let image = "";
  if (fname === 'pdf') {
    image = pdf;
  }
  else if (fname === 'docx') {
    image = docx;
  }
  else if (fname === 'doc') {
    image = doc;
  }
  else if (fname === 'png') {
    image = png;
  }
  else if (fname === 'ppt') {
    image = xls;
  }
  else if (fname === 'pptx') {
    image = xls;
  }
  else if (fname === 'mp4') {
    image = mp4;
  }
  else if (fname === 'xls') {
    image = xls;
  }
  else if (fname === 'xlsx') {
    image = xlsx;
  }
  else if (fname === 'bmp') {
    image = xls;
  }
  else if (fname === 'gif') {
    image = gif;
  }
  else if (fname === 'jpg') {
    image = xls;
  }
  else if (fname === 'jpeg') {
    image = xls;
  }
  else if (fname === 'acc') {
    image = xls;
  }
  else if (fname === 'txt') {
    image = xls;
  }
  else if (fname === 'zip') {
    image = xls;
  }
  else if (fname === 'tif') {
    image = xls;
  }
  else if (fname === 'rtf') {
    image = xls;
  }
  else if (fname === 'wav') {
    image = xls;
  }
  else if (el.category_name === "Vimeo") {
    image = yout;
  }
  else if (el.category_name == 'Youtube') {
    image = yout
  }
  return image;
}

function getSubjectImage(category) {
  let category_name = category;
  // fname.split('.').pop();
  let image = "";
  if (category_name === 'Assignment' || category_name === 'Other') {
    image = ass;
  }
  else if (category_name === 'EBook' || category_name === 'Exam') {
    image = ebk;
  }
  else if (category_name === "Vimeo" || category_name === 'Youtube') {
    image = video;
  }
  return image;
}


function DocCard(props) {
  var head_image = (props.el.thumbnail_list && Array.isArray(props.el.thumbnail_list) && props.el.thumbnail_list.length != 0 ? props.el.thumbnail_list[0].posterUrl : getHeadImage(props));
  var subject_image = getSubjectImage(props.el.category_name);
  let dates = props.el.student_file_share_date
  let newdate = dates.split(" ")
  newdate = newdate[0]
  let fname = props.el.file_name ? props.el.file_name.split(".").pop() : '';

  return (<>
    {(props.document_type == "" || (props.el.category_name == props.document_type)) &&

      <div className="doc-card">

        <div className="doc-card-name">
          <img src={head_image} className="doc-card-items-image1" alt="" />

          <div className="doc-card-heading">
            <span className="doc-card-heading-b" title={props.el.title}>{props.el.title}</span>
            {
              props.el.category_name !== 'Youtube' &&  <span className="doc-card-heading-s" > Size:{parseFloat(props.el.size).toFixed(2)} MB</span>

            }
          </div>
        </div>

        <div className="doc-card-items">
          <img src={date} className="doc-card-items-image" alt="" />
          <span className="doc-card-heading-b" title={props.el.student_file_share_date}>{moment(newdate).format("DD-MM-YYYY")}</span>
        </div>
        <div className="doc-card-items">
          <img src={ecllips} className="doc-card-items-image" alt="" />
          <span className="doc-card-heading-b" title={props.el.subject_name}>{props.el.subject_name}</span>
        </div>
        <div className="doc-card-items">
          <img src={subject_image} className="doc-card-items-image" alt="" />
          <h5 className="doc-card-heading-b" title={props.el.category_name}>{props.el.category_name == "Vimeo" ? "Video" : props.el.category_name}</h5>
        </div>
        {props.el.category_name !== 'Youtube' && props.el.category_name !== 'Vimeo' &&
          <div className="button-hover">
            {props.el.is_readonly == "N"  &&
            <button className="download-button" onClick={() => { props.download(props.el); }}>   Download  </button>
            }    
           {fname=='pdf' && props.el.is_readonly == "Y" &&
            <button className="view-button" onClick={() => { props.view(props.el); }}>View</button>
           }

          </div>
        }

        {props.el.category_name == 'Youtube' &&
          <div className="button-hover">
            <button className="view-button" onClick={() => { props.youtubeVideo(props.el) }} >  Play  </button>
          </div>
        }

        {props.el.category_name == 'Vimeo' &&
          <div className="button-hover">
            <button className="view-button" onClick={() => { props.vimeo(props.el); props.UpdatVimeoWatchCall(props.el); }}  >  Play  </button>

            {props.vimeo_video_downlodable == true &&
              <button className="download-button" onClick={() => { props.downloadvimeo(props.el); }}>   Download  </button>
            }
          </div>
        }

      </div>
    }

  </>);

}

export default DocCard;