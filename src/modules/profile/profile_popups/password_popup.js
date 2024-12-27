import tala from '../../../assets/profile/tala_icon.png'
import cross_icon from '../../../assets/profile/cross_icon.png'
import { connect } from 'react-redux'
import React from 'react'
import Loader from '../../../components/loader'
import api from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessageHandling } from '../../../components/error'

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = { oldpassword: '',  newPass: '',  retypeNewPass: '', loading: false, newPass2: '', } }
  submit = (props) => {
    if ( this.state.newPass === this.state.retypeNewPass && this.state.newPass.length >= 6 && this.state.newPass.length<=10 &&  this.state.retypeNewPass.length >= 6 && this.state.retypeNewPass.length<=10 &&  this.state.oldpassword.length !== 0 ) {
      let request = {
        url: '/api/v1/changePwd',
        token: this.props.auth.student_auth,
        data: this.props.auth.parent_id
        ?
        { institute_id: this.props.auth.institute_id, username: this.props.auth.name, oldPassword: this.state.oldpassword,  newPassword: this.state.newPass, userid: this.props.auth.parent_id,  }
        :
        { institute_id: this.props.auth.institute_id, username: this.props.auth.name, oldPassword: this.state.oldpassword,  newPassword: this.state.newPass, userid: this.props.auth.user_id,  },
      }
      api
        .postAuth(request)
        .then((data) => {
          data: this.props.auth.parent_id?
          toast.success("Parent's Password changed successfully,Please Re-Login!")
          :
          toast.success("Password changed successfully,Please Re-Login!")

          setTimeout(() => {this.props.dispatch({ type: 'LOGOUT' })}, 2000)
        })
        .catch((error) => {
          if (error && error.response && error.response.status == 403) {
            { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
        } else if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message)
        } else {toast.error(ErrorMessageHandling(error));} 
        })
    } else {
      if (this.state.oldpassword === '') {toast.error('Enter existing password, First') }
       else if (this.state.oldpassword !== this.props.auth.password && this.state.oldpassword !== '' ) 
       {toast.error('Please enter correct existing password')} 
        else {
        if (this.state.retypeNewPass !== this.state.newPass && this.state.newPass.length > 5 && this.state.newPass.length<11 &&  this.state.retypeNewPass.length > 5 && this.state.retypeNewPass.length<11  ) 
          { toast.error("Entered new passwords doesn't match") }
        if ( this.state.newPass.length <= 5 || this.state.newPass.length>=11 || this.state.retypeNewPass.length <= 5 || this.state.retypeNewPass.length >=11 )
        { toast.error(' New passwords must contain 6-10 alphanumeric entries.')}
      }
    }
  }
  render() {
    return (
      <>
        <div className='change_your_password_container'>
          <ToastContainer style={{ display: 'none' }} />
          {this.state.loading && <Loader />}
          <div className='change_paswd_inner_container'>
            <div className='cross_change_pswd' style={{ cursor: 'pointer' }}>
              <img src={cross_icon} onClick={this.props.onCancel} />
            </div>
            <div className='tala_icon_div'>
              <div className='tala_icon'>  <center> <img src={tala}></img>  </center> </div>
            </div>
            <div className='change_your_pswd_text_div'> <center>Change your password</center>  </div>
            <div className='old_pswd_div'>
              <div className='old_pswd_div_text'>
                <center>
                  <form>
                    <input  style={{outline:"0",color:"black"}}  onChange={(event) => this.setState({ oldpassword: event.target.value }) }
                      type='text' name='Old Password' placeholder='Old Password' size='40' />
                  </form>
                </center>
              </div>
            </div>
            <div className='new_pswd_div'>
              <div className='new_pswd_text'>
                <center>
                  <form>
                    <input  style={{outline:"0",color:"black"}}  onChange={(event) => this.setState({ newPass: event.target.value })  }
                      name='New Password'  placeholder='New Password' size='40' />
                  </form>
                </center>
              </div>
            </div>
            <div className='retype_pswd_div'>
              <div className='retype_pswd_text'>
                <center>
                  <form>
                    <input  style={{outline:"0",color:"black"}} onChange={(event) =>  this.setState({ retypeNewPass: event.target.value }) }
                      name='Retype New Password'  placeholder='Retype New Password'  size='40' ></input>
                  </form>
                </center>
              </div>
            </div>
            <div className='save_pswd_div'>
              <div className='change_save_btn'>
                <center>  <button onClick={this.submit} style={{ cursor: 'pointer' }}> Submit </button> </center>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(ChangePassword)
