import React from 'react'
import './studymDoc.css'
import '../DOC/docCard.css'
import date from '../../assets/document/date.png'
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
import folder from '../../assets/document/folder.png'
import mp3 from '../../assets/studyMaterial/mp3.png'
import jpg from '../../assets/studyMaterial/jpg.png'
import ppt from '../../assets/studyMaterial/ppt.png'
import pptx from '../../assets/studyMaterial/pptx.png'
import viemo from '../../assets/studyMaterial/viemo.png'
import videocypher from '../../assets/studyMaterial/videosypher.png'
import zip from '../../assets/studyMaterial/zip.png'
import txt from '../../assets/studyMaterial/txt.png'
import aac from '../../assets/studyMaterial/aac.png'
import moment from 'moment'
import {isMobile} from 'react-device-detect';

function getHeadImage(el) {
  let fname = el?.file_name ?? "";
  fname = fname.split(".").pop();
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
    image = ppt;
  }
  else if (fname === 'pptx') {
    image = pptx;
  }
  else if (fname === 'mp4') {
    image = mp4;
  }
  else if (fname === 'mp3') {
    image = mp3;
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
    image = jpg;
  }
  else if (fname === 'acc') {
    image = aac;
  }
  else if (fname === 'txt') {
    image = txt;
  }
  else if (fname === 'zip') {
    image = zip;
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
  else if (fname === 'jpeg') {
    image = jpg;
  }
  else if (el.category_name === "Vimeo") {
    image = viemo;
  }
  else if (el.category_name == 'Youtube URL') {
    image = yout;
  }
  else if (el.category_name === "VDOCipher") {
    image = videocypher;
  }
  else if (el.category_name === ' ') {
    image = png;
  }
  return image;
}

function getSubjectImage(category) {
  let type = category;
  let image = "";
  if (type === 'Assignment' || type === 'Other' || type === 'Images' || type === 'Slides' || type === 'Notes' || type === 'PreviousYearQuestionsPaper') {
    image = ass;
  }
  else if (type === 'EBook' || type === 'Exam') {
    image = ebk;
  }
  else if (type === 'AudioNotes') {
    image = folder;
  }

  else if (type === "Vimeo" || type === 'YoutubeURL' || type === 'VDOCipher') {
    image = video;
  }
  return image;
}


function getFileFormat(el) {
  let fname = el?.file_name ?? "";
  fname = fname.split(".").pop();
  if (fname == 'wav' || fname == 'mp3' || fname == 'wma' || fname == 'aac') {
    return 'audio'
  } else if (fname == 'mp4' || fname == 'gif') {
    return 'video'
  } else if (fname == 'png' || fname == 'jpg' || fname == 'jpeg' || fname == 'bmp' || fname == 'tif') {
    return 'image'
  } else {
    return 'document'
  }
}



function StudymDoc(props) {

  var head_image = (props.posterList.length != 0 ? props.posterList[0].posterUrl : getHeadImage(props));

  var subject_image = getSubjectImage(props?.type ?? "");

  let day = props?.date ?? ""
  let newdate = day.split(" ")
  newdate = newdate[0]
  return (
    <div>
      <div className="studymdoc-card">
        {newdate > 15 &&
          <div className="new-files-doc">New Files</div>
        }
        <div className="student-doc-card-name">
          <div className="studydoc">
            <button  className="ssssy-button" onClick={() => {
               if(props.type == 'YoutubeURL'){
                props.youtubeVideo(props.el)
               }else if(props.type == 'VDOCipher'){
                props.vdocipherApicalling(props.el)
               }else if(props.type == 'Vimeo'){
                props.vimeo(props.el); 
                props.UpdatVimeoWatchCall(props.el);
               }else if(props.type == 'AudioNotes'){
                props.listen(props.el);
               }else if(props.type == 'Images'){
                props.image(props.el);
                 
               }
               else{
                props.view(props.el);
               }
                
                }}><img src={head_image} className="image-jp" alt="" /></button>

            <div className="sub-headding">
              <span className="head-studym" title={props.heading_name}>{props.heading_name}</span>
              <span className="topic" title={props.topic}>{props.topic}</span>
            </div>
          </div>

          <div className="text-heading" >
            <img src={date} className="image-size" alt="" />
            <span >{ props.date == null ? "-": moment(newdate).format("DD-MM-YYYY")}</span>
          </div>
          <div className="text-heading" >
            <img src={subject_image} className="image-size" alt=" " />
            {/* <span className="typeStud">{props.type}</span> */}
            <span title={props.type} className="typeStud">{props.type !== 'YoutubeURL' && props.type !== 'Vimeo' && props.type !== 'VDOCipher' ? <p>{props.type}</p> : <p>Video</p>}</span>
          </div>
          {props.type !== 'YoutubeURL' && props.type !== 'Vimeo' && props.type !== 'VDOCipher' && props.type !== 'AudioNotes' && props.type !== 'Images' &&
            <div className="hoverStud">
              {props.is_readonly == "N" &&
                <button className="download-button1" onClick={() => { props.download(props.el); }}>   Download  </button>
              }
              {true &&
                <button className="view-button1" onClick={() => {
                  let format = getFileFormat(props);
                  if(format == 'image') {
                    props.image(props.el)
                  }
                  else if(format == 'audio') {
                    props.listen(props.el);
                  }
                  else if(format == 'video') {
                   if(props.type == 'Vimeo' ){
                    props.vimeo(props.el);
                    props.UpdatVimeoWatchCall(props.el);
                   }else if(props.type == 'VDOCipher'){
                    props.vdocipherApicalling(props.el)
                   }
                   else{
                    props.youtubeVideo(props.el)
                   }
                  }
                  else{
                    props.view(props.el);
                  }
                }}>View</button>
              }

            </div>
          }

          {props.type == 'YoutubeURL' &&
            <div className="hoverStud">
              <button className="view-button1" onClick={() => { isMobile?window.open("https://examdesk.co/media.php?v="+btoa(props.el.youtubeVideoID).replaceAll("=", "$")):props.youtubeVideo(props.el) }} >  Play  </button>
            </div>
          }

          {props.type == 'VDOCipher' &&
            <div className="hoverStud">
              <button className="view-button1" onClick={() => { props.vdocipherApicalling(props.el) }} >  Play  </button>
            </div>
          }

          {props.type == 'Vimeo' &&
            <div className="hoverStud">
              <button className="view-button1" onClick={() => { props.vimeo(props.el); props.UpdatVimeoWatchCall(props.el); }}  >  Play  </button>
              {props.vimeo_video_downlodable == true &&
                <button className="download-button1" onClick={() => { props.downloadvimeo(props.el); }}>   Download  </button>
              }
            </div>
          }
          {props.type == 'AudioNotes' &&
            <div className="hoverStud">
              {props.is_readonly == "N" &&
                <button className="download-button1" onClick={() => { props.download(props.el); }}>   Download  </button>
              }
              <button className="view-button1" onClick={() => { props.listen(props.el); }} >  Listen  </button>
            </div>
          }

          {props.type == 'Images' &&
            <div className="hoverStud">
              {props.is_readonly == "N" &&
                <button className="download-button1" onClick={() => { props.download(props.el); }}>   Download  </button>
              }
              <button className="view-button1" onClick={() => { props.image(props.el); }}>View</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default StudymDoc;