import React, { Component } from 'react';
import './studymaterialcard.css'
import '../DOC/docCard.css'
import SubjectCard from './subjectCard'
import CardsHeader from './cardsHeader'
import CardView from './cardView'
import TileView from './tileView' 

export default class studymaterialcard extends Component {
  state = {
    subjectData: {},
    subjectId: 0,
    topicId: 0,
    view: 'card',
    subjects: []
  }

  subjectClick = (subjectData) => {
    this.setState({ subjectData, subjectId: subjectData.subjectId })
  }

  componentDidMount() {
    this.setState({ subjects: this.props.subjects });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedtab != this.props.selectedtab) {
      this.setState({ subjects: [], subjectData: [], subjectId: 0 })
    } else if(prevProps.selected_course != this.props.selected_course){
      this.setState({ subjectData: [], subjectId: 0 })
    } else if (prevProps.subjects != this.props.subjects) {
      this.setState({ subjects: this.props.subjects });
    }
  }

  render() {
    return (
      <div>
        <div className="subject-container">
          {this.state.subjects.length > 0 && <SubjectCard subjects={this.props.subjects} subjectClick={this.subjectClick} />}
          <div className="container">
            {this.state.subjectId != 0 && <div>
              <CardsHeader
                topicId={this.state.topicId}
                view={this.state.view}
                changeView={(view) => this.setState({ view })}
                changeTopic={(topicId) => this.setState({ topicId })}
                subjectData={this.state.subjectData}
              />
              {
                this.state.view == 'title'
                  ?
                  <CardView topicId={this.state.topicId} subjectData={this.state.subjectData} {...this.props} />
                  :
                  <TileView subjectData={this.state.subjectData} {...this.props} />
              }
            </div>
            }

          </div>
        </div>

      </div>
    )
  }
}


