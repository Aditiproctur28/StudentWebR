import React, { useState } from 'react';
import "./studymfilter.css";
import SearchImg from "../../assets/search/searchbar.png"





function StudymFilter(props) {
    const [status, filter_status] = useState([])
    const [key , setkey] = useState('')
    const changecourse = (data) =>
    {
        setkey(data)
    }

    
    
    return (

        <div className="filter-container">

            <div className="reset">
                {props.course_type.map((data, index) => (
                    props.selectedtab == "StudyLibrary" && data.isPaid !== "Y" &&
                    <div className='Study-filter-heading'>
                        <span className={(data.course_type_id + '#$' + data.course_type) == key ? "Study-filter-neet1" : "Study-filter-text1"} onClick={()=>{props.detailSubject(data); changecourse(data.course_type_id + '#$' + data.course_type) ; props.selectCourse(data.course_type_id)}}>{data.course_type}</span>
                    </div>
                ))
                }

                {props.course_type.map( (data, index) => (
                    props.selectedtab == "PurchasedProduct" && data.isPaid == "Y" &&
                    <div className='Study-filter-heading'>
                        <span className={(data.course_type_id + '#$' + data.course_type) == key ? "Study-filter-neet1" : "Study-filter-text1"} onClick={()=>{props.detailSubject(data); changecourse(data.course_type_id + '#$' + data.course_type) ;  props.selectCourse(data.course_type_id)}}>{data.course_type}</span>
                       
                    </div>
                ))
                }
            </div>
            <div className="searchhhhhhhhhhh">
            <div className="search-study"> 
            <div className="Search_bar">
        <form className="form_Style" onSubmit={(e)=>e.preventDefault()}>
            <input className="Search_Input" type="text" placeholder="Search" value={props.search} onChange={(e)=>props.setsearch(e.target.value)}
        />
        <button className="Search_button" style={{border:0, background:"none"}} ><img src={SearchImg}/></button>
    </form>
    </div>  
            </div>
            </div>
        </div>

    );
}

export default StudymFilter;