import React, { Component, useState } from 'react'
import './studydocmaterial.css'
import arr from '../../assets/studyMaterial/arr.png'
import '../DOC/docCard.css'
import StudymDoc from './studymDoc';

export default class cardView extends Component {

    render() {
        let allData = this.props.subjectData;
       
        return (
            <div>
                <div className="subject-container">
           
                    <div className="container-studym">
                        <ParentContainer {...allData} props={this.props} />
                    </div>
            
                </div>
            </div>
        )
    }
}

const filesCount = (studyMaterialMap) => {
    let keyss=Object.keys(studyMaterialMap);
    let countt= 0;
    for (let index = 0; index < keyss.length; index++) {
        countt = countt + studyMaterialMap[keyss[index]].length
    }
    return countt;
}


function ParentContainer(props) {  
    const [open,setOpen]=useState(false)
 
    return (
        <div className="second-div">
            <div className="divvvvvva" onClick={()=>{setOpen(!open)}} > 
            <div>
                <button className="buttonsub"><img src={arr}/></button>
                <span  className="subtopicname">{props?.topicName ?? props.subjectName}</span></div>
                <span className="no-of-files" style={{fontSize:"10px"}}> Topics : {props.subtopicList.length }  {filesCount(props.studyMaterialMap)>0 && <p> &nbsp; ,  &nbsp; Files : { filesCount(props.studyMaterialMap)}</p>}</span>
            </div> 
            {
             open &&
                <div>
                <FileConatainer  Study_Material_files={props.studyMaterialMap} topic_name={props?.topicName ?? props.subjectName} {...props.props} />
                {
                    props.subtopicList != undefined && 

                    props.subtopicList.map((data, index) =><ParentContainer {...data} props={props.props} /> )
                }
            
                </div>
            }   
        </div> 
        
    )
}


 const FileConatainer = (props) => 
 {
    return (props.Study_Material_files != undefined) && 
        Object.keys(props.Study_Material_files).map((data2, key2) => 
        props.Study_Material_files[data2].map((data, key) => 
        (props.search == "" || data.title.toUpperCase().includes(props.search.toUpperCase())) &&
        <StudymDoc key={key} el={data}
                heading_name={data.title}
                date={data.student_file_share_date}
                type={data2}
                file_name={data?.file_name??""}
                topic={props.topic_name}
                category_name={data.category_name}
                download={props.download} view={props.view} downloadvimeo={props.downloadvimeo}
                UpdatVimeoWatchCall={props.UpdatVimeoWatchCall}
                vdocipherApicalling={props.vdocipherApicalling}
                youtubeVideo={props.youtubeVideo}
                vimeo={props.vimeo}
                image={props.image}
                listen={props.listen}
                is_readonly={data.is_readonly}
                vimeo_video_downlodable={props.subjectData.vimeo_video_downlodable}
                video_url={data.video_url}
                posterUrl={data.posterUrl}
                posterList={data.posterList}
                
            />
            )
        )
 }

