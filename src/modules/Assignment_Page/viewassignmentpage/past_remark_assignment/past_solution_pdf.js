import React from 'react';
import Docicon from '../../../../assets/assignment/docicon.png';
import '../../../../css/assignment/pastviewAssignmentcss/past_remark_assignment.css';
import { connect } from 'react-redux';
import {FiledownlodeApi} from '../../../../services/filedownlodeapi'

const Past_solution_pdf =(props) =>{
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
    return(<>
   
    <div className="pastview_sp_maindiv">
        <div className="pastviewsp_docicon"> 
            <img src={Docicon}/>
        </div>
        <div className="pastview_sp_details">
            <div className="pastview_sp_name">
                <p>{SubString(props.name)} </p>
            </div>
            <div className="pastview_sp_pdfsize">
                 <div className="pastview_sp_sizetitle">
                     <p>File Size:</p>
                 </div>
                 <div className="pastview_sp_sizevalue">
                     <p>{props.size} MB</p>

                 </div>
            </div>
            
        </div>
        <div className="pastview_sp_downlode">
                <button onClick={downlodeclick }>Download</button>
            </div>
    </div>

    </>)
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Past_solution_pdf)