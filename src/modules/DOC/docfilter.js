import React, { setState } from 'react';
import "./docfilter.css";
import reset from '../../assets/document/reset.png'
function DocFilter(props) {
    return (
        <div className="doc-filter-container">
            <div className="doc-filter-reset">
                <form className="doc-form_input"  >
                    <div className="doc-filter-dropdown">
                        <select name="subject" id="subject" value={props.subject_id}   onChange={e =>{ props.changeSubject(e.target.value);props.onFilter(e.target.value);}}>
                            <option value="0"> Select Subject</option>
                            {
                                props.subjects.map((data, key) => <option key={key} value={props.is_open_user ? data.course_id : data.subject_id}>{props.is_open_user ? data.course_name.substr(0,15) : data.subject_name.substr(0,15)}</option>)
                            }
                        </select>
                    </div>
                    <div className="doc-filter-dropdown">
                        <select name="document" id="document" value={props.document_type} onChange={e => props.changeDocument(e.target.value)} >
                            <option value="">Document Type</option>
                            <option value="Assignment">Assignment</option>
                            <option value="EBook">EBook</option>
                            <option value="Exam">Exam</option>
                            <option value="Vimeo">Video</option>
                            <option value="Youtube">Youtube</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {/* <button type="button" style={{ outline: '0', border: '0', borderRadius: '5px', marginRight: '20px', marginLeft: '10px', height: '35px', width: '65px', backgroundColor: 'rgba(25, 83, 231, 1)', fontFamily: "Lato", fontWeight: '400', style: 'normal', color: 'rgba(255, 255, 255, 1)' }} onClick={() => props.onFilter(props.subject_id)}>Apply</button> */}
                </form>
                {props.document_type!=0 &&
                <div className="doc-filter-reset" onClick={() => props.changeDocument("")}>
                    <img src={reset} className="doc-card-items-image" alt="" />
                    <button className="text_heading_reset">Reset Filter</button>
                </div>
}
            </div>
        </div>
    );
}

export default DocFilter;