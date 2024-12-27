import React, {useState} from 'react';
import './studydocmaterial.css'
import arr from '../../assets/studyMaterial/arr.png'
import '../DOC/docCard.css'
import StudymDoc from './studymDoc';
// import card from './studymDoc'

const combinedMap = (Study_Material_files, topic_name) => {
    //condition for undefined file return blank array
    //add topic name 

    let combinedArray = [];
    if (Study_Material_files != undefined) {
        let availKey = Object.keys(Study_Material_files)
        for (let index = 0; index < availKey.length; index++) {
            let ObjArr = Study_Material_files[availKey[index]];
            for (let index2 = 0; index2 < ObjArr.length; index2++) {
                combinedArray = [...combinedArray, { ...ObjArr[index2], type: availKey[index], topic_name }]
            }
        }
    }
    this.setState({Study_Material_files:combinedArray})
     return combinedArray;
}



const onClickSubjects = (Material_topic) => {
    let arr = [];
    arr = [...arr, ...this.combinedMap(Material_topic.studyMaterialMap, Material_topic?.topicName ?? "")]

    if (Material_topic.subtopicList != undefined) {
        for (let i = 0; i < Material_topic.subtopicList.length; i++) {
            arr = [...arr, ...this.onClickSubjects(Material_topic.subtopicList[i])]
        }
    };
    return arr;
}

function  StudydocMaterial(props){
  
    return(
    <div>
        <div className="subject-container">
           
          <div className="container-studym">
              <div className="divvvvvva">
                  <button className="buttonsub"><img src={arr}/></button>
                  <span className="subtopicname">Subtopic List</span>
                  
                  </div >
              <StudymDoc/>  


              <div className="divvvvvva2"> 
                  
                  <button className="buttonsub"><img src={arr}/></button>
                  <span  className="subtopicname">Subtopic List</span>
                  
                  </div> 
       <div className="second-div">
               <StudymDoc/>         
              </div> 
</div>

        </div>

         </div>
   
    
    );
    
    }
export default StudydocMaterial;