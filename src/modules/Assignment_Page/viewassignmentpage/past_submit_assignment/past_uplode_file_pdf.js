import React from 'react';
import Docimg from '../../../../assets/assignment/docicon.png'
import Cancleimg from '../../../../assets/assignment/upfcancle.png';
import '../../../../css/assignment/pastviewAssignmentcss/past_submit_assignment.css';
import { connect } from 'react-redux';
import {FiledownlodeApi} from '../.../../../../../services/filedownlodeapi'


const Past_uplode_file =(props) =>{
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
    <div className="pastview_upf_main_div" >
        <div className="pastview_upf_docimg">
            <img src={Docimg}/>
        </div>
        <div className="pastview_upf_filename">
            <p>{SubString(props.name)}</p>

        </div>
        <div className="pastview_upf_downlode">
            <button onClick={downlodeclick}>Download</button>
        </div>

    </div>

    </>)
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Past_uplode_file)