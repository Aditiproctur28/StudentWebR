import React from "react";
import './stylesheet.css';
import cross from "../../assets/event/cross.png";

const EventPopup = (props) => {

    let date = props.date.toString().slice(0, 7) + "-" + props.dateindex;

    const handleDate = (value) => {
        let date = ""
        let date_arr = []
        let month_set = { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'June', 6: 'July', 7: 'Aug', 8: 'Sept', 9: 'Oct', 10: 'Nov', 11: 'Dec', }
        let month = ""
        if (value) {

            if (value.toString()) {
                date_arr = value.toString().split("-").reverse()
                let temp = value.toString().split("-")[1] ? value.toString().split("-")[1] * 1 : 0
                month = month_set[temp - 1]

                date = date_arr[0] + " " + month
            }
            return date
        }
        return ""
    }

    const DayGenertor = (value) => {
        if (value) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = new Date(value);
            var dayName = days[d.getDay()];
            return dayName
        }
        return ""
    }

    const charLimit = (value) => {
        if (value.length > 30) {
            return value.substr(0, 30) + '...'
        }
        return value
    }

    return (
        <>
            {props.dataDateWise.length && <div className="event-popup-box">
                <div className="eventData-box">
                    <div className="eventData-cointainer">
                        <div style={{ height: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px' }}>
                            <div>
                                <p style={{ marginLeft: 10, color: '#334D6E', fontWeight: 'bold', fontSize: '22px' }}>{handleDate(date)}</p>
                                <p style={{ marginLeft: 10, color: '#334D6E', }}>{DayGenertor(date)}</p>
                            </div>
                            <div> </div>
                            {props?.weeklyoff[0]?.dayOfWeekList.length ? <div>
                                <div style={{ backgroundColor: '#F2F2F2', padding: 5, justifyContent: 'center', alignItems: 'center', margin: 5, height: 15, borderRadius: 5, marginTop: 8, marginLeft: '75px ' }}>
                                    <p style={{ color: '#334D6E', fontSize: 12 }}>{'Weekly Off'}</p>
                                </div>
                            </div> : <></>}
                            <div> </div>
                            <div>
                                <img src={cross} style={{ height: '25px', width: '25px', cursor: "pointer" }} onClick={() => props.closeisopenPopup(false)}></img>
                            </div>
                        </div>
                        <div className="eventData_list">
                            {props.dataDateWise?.map((item) => {
                                return (
                                    <div onClick={() => { props.closeisopenPopup(false); props.setmorePopup(true); props.setitemdata(item) }} style={{ display: 'flex', flexDirection: 'row', margin: '5px', cursor: 'pointer',height:'20px'}}>
                                        {(item.event_type == 1) && <>
                                            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#DBFFE7", width: "2%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                            </div>
                                            <div style={{ padding: '5px', width: '98%', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: "#17CC55", borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                                                <p style={{ color: '#FFFFFF',fontSize:"10px", }} title={item.title_name}>{charLimit(item.title_name)}</p>
                                            </div>  </>}
                                        {(item.event_type == 2) && <>
                                            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#FFEED3", width: "2%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                            </div>
                                            <div style={{  padding: '5px', width: '98%', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: "#FFA412", borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                                                <p style={{ color: '#FFFFFF',fontSize:"10px" }} title={item.title_name}>{charLimit(item.title_name)}</p>
                                            </div>  </>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}
export default EventPopup;