import React from "react";
import './stylesheet.css';
import cross from "../../assets/event/crossss.png";
import imgCal from "../../assets/event/imgCal.png";
import department from "../../assets/event/department.png";
import calender from "../../assets/event/calender.png";
import standard from "../../assets/event/standard.png";

const MorePopup = (props) => {

    let url = props.itemdata.document_url ? props.itemdata.document_url : imgCal;

    const handleDate = (value) => {
        if (value) {
            var a = value;
            var dateParts = a.split(",")[1].split("-"); // Splitting the string by comma and hyphen into an array
            var sortedDate = dateParts[0] + " " + dateParts[1]; // Concatenating the second and third array elements with a hyphen

            return sortedDate;  // Output: 10-Jul
        }
        return "";
    }

    const charLimit = (value) => {
        if (value.length > 30) {
            return value.substr(0, 30) + '...'
        }
        return value
    }

    const eventType = {
        1: "Academic",
        2: "Sports",
        3: "Cultural",
        4: "Miscellaneous",
    };

    return (
        <>
            <div className="event-popup-box">
                <div className="morePopup-box">
                    <div className="eventData-cointainer">
                        <div style={{ height: '15%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px' }}>
                            {props.itemdata.event_type == 2 ? <div style={{ width: '100px', height: '25px', borderRadius: '3px' }}>
                                <p style={{ color: '#1A2334', marginTop: '2px', background: '#F2F2F2', }}>{eventType[props.itemdata.holiday_type]}</p>
                            </div> : <div style={{ width: '100px', height: '25px', borderRadius: '3px' }}></div>}
                            <div>
                                <img src={cross} style={{ height: '15px', width: '15px', cursor: "pointer" }} onClick={() => props.setmorePopup(false)}></img>
                            </div>
                        </div>
                        <div style={{ height: '35%', display: 'flex', flexDirection: 'row', padding: '10px', paddingTop: '0px' }}>
                            {props.itemdata.event_type == 2 && <div>
                                <img style={{ height: '50px', width: '50px', borderRadius: '5px' }} src={url}></img>
                            </div>}
                            <div style={{ padding: '5px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', paddingTop: '0px' }}>
                                <span title={props.itemdata.title_name} style={{ color: '#1A2334', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
                                    {charLimit(props.itemdata.title_name)}
                                </span>
                                <span style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}>
                                    <img style={{ height: '20px', width: '20px', alignSelf: 'centers' }} src={calender}></img>
                                    <p style={{ marginTop: '2px', marginLeft: '5px' }}>{handleDate(props.itemdata.event_start_Date)}</p>
                                    {(props.itemdata.event_start_Date != props.itemdata.event_end_date) && <><p style={{ marginTop: '2px', marginLeft: '5px' }}>-</p>
                                        <p style={{ marginTop: '2px', marginLeft: '5px' }}>{handleDate(props.itemdata.event_end_date)}</p></>}
                                    {props.itemdata.is_all_day_event ? <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '5px' }}>
                                        <p>|</p>
                                        <p style={{ marginTop: '2px', marginLeft: '5px' }}>{'All Day'}</p>
                                    </div> : <></>}
                                    {props.itemdata.event_start_time ? <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '5px' }}>
                                        <p>|</p>
                                        <p style={{ color: '#1D2D56', marginTop: '2px', marginLeft: '5px' }}>{props.itemdata.event_start_time ?? '-'}</p>
                                        <p style={{ color: '#1D2D56', marginTop: '2px', marginLeft: '5px' }}>{` - `}</p>
                                        <p style={{ color: '#1D2D56', marginTop: '2px', marginLeft: '5px' }}>{props.itemdata.event_end_time ?? '-'}</p>
                                    </div> : <></>}
                                </span>
                            </div>
                        </div>

                        <div style={{ height: '50%', marginTop: '15px' }}>
                            <div style={{ marginLeft: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'row' }}>
                                <span style={{ display: 'flex', flexDirection: 'row', width: '23%' }}>
                                    <img style={{ height: '18px', width: '20px' }} src={standard}></img>
                                    <p style={{ marginLeft: '10px', }}>
                                        {"Standard"}
                                    </p>
                                </span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', width: '77%' }}>
                                    {props.itemdata.standardNamesList.length === 0 ? (
                                        <p style={{marginLeft:'50px'}}>
                                            -
                                        </p>
                                    ) : (
                                        props.itemdata.standardNamesList.map(item => (
                                            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '50px', background: '#F2F2F2' }}>
                                                {item}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>



                            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px', marginBottom: '20px' }}>
                                <img style={{ height: '20px', width: '20px' }} src={department}></img>
                                <p style={{ marginLeft: '10px' }}>
                                    {"Audience"}
                                </p>
                                {props.itemdata.userTypeList?.map(item => {
                                    return (
                                        <div
                                            style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px' }}>
                                            <p style={{}}>
                                                {item == 1
                                                    ? 'Student'
                                                    : item == 3
                                                        ? 'Teacher'
                                                        : 'Custom User'} </p>
                                        </div>);
                                })}
                            </div>

                            <div
                                style={{
                                    border: '1.5px solid #D2D5D8 ',
                                    marginRight: '10px',
                                    marginLeft: '15px',
                                    padding: 10,
                                    borderRadius: 3,
                                }}>
                                <p>{props.itemdata.holiday_desc ?? '-'}</p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default MorePopup;