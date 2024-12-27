import React, { Component } from 'react'
import './studymaterialcard.css'
import '../DOC/docCard.css'
import StudymDoc from './studymDoc';

export default class 
cardView extends Component {
    combinedMap = (Study_Material_files, topic_name, topic_id) => {
        let combinedArray = [];
        if (Study_Material_files != undefined) {
            let availKey = Object.keys(Study_Material_files)
            for (let index = 0; index < availKey.length; index++) {
                let ObjArr = Study_Material_files[availKey[index]];
                for (let index2 = 0; index2 < ObjArr.length; index2++) {
                    combinedArray = [...combinedArray, { ...ObjArr[index2], type: availKey[index], topic_name,  topic_id}]
                }
            }
        }
        return combinedArray;
    }

    subjectsData = (Material_topic) => {
        let arr = [];
        arr = [...arr, ...this.combinedMap(Material_topic.studyMaterialMap, Material_topic?.topicName ?? Material_topic.subjectName, Material_topic?.topicId ?? 0)]
        if (Material_topic.subtopicList != undefined) {
            for (let i = 0; i < Material_topic.subtopicList.length; i++) {
                arr = [...arr, ...this.subjectsData(Material_topic.subtopicList[i])]
            }
        };
      
        return arr;
    }

    render() {
        let allData = this.subjectsData(this.props.subjectData)
        return (
            <div>
                { allData&& allData.map((data, index) => (
                    ((this.props.topicId==0 || (this.props.topicId==data.topic_id)) && (this.props.search == "" || data.title.toUpperCase().includes(this.props.search.toUpperCase())))&&
                    <StudymDoc key={index} el={data}
                        heading_name={data.title}
                        date={data.student_file_share_date}
                        type={data.type}
                        file_name={data?.file_name??""}
                        topic={data.topic_name}
                        category_name={data.category_name}
                        download={this.props.download} view={this.props.view}
                         downloadvimeo={this.props.downloadvimeo}
                        UpdatVimeoWatchCall={this.props.UpdatVimeoWatchCall}
                        vdocipherApicalling={this.props.vdocipherApicalling}
                        youtubeVideo={this.props.youtubeVideo}
                        vimeo={this.props.vimeo}
                        image={this.props.image}
                        listen={this.props.listen}
                        is_readonly={data.is_readonly}
                        vimeo_video_downlodable={this.props.subjectData.vimeo_video_downlodable }
                        video_url={data.video_url}
                        posterUrl={data.posterUrl}
                        posterList={data.posterList}
                    />
                    
                    )
                )
                    }
            </div>
        )
    }
}
