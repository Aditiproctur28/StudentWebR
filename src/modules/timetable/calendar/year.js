import React, { Component } from 'react'
import cal_icon from '../../../assets/timetable/calendar_icon11.png'
import { ErrorMessageHandling } from '../../../components/error'
import api from '../../../api/api'
import {toast } from 'react-toastify'
import { connect } from 'react-redux'
import ErrorBackdrop from '../../../components/error_backdrop'
import moment from 'moment'

class Year extends Component {
    constructor(props){
        super(props)
        const { start_date, end_date }=props.selectedAcadYear ?? {}
        const isInCurrentAcademicYear = props.selectedAcadYear ? moment(new Date()).isBetween(start_date, end_date) : true
        this.state={
        //Year
        schedule_per_month: {},
        show_present_month_bg_color: true,
        clicked_month: NaN,
        data_year: [],
        dynmic_year_of_year_cal: isInCurrentAcademicYear ? new Date().getFullYear() : new Date(start_date).getFullYear(),
        error_backdrop:false,
        }
    }

    each_month_digit_value= {January: 1,February: 2,March: 3,April: 4,May: 5,June: 6,July: 7,August: 8,September: 9,October: 10,November: 11,December: 12,}
    month_arr= [['January', 'February', 'March', 'April'],['May', 'June', 'July', 'August'],['September', 'October', 'November', 'December'],]
    complete_digit_array= {1: '01',2: '02',3: '03',4: '04',5: '05',6: '06',7: '07',8: '08',9: '09',10: '10',11: '11',12: '12',13: '13',
    14: '14',15: '15',16: '16',17: '17',18: '18',19: '19',20: '20',21: '21',22: '22',23: '23',24: '24',25: '25',26: '26',27: '27',28: '28',29: '29',30: '30',31: '31'}

    HandleErrorBackdrop = () =>
    {this.setState({error_backdrop:false})
      window.location = '/dashboard'}

