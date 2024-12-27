import React, { useState } from 'react';
import '../../../css/liveclass/Past_Classes_List.css';
import Clock_Img from '../../../assets/liveclass/clock.png';
import Profile_Img from '../../../assets/profile/profile_image2.png'
import View_Records from '.././View_Records/View_Record';
import PopUpVimeo from '../../../components/popupVimeo/vimeo'
import { connect } from 'react-redux';
import tdefultImg from '../../../assets/timetable/teacher_icon3.png'
// import teacher from '../../../assets/timetable/teacher_icon3.png'
const Past_classes_List = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [vimeo_download_links, setvimeo_download_links] = useState("")
    const [open_modal, setopen_modal] = useState(false)
    let view = props.Data.download_links.length === 0 ? false : true

    const SubString = (data) =>{
        if(data.length> 30){
            return data.substring(0, 30) + "..."
        }
        else {
            return data 
        }
    }
    const FacltyImg =(data)=>{
    if(data=='null'|| data == null || data==''){
        return tdefultImg
    }
    else{
        var imgurl =  data.split(",")
        var imgfinal = imgurl.filter(url=> url!== 'null')[0]
        return (imgfinal)
    }
     

   
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const vimeoDownlode = (url, open) => {
        togglePopup()
        setvimeo_download_links(url)
        setopen_modal(open)
    }
    return (<>
        <div>
            {
                open_modal && <PopUpVimeo open_modal={setopen_modal} vimeo_download_links={vimeo_download_links} />
            }
        </div>
        {isOpen && <View_Records handleClose={togglePopup}
            view_download_links={props.Data.download_links}
            view_proctur_live_recorded_session={props.view_proctur_live_recorded_session}
            vimeo_video_downlodable={props.vimeo_video_downlodable}
            proctur_live_view_or_download_visibility={props.proctur_live_view_or_download_visibility}
            vimeoDownlode={vimeoDownlode}
            session_name={SubString(props.Data.session_name)}
        />}
        <div className="past_class_container">
            <div className="past_class_name_list">
                <div className="past_class_title">
                    <p>Session Name</p>

                </div>
                <div className="session_name_title">
                    <p title={props.Data.session_name}>{SubString(props.Data.session_name)}</p>

                </div>

            </div>
            <div className="past_class_time">
                <div>
                    <img src={Clock_Img} />
                </div>
                <div className="past_class_time_duration">
                    <div className="past_class_title">
                        <p>Time & Duration </p>
                    </div>
                    <div className="past_class_time_right">
                        <div className="past_class_time_show">
                            <p>{props.Data.time}</p>
                        </div>
                        {/* <div style={{paddingLeft:"8px" ,paddingRight:"8px"}}>·</div> */}
                        <div className="past_class_remaning_time">
                            <p style={{marginLeft:"8px" , marginRight:"8px" , fontStyle:"bold"}}>•</p>
                            <p>{props.Data.time_duration}</p>
                        </div>
                    </div>
                </div>
                <div>
                </div>

            </div>
            <div className="past_class_course">
                <div className="past_class_title">
                   {props.auth.is_institute_type_school ?<p>Section</p>:<p>Batch Name</p> } 
                </div>
                <div className="course_title">
                    <p title={props.Data.course_name}>{SubString(props.Data.course_name)}</p>
                </div>

            </div>
            <div className="past_class_facality_information">
                <div className="facality_information_left">
                    {
                        props.Data.faculityImg == null  || props.Data.faculityImg == 'null' ?  <img  src={Profile_Img} /> : <img style={{borderRadius: 50 , height:25, width:25}}  src={FacltyImg(props.Data.faculityImg)} /> 
                    }
                    
                </div>
                <div className="facality_information_right">
                    <div className="facality_information_name_title">
                        <p>Faculty</p>
                    </div>
                    <div className="facality_information_name">
                        <p title={props.Data.faculity_name.split(",").join(",  ")}>{SubString(props.Data.faculity_name.split(",").join(",  "))}</p>
                    </div>

                </div>


            </div>
            <div className="past_class_button">
            { (view == true) ?
                <button onClick={togglePopup}>View </button> : <p style={{width:"50px"}}>-</p>
                
                }
           
           
            </div>

        </div>

    </>)
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Past_classes_List)