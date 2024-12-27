import Header from '../../components/header/index'
import { useState, useEffect } from 'react'
import Callendar from './calendar'
import { connect } from 'react-redux'
import Cards from './cards'
import MonthYearToggle from './month_year_toggle'
import NoSchedule from './no_schedule_screen'
import Loader from '../../components/loader'
import { ToastContainer } from 'react-toastify'

function Timetable2(props) {
  const [sch_response_data, setResposeData] = useState([])
  const[month_api_response_data,setdata]=useState({})
  const[clicked_date,setClickDate]=useState(-1)
  const [clicked_day_in_string, setDayString] = useState(-1)
  const[timestring,setTimeString]=useState("")
  const [selected_month, setMonth] = useState(-1)
  const [selected_year, setYear] = useState(-1)
  const [loading,setLoader]=useState(false)
  const [sch_response_data_year, setResposeDataY] = useState([])
  const[month_api_response_data_Y,setdataY]=useState({})
  const[clicked_month_from_year_cal,setClickMonth]=useState(-1)
  const[timestringY,setTimeStringY]=useState("")
  const [view, setView] = useState("month")

  function HandleMonth(child_sch_data,click_date,click_day,curr_month,curr_year,timestr,data){
    setdata(data)
    setResposeData(child_sch_data);
    setClickDate(click_date);
    setDayString(click_day);
    setMonth(curr_month);
    setYear(curr_year);
    setTimeString(timestr);
  }
 
  function HandleYear(child_sch_data,timestrY,dataY)
  {
    setdataY(dataY)
    setResposeDataY(child_sch_data);
    setTimeStringY(timestrY);
  }

 function IfMonthSelectedInYearCalendar(clicked_monthh)
  {
   setClickMonth(clicked_monthh);
  }
  function Fun(num)
  {
      return num.category
  }
  return (
    <>
      <ToastContainer/>
      {loading && <Loader/>}
      <Header />
      <div className='entire_time_table_container'>
          <div style={{display:"none"}}>
              {(clicked_month_from_year_cal === -1 && sch_response_data_year.length && sch_response_data_year.length>0) &&  setResposeDataY([])}
          </div>

          <MonthYearToggle valooo={view} setvw={setView}  is_institute_type_school={props.is_institute_type_school}/>

          <div className='course_detail_container'>
              <div className='tt_inner_container'></div>
              <div className='tt_callendar'>
                  <div className='inner_container_tt_calendar'>
                      <Callendar view={view} monthData={HandleMonth} forMonthSelected={IfMonthSelectedInYearCalendar} YearData={HandleYear} loading={loading} setLoader={setLoader} />              
                  </div>
              </div>

              { view==="month"
                ?
                    <div className='next_to_callendar'>
                      <div className='inner_container_next_to_callendar'>
                        {     sch_response_data.length>0
                          ?
                              <Cards clicked_date={clicked_date} view={view} clicked_day_in_string={clicked_day_in_string} selected_month={selected_month} selected_year={selected_year} timestring={timestring}  loading={loading} setLoader={setLoader}
                              val={{ month_api_response_data,sch_response_data}} /> 
                          :   
                              <NoSchedule view={view} />               
                        }
                      </div>
                  </div>
                :
                    <div className='next_to_callendar'>
                      <div className='inner_container_next_to_callendar'>
                        {
                            sch_response_data_year.length>0
                          ?
                              <Cards clicked_date={clicked_date} clicked_day_in_string={clicked_day_in_string} view={view}  selected_month={selected_month} selected_year={selected_year} timestring={timestringY}  loading={loading} setLoader={setLoader} clicked_month_from_year_cal={clicked_month_from_year_cal}
                              val_y={{month_api_response_data_Y,sch_response_data_year}} /> 
                          :   
                              <NoSchedule view={view} />  
                        }
                      </div>
                  </div>
                }
          </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({ 
  is_institute_type_school: state.auth.is_institute_type_school,
  selectedAcadYear: state.auth.selectedAcadYear,

 })
export default connect(mapStateToProps)(Timetable2)