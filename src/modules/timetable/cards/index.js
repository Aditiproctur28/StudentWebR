import SchClass from './offline_classroom'
import SchOfflineExam from './offline_exam'
import NoSchedule from '../no_schedule_screen'
import SchLiveClass from './live_class_tt'
import SchOnlineExam from './online_exam'
import { connect } from 'react-redux'
import filterDemoAccounts from '../../../utils/temp_demo_accounts'

function blueDateNotifier(date) 
{var DaysIntToWord = {0: 'Sun',1: 'Mon',2: 'Tue',3: 'Wed',4: 'Thu',5: 'Fri',6: 'Sat',}
  return (<div style={{ display: 'flex' }} className='callendar_next_first_div'>
      <div className='upper_date_notifier_blue' style={{padding:"2px",height:"20px"}}>
        <center>
            <div style={{display:"flex",width:"fit-content"}}>
              <div  style={{borderRight:"1px solid white",height:"22px",display:"flex",alignItems:"center"}}>
                {DaysIntToWord[new Date( date.split('-')[0], Number(date.split('-')[1]) - 1, date.split('-')[2] ).getDay()]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
              <div  style={{height:"22px",display:"flex",alignItems:"center"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date.split('-').reverse().join('-')}</div>
            </div>
        </center>
      </div>
    </div> )
}

function blueDateNotiIfAnyDateClicked(props)
{
  var complete_digit_array= {1: '01',2: '02',3: '03',4: '04',5: '05',6: '06',7: '07',8: '08',9: '09'}
  return(
    <div style= {props.clicked_date !== -1 && props.view === 'month' ? { display: 'flex' } : { display: 'none' } }
    className='callendar_next_first_div' >
    <div className='upper_date_notifier_blue' style={{padding:"2px",height:"20px"}}>
        <center>
            <div style={{display:"flex",width:"fit-content"}}>
            <div style={{borderRight:"1px solid white",height:"22px",display:"flex",alignItems:"center"}}>{props.clicked_day_in_string} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
            <div style={{height:"22px",display:"flex",alignItems:"center"}}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            {(props.clicked_date && (props.clicked_date<10?complete_digit_array[props.clicked_date]:props.clicked_date) ) + '-' + ( ( props.selected_month + 1)<10?complete_digit_array[Number(props.selected_month + 1)]:  (props.selected_month + 1))+  '-' + props.selected_year}
            </div>
          </div>
        </center>
    </div>
  </div>
  )
}

function Cards(props) {
  var date_store = 0
  var date_store_for_year = 0
  let demo_account=filterDemoAccounts(props.auth.institute_id)
  return (
    <>
      <div>
          {blueDateNotiIfAnyDateClicked(props)}
          {props.view === 'month' //////////////////////////////////////////////////FOR MONTH CAL
          ? 
            (props.val.sch_response_data.map((data, index) => 
              (<div>{props.clicked_date === -1 && data.date && date_store != data.date  && blueDateNotifier(data.date)}
                <div style={{ display: 'none' }}>
                  {data.date && date_store !== data.date ? (date_store = data.date)  : ''}
                </div>
                {data.class_type === 'Class' || data.class_type === 'Online Class' 
                  ? 
                  ((data.class_type === 'Class')
                    ? 
                      (<div> <SchClass loading={props.loading} setLoader={props.setLoader} val={props.val}  data={data} /> </div> ) 
                    :<SchLiveClass  loading={props.loading} setLoader={props.setLoader} data={data} val={props.val} api_response={props.val.month_api_response_data} timestring={props.timestring} data2={props.view} view_download_links={data.download_links}/>) 
                  :
                    data.class_type === 'Online Exam' 
                    ? 
                      (<div><SchOnlineExam val={props.val} data={data} timestring={props.timestring} demo_account={demo_account} /></div> ) 
                    :
                      (<div> <SchOfflineExam val={props.val} data={data} /></div> )
                }
                </div>
              ))) 
              
          : ////////////////////////////////////////////////////////////FOR YRAR CAL
              props.clicked_month_from_year_cal > -1 && props.val_y.sch_response_data_year && props.val_y.sch_response_data_year.length && props.val_y.sch_response_data_year.length > 0 
              ? 
                (props.val_y.sch_response_data_year.map((data, index) => (
                  <div>{data.date && date_store_for_year != data.date && blueDateNotifier(data.date)}
                    <div style={{ display: 'none' }}>
                      {data.date && date_store_for_year !== data.date ? (date_store_for_year = data.date) : ''}
                    </div>
                    {
                      data.class_type === 'Class' || data.class_type === 'Online Class' 
                      ? ((data.class_type === 'Class' )  
                        ? 
                        (<SchClass loading={props.loading} setLoader={props.setLoader} val={props.val_y} data={data} value_schclass={props.val_y.sch_response_data_year} />) 
                        :<SchLiveClass loading={props.loading} setLoader={props.setLoader} data={data} val={props.val_y} api_response={props.val_y.month_api_response_data_Y} timestring={props.timestring} data2={props.view} view_download_links={data.download_links}/> )                      
                      :
                        data.class_type === 'Online Exam' 
                        ? (<div><SchOnlineExam val={props.val_y} data={data}  timestring={props.timestring} demo_account={demo_account} /> </div> ) 
                        : (<SchOfflineExam val={props.val_y} data={data} />)
                    }
                  </div>
                ))) 
            : (<NoSchedule />)}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Cards)