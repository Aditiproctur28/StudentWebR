import cross_icon from '../../../assets/profile/cross_icon.png'
import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import api from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import profile from '../../../components/header/profile'
import { ErrorMessageHandling } from '../../../components/error'

class EditDOB extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      d_o_b: this.props.profile_data.dob,
      days: [],
      month: [],
      year: [],
      year_value: '',
      month_value: '',
      days_value: '',
      thirtyoneCheck: [4, 6, 9, 11],
      complete_digit_array: {0:'00',1: '01',2: '02', 3: '03',4: '04',5: '05', 6: '06',7: '07',8: '08', 9: '09', 10: '10',11: '11', 12: '12', 13: '13',14: '14',15: '15',16: '16', 17: '17', 18: '18', 19: '19',20: '20', 21: '21',22: '22', 23: '23',24: '24', 25: '25',26: '26',27: '27',28: '28', 29: '29', 30: '30', 31: '31', },
    }
  }

  componentDidMount = () => { this.setCalendar() }

  daysInMonth(month, year) {return new Date(year, month, 0).getDate() }

  setCalendar = () => {
    let today = new Date()
    let cyear = today.getFullYear()
    let fyear = 1970
    let years = cyear - fyear + 1
    let monthdays
    if (this.state.d_o_b.length === 0) { monthdays = 31 }
     else { monthdays = this.daysInMonth( Number(this.state.d_o_b.split('-')[2]), Number(this.state.d_o_b.split('-')[1]) )  }
    this.setState({ year: Array(years).fill(true) })
  }

  save = (dobb) => {
    var dobbb = ''
    if (dobb.length === 10) {dobbb = dobb} 
    else { var dobbb = ''
      if (this.props.profile_data.dob !== '-') {
        if (this.state.year_value && !this.state.month_value && !this.state.days_value ) {
          dobbb = dobb.substr(0, 4) + '-' + this.props.profile_data.dob.split('-')[1] + '-' +this.props.profile_data.dob.split('-')[0]
        }
        if (!this.state.year_value &&this.state.month_value &&!this.state.days_value) {
          dobbb =this.props.profile_data.dob.split('-')[2] + '-' + dobb.substr(0, 2) + '-' +this.props.profile_data.dob.split('-')[0]
        }
        if ( !this.state.year_value &&  !this.state.month_value && this.state.days_value ) 
        { dobbb =this.props.profile_data.dob.split('-')[2] + '-' + this.props.profile_data.dob.split('-')[1] + '-' +dobb.substr(0) }
        if ( this.state.year_value &&  this.state.month_value &&!this.state.days_value) 
        {dobbb = dobb.split('-')[0] + '-' + dobb.split('-')[1] +'-' +this.props.profile_data.dob.split('-')[0]}
        if ( this.state.year_value && !this.state.month_value &&  this.state.days_value )
         {dobbb = dobb.split('-')[0] +'-' + '-' +this.props.profile_data.dob.split('-')[1] +'-' +dobb.split('-')[1]}
        if ( !this.state.year_value && this.state.month_value && this.state.days_value ) 
        { dobbb =this.props.profile_data.dob.split('-')[2] + '-' + dobb.split('-')[0] + '-' + dobb.split('-')[1] }
        if ( !this.state.year_value &&!this.state.month_value &&!this.state.days_value )
         { dobbb = this.props.profile_data.dob.split('-')[2] + '-' +this.props.profile_data.dob.split('-')[1] +'-' +this.props.profile_data.dob.split('-')[0] }
      }
    }
    var mssg = ''
    if (dobbb !== '') {
      var leap_dob = dobbb
      var simple_dob = dobbb
      if (Number(leap_dob.split('-')[0]) % 4 === 0 && Number(leap_dob.split('-')[1]) === 2 && Number(leap_dob.split('-')[2]) >= 30 ) 
      {dobbb = '';
       var mssg = 'Selected year Have 29 Days In February'}
      if (Number(simple_dob.split('-')[0]) % 4 !== 0 && Number(simple_dob.split('-')[1]) === 2 &&  Number(simple_dob.split('-')[2]) >= 29) 
      {dobbb = ''
        var mssg = 'Selected year Have 28 Days In February'
      }
      for (var r in this.state.thirtyoneCheck) 
      {if (Number(dobbb.split('-')[1]) === Number(this.state.thirtyoneCheck[r]) && Number(dobbb.split('-')[2]) === 31) 
        {dobbb = ''
          var mssg = 'Month Selected Have Only 30 Days'}
      }

      if (Number(dobbb.split('-')[0]) === new Date().getFullYear() && Number(dobbb.split('-')[1]) - 1 >= new Date().getMonth() && Number(dobbb.split('-')[2]) > new Date().getDate()) 
      {
        dobbb = ''
        var mssg = "Selected Date Can't Be Greater Than Current Date"
      }
    }
    let request = {
      url: `/api/v1/profiles/update/${this.props.auth.institute_id}/${this.props.auth.user_id}`,
      token: this.props.auth.student_auth,
      data: {dob: dobbb,},
    }
    api
      .putAuth(request)
      .then((data) => {
        this.props.setprofile_data({...this.props.profile_data, dob:dobbb !== '' ? dobbb.split('-')[2] +'-' + dobbb.split('-')[1] +'-' + dobbb.split('-')[0]: '-',
        })
        if (dobbb === '' && mssg == '') {
          toast.error('Something Went Wrong,Please Try Again')
        } else if (mssg !== '') {
          toast.error(mssg)
        } else {toast.success('DOB Updated Successfully')}
      })
      .catch((error) => {
        if (error && error.response && error.response.status == 403) {
          { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
      } else if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
      } else {toast.error(ErrorMessageHandling(error));}
      })
  }

  render() {
    return (
      <>
        <ToastContainer style={{ display: 'none' }} />
        <div className='profile_page_edit_dob_container'>
          <div className='profile_edit_dob_inner_container'>
            <div className='cross_dob_popup_profile' style={{ cursor: 'pointer' }}  >
              <img src={cross_icon} onClick={this.props.onCancel} />
            </div>
            <div className='profile_edit_dob_text'>Enter Date of Birth</div>
            <div className='profile_edit_dob_line'></div>
            <div className='profile_edit_dob'>
              <select  style={{outline:"0",color:"black"}}  value={ this.state.days_value !== '00' ? this.state.days_value : 'DD' }
                onChange={(event) => { this.setState({ days_value: event.target.value })  }} >
                {this.props.profile_data.dob === '-'
                ? ( <option>Select Day</option> ) 
                :
                 (<option>{this.props.profile_data.dob.substr(0, 2)}</option>)}
                <option value='01'>01</option>
                <option value='02'>02</option>
                <option value='03'>03</option>
                <option value='04'>04</option>
                <option value='05'>05</option>
                <option value='06'>06</option>
                <option value='07'>07</option>
                <option value='08'>08</option>
                <option value='09'>09</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
                <option value='13'>13</option>
                <option value='14'>14</option>
                <option value='15'>15</option>
                <option value='16'>16</option>
                <option value='17'>17</option>
                <option value='18'>18</option>
                <option value='19'>19</option>
                <option value='20'>20</option>
                <option value='21'>21</option>
                <option value='22'>22</option>
                <option value='23'>23</option>
                <option value='24'>24</option>
                <option value='25'>25</option>
                <option value='26'>26</option>
                <option value='27'>27</option>
                <option value='28'>28</option>
                <option value='29'>29</option>
                <option value='30'>30</option>
                <option value='31'>31</option>
              </select>

              <select  style={{outline:"0",color:"black"}} value={ this.state.month_value !== '00' ? this.state.month_value : 'MM'  }
                onChange={(event) => {  this.setState({ month_value: event.target.value }) }}  >
                {this.props.profile_data.dob === '-' 
                ? (<option>Select Month</option> ) 
                : (<option>{this.props.profile_data.dob.split('-')[1]}</option> )}
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </select>

              <select  style={{outline:"0",color:"black"}}  value={this.state.year_value !== '1970' ? this.state.year_value : 'YYYY'}
                onChange={(event) => {this.setState({ year_value: event.target.value })}} >
                {this.props.profile_data.dob === '-' ? (<option>Select Year</option>) 
                : 
                ( <option>{this.props.profile_data.dob.split('-')[2]}</option>)}
                {this.state.year.map((el, i) => (<option value={i}>{1970 + i}</option>))}
              </select>
            </div>
            <div className='profile_edit_dob_save_div'>
              <button
                style={{ cursor: 'pointer' }}
                onClick={() => {setTimeout(() => {}, 50)
                  this.save((this.state.year_value ? Number(this.state.year_value) + 1970 + '-' : '') +
                      (this.state.month_value? this.state.complete_digit_array[ Number(this.state.month_value) ] + '-': '') + (this.state.days_value ? this.state.days_value : '') )
                  this.props.onCancel()  }} >
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(EditDOB)