import React from 'react';
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {ErrorMessageHandling} from '../components/error'
  export function FiledownlodeApi(props) {
    let request = {
        url: '/api/v2/onlineAssignment/downloadFile',
        token:props.auth.student_auth,
        data: {
            attachmentId_array:[props.attachment_id],
            institute_id: props.auth.institute_id,
            
        }
    }

    api.postAuth(request).then(data => {
        window.open(data.data.result.body)
    }).catch((err)=>{
        if (err && err.response && err.response.status == 403) {
            { props.dispatch({ type: 'LOGOUT',  msg:err.response.data.message }) }
        }
       else if(err.response && err.response.data){
            toast.error(err.response.data.message);
        }
        else{
            toast.error(ErrorMessageHandling(err));
        }
    })
    return(<>
    <ToastContainer/>
    </>)
    
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(FiledownlodeApi)
