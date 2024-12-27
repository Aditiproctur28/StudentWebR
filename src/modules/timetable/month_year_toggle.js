function MonthYear(props) {
  return (
    <div className='check_course_time'>
      <div className='check_course_inner_padding'>
        <div className='check_subdiv_left'>
          <div className='month_year' >
            <button className='check_month' style={props.valooo === "month" ?
              { color: '#fff', background: '#1d6ce6', cursor: "pointer" }
              :
              { cursor: "pointer" }}
              onClick={() => props.setvw('month')} >Month</button>


            <button className='check_year' style={props.valooo === "year" ?
              { color: '#fff', background: '#1d6ce6', cursor: "pointer" }
              :
              { cursor: "pointer" }}
              onClick={() => props.setvw('year')}>This Year</button>
          </div>
        </div>
        {props.is_institute_type_school && <div className='label_Right'>
          <div style={{marginTop:'5px'}} className='holiday_label'></div>
          <p>Holiday</p>
        </div>}
      </div>
    </div>
  )
}

export default MonthYear