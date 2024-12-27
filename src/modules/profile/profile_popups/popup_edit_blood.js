import cross_icon from '../../../assets/profile/cross_icon.png'
import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import api from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessageHandling } from '../../../components/error'

class EditBloodGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  bloodgroup: '', } }

  componentDidMount = () => {   this.setState({ bloodgroup: this.props.profile_data.blood_group })  }

  save = (props) => {
    let request = {
      url: `/api/v1/profiles/update/${this.props.auth.institute_id}/${this.props.auth.user_id}`,
      token: this.props.auth.student_auth,
      data: {  blood_group: this.state.bloodgroup,  },
    }
    api
      .putAuth(request)
      .then((data) => {
        this.props.setprofile_data({  ...this.props.profile_data,  blood_group: this.state.bloodgroup,  })
        toast.success('Bloodgroup Updated Succesfully')
        this.props.onCancel()
      })
      .catch((error) => {
        if (error && error.response && error.response.status == 403) {
          { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
      } else if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
      } else {
          toast.error(ErrorMessageHandling(error)); }
      })
  }
  render() {
    return (
      <>
        <ToastContainer style={{ display: 'none' }} />
        <div className='profile_page_edit_blood_container'>
          <div className='profile_edit_blood_inner_container'>
            <div  className='cross_bloodgroup_popup_profile' style={{ cursor: 'pointer' }} >
              <img src={cross_icon} onClick={this.props.onCancel} />
            </div>
            <div className='profile_edit_blood_text'>Edit Blood Group </div>
            <div className='profile_edit_blood_line'></div>
            <div className='profile_edit_blood'>
              <select  style={{outline:"0",color:"black"}} value={ this.state.bloodgroup !== '-' ? this.state.bloodgroup : 'Select Blood Group' }
                onChange={(event) =>  this.setState({ bloodgroup: event.target.value })  }  >
                Select Blood Group
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
              </select>
            </div>
            <div className='profile_edit_dob_save_div'>
              <button style={{ cursor: 'pointer' }} onClick={this.save}>  Save   </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(EditBloodGroup)
