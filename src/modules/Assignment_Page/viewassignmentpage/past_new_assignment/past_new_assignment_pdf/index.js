import React from 'react';
import '../../../../../css/assignment/pastviewAssignmentcss/past_new_assignment_pdf_module.css';
import Docicon from '../../../../../assets/assignment/docicon.png';
import {FiledownlodeApi} from '../../../../../services/filedownlodeapi'
import { connect } from 'react-redux';
const Past_new_assignment_pdf = (props) => {
    const downlodeclick = ()=>{
        FiledownlodeApi(props)
    }
    const SubString = (data) =>{
        if(data.length> 50){
            return data.substring(0, 50) + "..."
        }
        else {
            return data 
        }
    }
    
    return (<>
        <div className="pastview_pdf_main_div">
            <div className="pastview_pdf_container">
                <div className="pastview_pdf_img">
                    <img src={Docicon} />
                </div>
                <div className="pastview_pdf_details">
                    <div className="pastview_pdf_name">
                        <p>{SubString(props.name)}</p>
                    </div>
                    <div className="pastview_pdf_size">
                        <p className="size_title">File Size:</p> <p className="size_value">{props.size}MB</p>

                    </div>

                </div>
               
                <div className="pastview_Downlode_button">
                
                    <button  onClick={downlodeclick }>Download</button>
                
                </div>
                

            </div>


        </div>
    </>)
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Past_new_assignment_pdf)