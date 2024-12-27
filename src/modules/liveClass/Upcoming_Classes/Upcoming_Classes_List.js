import React from 'react';
import { connect } from 'react-redux';
import '../../../css/liveclass/Upcoming_Classes_List_module.css';
import Img from '../../../assets/profile/profile_image2.png';
import Clock from '../../../assets/liveclass/clock.png';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../api/api';
import tdefultImg from '../../../assets/timetable/teacher_icon3.png'

const Upcoming_Class_List = (props) => {
    const SubString = (data) => {
        if (data.length > 30) {
            return data.substring(0, 30) + "..."
        }
        else {
            return data;
        }
    }
    const FacltyImg = (data) => {
        if (data == 'null' || data == null || data == '') {
            return tdefultImg
        }
        else {
            var imgurl = data.split(",")
            var imgfinal = imgurl.filter(url => url !== 'null')[0]
            return (imgfinal)
        }
    }


    const join = () => {
        props.Loaderfunc(true);
        let request = {
            url: `/api/v1/meeting_manager/session/start/${props.auth.institute_id}/${props.session_id}?isZoomLiveClass=${props.live_meeting_with == "Zoom" ? 1 : 0}`,
            token: props.auth.student_auth,
        }
        api.getAuth(request).then(data => {
            props.Loaderfunc(false);
            data.data.result.allow_start_session ? window.open(props.session_link, '_blank') : alert("You cannot start the class as the classes can only be started after the scheduled time.")
        }).catch((err) => {
            props.Loaderfunc(false);
            if (err && err.response && err.response.status == 403) {
                { this.props.dispatch({ type: 'LOGOUT',msg:err.response.data.message }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Network error");
            }

        })
    }

    return (<>
        <div className="upcoming_classes_main_div">
            {
                (props.time_title == "Ongoing") ? <div className="image_set"><p>{props.time_title} </p></div> : (props.time_title.includes("Days")) ? <div className="image_set" style={{ backgroundColor: '#E1DEDD' }}><p>{props.time_title} </p></div> : <div className="image_set" style={{ backgroundColor: '#C279FC' }}><p>{props.time_title} </p></div>
            }

            <div className="cantainer">
                <div className="courese_name_div">
                    {
                        (props.course_name) ? <p title={props.course_name}>{SubString(props.course_name)}</p> : <p>--</p>
                    }
                </div>
                <div className="class_name_div">
                    <p title={props.session_name}>{SubString(props.session_name)}</p>

                </div>
                <div className="facality_information_div">
                    <div className={{ display: "flex" }}>
                        <img style={{ borderRadius: 50, height: 20, width: 20 }} src={props.faculity_Img !== null || props.faculity_Img !== 'null' ? FacltyImg(props.faculity_Img) : Img} />
                    </div>
                    <div className="facality_name">
                        <p title={props.faculity_name.split(",").join(", ")}>{SubString(props.faculity_name.split(",").join(", "))}</p>
                    </div>
                </div>
                <div className="time_card_bar">
                    <div className="time_card">
                        <div className="time_card_left">
                            <img src={Clock} />
                            <p>{props.time}</p>
                        </div>
                        <div className="time_card_right">
                            <p> &nbsp; • &nbsp;  {props.reaming_time}</p>
                        </div>
                    </div>

                    {
                        props.auth.parentslogin ?

                            <div className="join_button_div">


                                <button style={{ background: '#E3E3E3', cursor: 'pointer' }} onClick={() => { toast.error("Parents are not allowed to join.") }} >Join</button>



                            </div> : <div className="join_button_div">
                                {
                                    props.time_title == "Ongoing" ?
                                        <button onClick={() => {
                                            join()
                                        }}>Join</button> :
                                        <button style={{ background: '#E3E3E3', cursor: 'pointer' }} onClick={() => { toast.error("Grab a cup of Coffee. Class is not yet started.") }} >Join</button>

                                }

                            </div>

                    }
                    {/* <div className="join_button_div">
                        {
                            props.time_title == "Ongoing" ?
                                <button onClick={()=>{
                                    join()
                                }}>Join</button>: 
                                <button  style={{ background: '#E3E3E3' , cursor:'pointer' }} onClick = {()=>{toast.error("Grab a cup of Coffee. Class is not yet started.")}} >Join</button>

                        }

                    </div> */}
                </div>

            </div>

        </div>
    </>)
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Upcoming_Class_List)