    componentDidMount() { this.nowYear()}
    render() {
        return (
            <>
                <div>
                    <div className='skip_d_months_container_tt2'>
                        {this.state.error_backdrop && <ErrorBackdrop onCancel={this.HandleErrorBackdrop} /> }
                        <div className='skip_d_month_inner_container'>
                            <div className='skip_d_month_inner_container2'>
                            <div className='previous_n_next_month_tt2'>
                                <div style={{ cursor: 'pointer' }} onClick={() => { this.backYear()}} >
                                <b style={{ color: 'blue' }}>&lt;</b>{' '}
                                </div>
                            </div>
                            <div className='calendar_image_n_text_div_tt2'>
                                <div className='calendar_image_div_tt2'> <div className='tt2_image'><img src={cal_icon} /> </div>{' '} </div>
                                <div className='calendar_text_div_tt2'>
                                <div className='tt2_calender_text'>&nbsp; &nbsp;{' '}{this.state.dynmic_year_of_year_cal}{' '} </div>
                                </div>
                            </div>
                            <div className='previous_n_next_month_tt2'>
                                <div style={{ cursor: 'pointer', color: 'blue' }}  onClick={() => { this.nextYear() }} >
                                {' '} &gt; </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table>
                            {this.month_arr.map((quarters, index3) => (
                            <tr key={index3}>
                                {quarters.map((monthss, index4) => (
                                <td  key={index4} 
                                    style={this.state.show_month_present_bg_color &&Number(this.each_month_digit_value[monthss]) ===new Date().getMonth() + 1 && !( this.state.clicked_month === Number(this.each_month_digit_value[monthss]) )
                                            ? { background: '#CDDBFF' }: this.state.clicked_month === Number(this.each_month_digit_value[monthss])
                                                ? { background: 'rgb(220,220,220)' }: {} }
                                    onClick={() => { this.yearScheduleIfMonthSelected(Number(this.each_month_digit_value[monthss]))
                                    this.setState({ clicked_month: Number( this.each_month_digit_value[monthss] ), }) }} >
                                    <div className='month_container_year_tt'>
                                    <div className='month_name_parent_year_tt'> <div className='month_name_year_tt'>{monthss}</div></div>
                                    <div className='schedules_year_tt'>
                                        <center>
                                        <div className='schedule_count_tt_year'>
                                            {this.state.schedule_per_month[this.each_month_digit_value[monthss]]
                                            ? this.state.schedule_per_month[this.each_month_digit_value[monthss] ] : ''}
                                        </div>
                                        <div className='schedules_text_container_tt_year'>
                                            <div className='schedules_text_tt_year'>
                                            {this.state.schedule_per_month[this.each_month_digit_value[monthss]]
                                                ? Number(this.state.schedule_per_month[this.each_month_digit_value[monthss]]) > 1
                                                    ? 'Schedules'
                                                    : 'Schedule'
                                                : ' '}
                                            </div>
                                        </div>
                                        </center>
                                    </div>
                                    </div>
                                </td>
                                ))}
                            </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </>
        )
    }

      nowYear() {    //PRESENT YEAR
        var skipyear = this.state.dynmic_year_of_year_cal
        this.yearNowBackNextRepitiveLOCs(skipyear)
      }
      backYear() {    //SKIPPING to PREVIOUS YEAR
        var skipyear = this.state.dynmic_year_of_year_cal - 1
        if(new Date(this.props.selectedAcadYear?.start_date).getFullYear() > skipyear){
          return
        }
        this.yearNowBackNextRepitiveLOCs(skipyear)
        this.setState({ dynmic_year_of_year_cal: skipyear })
      }
      nextYear() {   //SKIPPING to NEXT YEARS
        var skipyear = this.state.dynmic_year_of_year_cal + 1
        if(new Date(this.props.selectedAcadYear?.end_date).getFullYear() < skipyear){
          return
        }
        this.yearNowBackNextRepitiveLOCs(skipyear)
        this.setState({ dynmic_year_of_year_cal: skipyear })
      }

      yearNowBackNextRepitiveLOCs(skipyear) { //YEAR REPITIVE LOCs FOR previous , now,next years
        if (Number(skipyear) === Number(new Date().getFullYear())) {
          this.setState({ show_month_present_bg_color: true })
        } else { this.setState({ show_month_present_bg_color: false }) }
        this.setState({ clicked_month: NaN })
        this.props.forMonthSelected(-1)
        let request = {
          url: '/api/v2/timeTable/year-count',
          token: this.props.student_auth,
          data: this.props.user_type !=99 ?
          {year: skipyear,
            institute_id: this.props.institute_id,
            student_id: this.props.student_id,
          }
          :
          {year: skipyear,
            institute_id: this.props.institute_id,
            user_id: this.props.user_id,
          } }
    
        api
          .postAuth(request)
          .then((data) => {this.setState({ schedule_per_month: data.data.result }) })
          .catch((error) => {
            this.props.setLoader(false)
            this.props.forMonthSelected(-1)
            if (error && error.response && error.response.status == 403) {
              { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
          } else if (error.response && error.response.data && error.response.data.message) {
          } else {toast.error(ErrorMessageHandling(error)); }
          })
      }

    yearScheduleIfMonthSelected(months) {  
        let dynamic_year_of_year_cal = this.state.dynmic_year_of_year_cal
        var month = months
        if (months < 10) {month = Number('0' + months.toString())}
        this.props.forMonthSelected(month)
        let monthh_length = new Date(dynamic_year_of_year_cal, month, 0).getDate()
        var full_first_date_require = dynamic_year_of_year_cal + '-' + this.complete_digit_array[month] + '-' +'01'
        var full_last_date_require = dynamic_year_of_year_cal + '-' + this.complete_digit_array[month] +'-' + monthh_length
        let request = {
          url: '/api/v2/timeTable/v3',
          token: this.props.student_auth,
          data: this.props.user_type !=99?
          {
            batch_id: '-1',
            course_id: '-1',
            enddate: full_last_date_require,
            institute_id: this.props.institute_id,
            isCourseStructureTimeTable:(this.props.inst_set_up.classes =="OFFLINE" ||  this.props.inst_set_up.classes=="HYBRID_BLENDED")?'Y':'N',
            isExamIncludedInTimeTable: (this.props.inst_set_up.exam == "OFFLINE" || this.props.inst_set_up.exam == "HYBRID_BLENDED") ?'Y':'N',
            is_included_online_class: (this.props.inst_set_up.classes =="ONLINE" ||  this.props.inst_set_up.classes=="HYBRID_BLENDED")?'Y':'N',
            is_included_online_exam: (this.props.inst_set_up.exam == "ONLINE" || this.props.inst_set_up.exam == "HYBRID_BLENDED") ?'Y':'N',
            master_course: '',
            standard_id: '-1',
            startdate: full_first_date_require,
            subject_id: '-1',
            teacher_id: '-1',
            student_id: this.props.student_id,
          }
          :
          {
            batch_id: '-1',
            course_id: '-1',
            enddate: full_last_date_require,
            institute_id: this.props.institute_id,
            isCourseStructureTimeTable: 'N',
            isExamIncludedInTimeTable: 'N',
            is_included_online_class: (this.props.inst_set_up.classes =="ONLINE" ||  this.props.inst_set_up.classes=="HYBRID_BLENDED")?'Y':'N',
            is_included_online_exam: (this.props.inst_set_up.exam == "ONLINE" || this.props.inst_set_up.exam == "HYBRID_BLENDED") ?'Y':'N',
            master_course: '',
            standard_id: '-1',
            startdate: full_first_date_require,
            subject_id: '-1',
            teacher_id: '-1',
            user_id: this.props.user_id,
          } }
        this.props.setLoader(true)
        api
          .postAuth(request)
          .then((data) => {
            var short2 = data.data.result.batchTimeTableList
            var ultimate_data2 = []
            for (var r in short2) {
              for (var s in short2[r]) {                
                ultimate_data2.push(short2[r][s])
              }}
            this.props.setLoader(false)
            this.setState({ data_year: ultimate_data2 })
            this.props.YearData(ultimate_data2, data.data.time, data)})
          .catch((error) => {
            this.props.setLoader(false)
            {this.setState({ data_year: [] })
              this.props.YearData([], '', {})
              this.props.forMonthSelected(-1)
        }
            if (error && error.response && error.response.status == 403) {
              { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
          } 
          else if(error.response && error.response.data && error.response.data.message && error.response.data.message =="Please assign course!"){
            
          }
          else if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message)
              setTimeout(() => {window.location = '/dashboard'}, 2000);
              this.setState({error_backdrop:true})
          } else {
              toast.error(ErrorMessageHandling(error));} })
      }
}
const mapStateToProps = (state) => {
  const { selectedAcadYear, student_auth, user_type,institute_id,student_id,user_id,inst_set_up }=state.auth
  return ({ selectedAcadYear, student_auth, user_type, institute_id, student_id, user_id, inst_set_up })
}

export default connect(mapStateToProps)(Year)