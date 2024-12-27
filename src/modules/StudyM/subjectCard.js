import React, { Component } from 'react'
import arrow from '../../assets/studyMaterial/arrow.png'

export default class subjectCard extends Component {
    colr = ['#0d6efd', '#dc3545', '#198754', '#6c757d', '#dc3545']
    render() {
        return (
            <div className="subject-card">
            {this.props.subjects.map((data, index) => (
                
                <div className="subject-name"  onClick={() => this.props.subjectClick(data)} >
               
                    <div className="dv1">
                    <div className="subject-name-image" style={{backgroundColor: this.colr[Math.floor(index%5)]}} >  <p>{data.subjectName.charAt(0)}</p></div>
                     
                    <span className="subject-name-heading" title={data.subjectName}>{data.subjectName} </span>
                      
                    </div>
                   
                
                    <div className="dv2">
                    {/* <div className="new-files">10 new files</div> */}
                    <div className="arrows">
                  <button className="every-button">  <img src={arrow}></img></button></div>
                    </div>
                    
                </div>
                  ))
                } 
          </div>
        )
    }
}
