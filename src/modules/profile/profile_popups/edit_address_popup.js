import cross_icon from '../../../assets/profile/cross_icon.png'
import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import api from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessageHandling } from '../../../components/error'

class EditAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '',}}

  componentDidMount = () => { this.setState({ address: this.props.profile_data.address }) }

  save = (props) => {
    let request = {
      url: `/api/v1/profiles/update/${this.props.auth.institute_id}/${this.props.auth.user_id}`,
      token: this.props.auth.student_auth,
      data: {address: this.state.address.substr(0, 119),},
    }
    api
      .putAuth(request)
      .then((data) => {this.props.setprofile_data({
          ...this.props.profile_data,
          address: this.state.address,})
        toast.success('Address Updated Succesfully')
        this.props.onCancel()
      })
      .catch((error) => {
        if (error && error.response && error.response.status == 403) {
          { this.props.dispatch({ type: 'LOGOUT', msg:error.response.data.message }) }
      } else if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
      } else { toast.error(ErrorMessageHandling(error));}
      })
  }
  render() {
    return (
      <>
        <ToastContainer style={{ display: 'none' }} />
        <div className='profile_page_edit_address_container'>
          <div className='profile_edit_address_inner_container'>
            <div className='cross_edit_adsress_profile' style={{ cursor: 'pointer' }}  >
              <img src={cross_icon} onClick={this.props.onCancel} />
            </div>
            <div className='profile_edit_address_text'>Edit Address</div>
            <div className='profile_edit_address_line'></div>
            <div className='profile_edit_address_textarea'>
              <center>
                <textarea  style={{outline:"0",color:"black"}}  value={this.state.address !== '-' ? this.state.address : ''}
                  onChange={(event) => this.setState({ address: event.target.value.substr(0, 119), }) }
                  type='text'  name='address'  placeholder='Enter your address here'
                ></textarea>
              </center>
            </div>
            <div className='profile_edit_address_save_div'>
              <button style={{ cursor: 'pointer' }} onClick={this.save}>  Save  </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(EditAddress)
