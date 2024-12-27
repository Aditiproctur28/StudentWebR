import React from 'react';
import '../../../css/liveclass/Upcoming_Classes_Module.css';
import Upcoming_Class_List from './Upcoming_Classes_List';
import moment from 'moment';
const Upcoing_Classes = (props) => {

    const course_name = (course) => {
        var course_name = ''
        course.map((key, index) => {
            if(index === 0){
                course_name = course_name +"  " +  key.course_name
              }
              else{
              course_name = course_name +" , "+  key.course_name
              }
            })
              return course_name    
          }
    

   
    const convertMinsToHrsMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = Math.round(mins % 60);
        h = (h < 10) ? ('0' + h) : (h);
        m = (m < 10) ? ('0' + m) : (m);
        return `${h}:${m}`;
      }
    const remainingTime = (time) => {
        const start_datetime = new Date(time);
        const current_time = new Date();

        const totalSeconds = Math.floor((start_datetime - (current_time)) / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const hours = totalHours - (totalDays * 24);
        const minutes = totalMinutes - (totalDays * 24 * 60) - (hours * 60);
        const seconds = totalSeconds - (totalDays * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        if (totalDays > 0) {
            return totalDays + (totalDays > 1 ? ' Days' : ' Day');
        } else if (hours > 0) {
            return(hours + ' hrs '   + minutes + (minutes > 1 ? ' Mins' : ' Min'));
        } else if (minutes > 0) {
            return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + seconds + (seconds > 1 ? ' Secs' : 'Sec');
        } else {
            return seconds + (seconds > 1 ? ' Secs' : 'Sec');
        }
    }


    const getTimeDifference = (start_time, end_time) => {
        let diff = new Date(end_time).getTime() - new Date(start_time).getTime();
        let minutes = diff / 60000;
        return minutes;
    }

    return (<>

        <div>
            <div className="day_update_line">
                <div className="day_update_line_left">
                    <label className="days_label">
                        <div className="days_label_days"><p className="days_label_days_p">{props.day}</p></div>
                        <div className="days_label_dates"><p>{moment(new Date(props.date)).format("DD-MM-YYYY")}</p></div>
                    </label>
                </div>
                <div className="day_update_line_right">
                </div>
            </div>
            <div className="upcoming_classes_div">
                {
                    props.classes.map((key, index) => {
                        let pdate = key.start_datetime.split(' ', 1);
                        return (

                            props.date[0] === pdate[0] ? (<Upcoming_Class_List
                                Loaderfunc={props.Loaderfunc}
                                time_title={getTimeDifference(new Date(), key.start_datetime) > 0 ? (remainingTime(key.start_datetime) + " Left") : 'Ongoing'}
                                session_name={key.session_name}
                                course_name={course_name(key.course_list)}
                                faculity_Img={key.t_photo_url}
                                faculity_name={key.teachersName}
                                time={moment(key.startDateTime).format("hh:mm A")}
                                reaming_time={getTimeDifference(key.start_datetime, key.end_datetime)<60 ? getTimeDifference(key.start_datetime, key.end_datetime) + " Mins" : getTimeDifference(key.start_datetime, key.end_datetime)/60 == 1 ? getTimeDifference(key.start_datetime, key.end_datetime)/60 + " Hr" : convertMinsToHrsMins(getTimeDifference(key.start_datetime, key.end_datetime)) + " Hr's"}
                                session_id={key.session_id}
                                live_meeting_with={key.live_meeting_with}
                                session_link={key.session_link}
                            />) : console.log("error")
                        )
                    })


                }

            </div>
        </div>
    </>)
}
export default Upcoing_Classes;