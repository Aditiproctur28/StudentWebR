import React, { Component } from 'react'
import tiles from '../../assets/studyMaterial/tiles.png'
import tiles2 from '../../assets/studyMaterial/tiles2.png'
import blocks from '../../assets/studyMaterial/blocks.png'
import block2 from '../../assets/studyMaterial/block2.png'

export default class cardsHeader extends Component {
    subjectsData = (Material_topic) => {
        let arr = [{ topicId: Material_topic?.topicId ?? 0, topicName: Material_topic?.topicName ?? "Select Topic" }];
        if (Material_topic.subtopicList != undefined) {
            for (let i = 0; i < Material_topic.subtopicList.length; i++) {
                arr = [...arr, ...this.subjectsData(Material_topic.subtopicList[i])]
            }
        };
        return arr;
    }
    render() {
        let topics = this.subjectsData(this.props.subjectData)
        return (
            <div className="icon">
                {this.props.view == 'title' &&
                    <div className="dropStudy">
                        <form className="study-form_input">
                            <div className="study-filter-dropdown select">
                                <select name="Select Faculty" id="Select Faculty" onChange={e => this.props.changeTopic(e.target.value)} value={this.props.topicId}>
                                    {
                                        topics.map((data, key) => <option value={data.topicId} key={key}>{data.topicName}</option>)
                                    }

                                </select>
                            </div>
                        </form>
                    </div>
                }

                <div className="iconStud">
                    {this.props.view == "title" ?
                        <button onClick={() => this.props.changeView('title')} >
                            <div className="menu-icon" ><img src={tiles} alt="" /></div>
                        </button>
                        : <button onClick={() => this.props.changeView('title')} >
                            <div className="menu-icon" ><img src={tiles2} alt="" /></div>
                        </button>
                    }

                    {this.props.view == "card" ?
                        <button onClick={() => this.props.changeView('card')}>
                            <div className="app-icon"><img src={blocks} alt="" /></div>
                        </button>
                        :
                        <button onClick={() => this.props.changeView('card')}>
                            <div className="app-icon"><img src={block2} alt="" /></div>
                        </button>
                    }
                </div>
            </div>
        )
    }
}
