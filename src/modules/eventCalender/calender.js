import * as React from 'react'
import './calender.css'
import { connect } from 'react-redux'
class Calender extends React.Component {

    months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];
    _onPress = (item) => {
        this.setState(() => {
            if (!item.match && item != -1) {
                this.state.activeDate.setDate(item);
                return this.state;
            }
        });
    };
    changeMonth = (n) => {
        const {start_date, end_date} = this.props.selectedAcadYear
        const newDate = new Date(this.state.activeDate);
        newDate.setMonth(newDate.getMonth() + n);
        if (newDate >= new Date(start_date) && newDate <= new Date(end_date)) {
            this.setState(() => {
                this.state.activeDate.setMonth(
                    this.state.activeDate.getMonth() + n
                )
                return {
                    ...this.state,
                    isToday: false,
                }
            }, () => this.props.fetchCalendarData(this.state.activeDate.getMonth(), this.state.activeDate.getFullYear()));
        }
    }
    weekDays = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];
    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    state = {
        activeDate: new Date(this.props.yearinit,this.props.monthinit),
        isToday: false
    }
    generateMatrix() {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;
        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();
        var firstDay = new Date(year, month, 1).getDay() || 7; // In case of Sunday it returns 0 as per our logic it should be 7
        var maxDays = this.nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }
        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 1; col < 8; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }
        if (matrix[6].every(cell => cell === -1)) {
            matrix.pop();
        }
        return matrix;
    }

    getDateItem = (item) => {
        let date = this.state.activeDate.getFullYear() + "-" + this.appentZero(this.state.activeDate.getMonth() + 1) + "-" + this.appentZero(item)
        this.props.setdate(date)
        return date

    }

    charLimit = (value) => {
        if (value?.length > 30) {
            return value.substr(0, 30) + '...'
        }
        return value
    }

    appentZero = (item) => {
        if (item < 10) {
            return '0' + item
        }
        return item.toString()
    }



    render() {
        var matrix = this.generateMatrix();
        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                let dateItem = this.getDateItem(item)
                let event1 = this.props.calData[dateItem]?.filter((item) => item.event_type == 1)
                let event2 = this.props.calData[dateItem]?.filter((item) => item.event_type == 2)
                let eventAndHoliDayCount = this.props.calData[dateItem]?.filter(item => item.event_type != 3)?.length ?? 0
                return (
                    <div>
                        {rowIndex == 0 ?
                            <div>
                                <div className='mini_container-header'><p style={{ textAlign: 'center', fontFamily: 'Open Sans', fontSize: '12px', color: '#334D6E', paddingTop: '7px' }}>{item != -1 ? item : ''}</p></div>
                            </div>
                            :
                            <div className='mini_container'>
                                <div style={this.dateAllign}>
                                    {this.state.activeDate.getMonth() == new Date().getMonth() ?
                                        <div style={{
                                            color: (this.state.isToday && item == new Date().getDate()) ? '#334D6E' : '#334D6E',
                                            background: (this.state.isToday && item == new Date().getDate()) ? '#EAF7FF' : '',
                                            border: (this.state.isToday && item == new Date().getDate()) ? '1px solid #0097F9' : '',
                                            fontWeight: 'bold', margin: 3, padding: 1, borderRadius: 3, fontSize: 11
                                        }}>{item != -1 ? item : ''}</div> :
                                        <div style={{ color: '#334D6E', fontWeight: 'bold', margin: 3, padding: 1, borderRadius: 3,fontSize: 11 }}>{item != -1 ? item : ''}</div>
                                    }
                                    {Object.keys(this.props.calData).map((item) => parseInt(item.split('-')[2])).includes(item) ?
                                        this.props.calData[dateItem]?.filter((item) => item.event_type == 3)?.slice(0, 1).map(() => {
                                            return (
                                                <div className='weekoff'>
                                                    <div className='weekoffStyle'>Weekly Off</div>
                                                </div>)
                                        }) : <></>
                                    }
                                </div>
                                <div style={{ height: '62%' }}>

                                    {Object.keys(this.props.calData).map((item) => parseInt(item.split('-')[2])).includes(item) ?
                                        <button className='buttonEvent' onClick={() => { this.props.setDataDateWise(this.props.calData[dateItem]?.filter((item) => item.event_type != 3)); this.props.setdateindex(item); this.props.closeisopenPopup(true); this.props.setweeklyoff(this.props.calData[dateItem]) }} >
                                            {(event2?.length == 0) ? event1?.slice(0, 2).map((item) => {
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1px' }}>
                                                        <div style={{ width: '2%', backgroundColor: '#DBFFE7', borderBottomLeftRadius: '3px', borderTopLeftRadius: '3px' }}>
                                                        </div>
                                                        <div className='holiday' >
                                                            <div className='holidayTextStyle'>{this.charLimit(item.title_name)}</div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : event1?.slice(0, 1).map((item) => {
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1px' }}>
                                                        <div style={{ width: '2%', backgroundColor: '#DBFFE7', borderBottomLeftRadius: '3px', borderTopLeftRadius: '3px' }}>
                                                        </div>
                                                        <div className='holiday' >
                                                            <div className='holidayTextStyle'>{this.charLimit(item.title_name)}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                            {(event1?.length == 0) ? event2?.slice(0, 2).map((item) => {
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1px' }}>
                                                        <div style={{ border: '1px black', width: '2%', backgroundColor: '#FFE5D7', borderBottomLeftRadius: '3px', borderTopLeftRadius: '3px' }}>
                                                        </div>
                                                        <div className='holidayEvent' >
                                                            <div className='holidayTextStyle'>{this.charLimit(item.title_name)}</div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : event2?.slice(0, 1).map((item) => {
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1px' }}>
                                                        <div style={{ border: '1px black', width: '2%', backgroundColor: '#FFE5D7', borderBottomLeftRadius: '3px', borderTopLeftRadius: '3px' }}>
                                                        </div>
                                                        <div className='holidayEvent' >
                                                            <div className='holidayTextStyle'>{this.charLimit(item.title_name)}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                            {this.props.calData[dateItem]?.filter((item) => item.event_type != 3)?.length > 2 &&
                                                <div>
                                                    <div style={{ color: '#0097F9', fontSize: '5px', }}>{eventAndHoliDayCount - 2} more</div>
                                                </div>
                                            }
                                        </button> : <></>}
                                </div>
                            </div>
                        }
                    </div>
                );
            });
            return (
                <div className='table'>
                    {rowItems}
                </div>
            );
        });
        return (
            <div className='main_container'>
                <div className='calender_container'>
                    <div className='calender_container_header'>
                        <div style={this.CalendarData}>
                            <div style={this.headerCalender}>
                                <div className='monthSelectDiv'>
                                    <div className='monthDateHead'>
                                        {this.months[this.state.activeDate.getMonth()]} &nbsp;
                                        {this.state.activeDate.getFullYear()}
                                    </div>
                                    <div className='changeMonthSelect'>
                                        <button className='event-button' style={this.monthLeft} onClick={() => { this.changeMonth(-1) }}>{`<`}</button>
                                        <button className='event-button' style={this.monthRight} onClick={() => { this.changeMonth(+1) }}>{`>`}</button>
                                        {this.props.isInCurrentAcademicYear && <button className='event-button' style={this.sel_today} onClick={() => {
                                            this.setState(() => {
                                                this.state.activeDate.setMonth(
                                                    new Date().getMonth())
                                                this.state.activeDate.setFullYear(
                                                    new Date().getFullYear())
                                                return {
                                                    ...this.state,
                                                    isToday: true,
                                                }
                                            }, () => this.props.fetchCalendarData(this.state.activeDate.getMonth(), this.state.activeDate.getFullYear()))
                                        }}>Today</button>}
                                    </div>
                                </div>
                                <div className='eventChooseDiv'>
                                    <div className='eventChoose'>
                                        <button className='check_event'
                                            style={this.props.status === "My Event" ? this.selectedEvent : this.allSelectedEvent}
                                            onClick={() => { this.props.setstatus('My Event'); this.props.setmonthinit(this.state.activeDate.getMonth()); this.props.setyearinit(this.state.activeDate.getFullYear()); }}>My Events</button>
                                        <button className='check_all_event' style={this.props.status === "All Event" ? this.selectedEvent : this.allSelectedEvent}
                                            onClick={() => { this.props.setstatus("All Event"); this.props.setmonthinit(this.state.activeDate.getMonth()); this.props.setyearinit(this.state.activeDate.getFullYear()); }}>All Events</button>
                                    </div>
                                </div>
                            </div>
                            <div className='scrollCal' style={this.rowColumn}>
                                {rows}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    monthLeft = { color: '#9D9D9D', cursor: "pointer", fontWeight: 'bold', width: '25px', height: '25px', borderColor: '#E3E3E3', border: '1px solid #E3E3E3', borderRadius: '2px', };
    monthRight = { color: '#9D9D9D', cursor: "pointer", fontWeight: 'bold', width: '25px', height: '25px', borderColor: '#E3E3E3', border: '1px solid #E3E3E3', borderRadius: '2px', };
    sel_today = { color: '#334D6E', cursor: "pointer", fontWeight: 'bold', width: '80px', height: '25px', borderColor: '#E3E3E3', border: '1px solid #E3E3E3', borderRadius: '2px', };
    headerCalender = { height: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '15px' };
    dateAllign = { display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', height: '38%' };
    selectedEvent = { color: '#fff', background: '#1d6ce6', cursor: "pointer", fontWeight: '500', fontFamily: 'Open Sans' };
    allSelectedEvent = { color: '#1954E7', cursor: "pointer", background: '#EAF0FF', fontWeight: '500', fontFamily: 'Open Sans' };
    rowColumn = { height: '85%' };
    CalendarData = { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' };
}
const mapStateToProps = (state) => ({ selectedAcadYear: state.auth.selectedAcadYear })
export default connect(mapStateToProps)(Calender)
