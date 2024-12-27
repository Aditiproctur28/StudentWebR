import React from 'react'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import Month from "./month"
import Year from './year'

class Callendar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {return (
      <>   
       {/* Month */}
        <div className='table_month_tt_inner_container'  style={this.props.view === 'year' ? { display: 'none' }: { display: 'block' }} >
          <Month setLoader={this.props.setLoader} monthData ={this.props.monthData}/>
        </div>

          {/* Year */}
        <div className='table_year_tt_inner_container' style={this.props.view === 'month'? { display: 'none' }: { display: 'block' } } >
              <Year setLoader={this.props.setLoader} YearData={this.props.YearData} forMonthSelected={this.props.forMonthSelected}/>
        </div>
      </>
    )
  }
}
export default Callendar