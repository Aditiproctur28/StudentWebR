import cross_icon from '../../../assets/profile/cross_icon.png'
import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import api from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessageHandling } from '../../../components/error'

class EditBirthPlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  birthplace: '',} }

  componentDidMount = () => { this.setState({ birthplace: this.props.profile_data.birth_place })  }

  save = (props) => {
    let request = {
      url: `/api/v1/profiles/update/${this.props.auth.institute_id}/${this.props.auth.user_id}`,
      token: this.props.auth.student_auth,
      data: { birth_place: this.state.birthplace, },
    }
    api
      .putAuth(request)
      .then((data) => {
        this.props.setprofile_data({ ...this.props.profile_data, birth_place: this.state.birthplace, })
        toast.success('Birthplace Updated Succesfully')
        this.props.onCancel()
      })
      .catch((error) => {
        if (error && error.response && error.response.status == 403) {
          { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
      } else if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
      } else {  toast.error(ErrorMessageHandling(error));  }
      })
  }
  render() {
    return (
      <>
        <ToastContainer style={{ display: 'none' }} />
        <div className='profile_page_edit_birth_container'>
          <div className='profile_edit_birth_inner_container'>
            <div className='cross_birthplace_popup_profile' style={{ cursor: 'pointer' }} >
              <img src={cross_icon} onClick={this.props.onCancel} />
            </div>
            <div className='profile_edit_birth_text'>Edit Birth Place </div>
            <div className='profile_edit_birth_line'></div>
            <div className='profile_edit_birth'>
              <center>  <input  style={{outline:"0",color:"black"}}  value={ this.state.birthplace !== '-' ? this.state.birthplace : ''  }
                  onChange={(event) =>  this.setState({  birthplace: event.target.value.substr(0, 20),  }) }  placeholder='Enter Birth Place'  ></input>
              </center>
            </div>
            <div className='profile_edit_birth_save_div'>  <button onClick={this.save} style={{ cursor: 'pointer' }}>  Save </button>  </div>
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(EditBirthPlace)
