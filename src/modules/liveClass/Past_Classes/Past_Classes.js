import React, { useState, useEffect } from "react"
import '../../../css/liveclass/Past_Classes_Module.css';
import Past_classes_List from './Past_Classes_List';
const Past_Classes = (props) => {

    return (<>
        <div className="past_classes_main_div">
            <div className="day_update_line">
                <div className="day_update_line_left">
                    <label className="days_label">
                        <div className="days_label_days"><p className="days_label_days_p">{props.day}</p></div>
                        <div className="days_label_dates"><p>{props.date}</p></div>
                    </label>
                </div>
                <div className="day_update_line_right">
                </div>
            </div>
            <div className="past_classes_container">

                {

                    props.classes.map((data, index) => (
                        <Past_classes_List
                            data={index}
                            Data={data}
                            vimeo_video_downlodable={props.vimeo_video_downlodable}
                            view_proctur_live_recorded_session={props.view_proctur_live_recorded_session}
                            proctur_live_view_or_download_visibility={props.proctur_live_view_or_download_visibility} />
                    ))
                }
            </div>

        </div>



    </>)
}
export default Past_Classes;