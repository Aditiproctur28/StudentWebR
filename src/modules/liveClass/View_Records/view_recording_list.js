import React, { useState, useEffect } from "react";
import downlode from "../../../assets/liveclass/downlode.png";
import '../../../css/liveclass/view_recording_list_module.css';
import api from '../../../api/api';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const View_recording_list = (props) => {
    const [awsplay, setAwsplay] = useState(true);
    const [vdoplay, setVdoplay] = useState(true);
    const [vimeoplay, setVimeoplay] = useState(true);
    const [awsdownlode, setAwsdownlode] = useState(true);
    const [vdodownlode, setVdodownlode] = useState(true);
    const [vimeodownlode, setVimeodownlode] = useState(true);
    props.setvideoIdclose(props.video_id)

    /*  flag use for loader only */
    const show_video_button = (value) => {
        if ((value === 1 || value === 3 || value === 5 || value === 7)) {
            setAwsplay(false)
        }
        if ((value === 4 || value === 5 || value === 6 || value === 7)) {
            setVimeoplay(false)
        }
        if ((value === 2, value === 3, value === 6, value === 7)) {
            setVdoplay(false)
        }
    }

    const show_vimeo_downlode_button = (downlodable, onUplode) => {
        ((downlodable === true) && (onUplode === 'Vimeo')) && setVimeodownlode(false)
    }

    const vdocipher_and_aws_downlode = (downlode_visibility, recode_session, onUplode) => {
        (((downlode_visibility === 1) || (downlode_visibility === 3)) && ((recode_session !== 4) && (onUplode !== 'Vimeo'))) && setVdodownlode(false)
    }
    const vdocipherApicalling = () => {
        let request = {
            url: "/api/v1/instFileSystem/videoOTP?source=IOS-APP",
            token: props.auth.student_auth,
            data: {
                videoID: props.video_id,
                institute_id: props.auth.institute_id,
                user_id: props.auth.user_id

            }
        }
        props.flag(true)
        api.postAuth(request).then(data => {
            // videoData = data
            props.setvideocypher_playdata(data)
            data && props.flag(false)
            props.togglvdocipherclick()
        }).catch((err) => {
            props.flag(false);
            if (err && err.response && err.response.status == 403) {
                { props.dispatch({ type: 'LOGOUT' }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Network error");
            }
        })
    }
    const AwsApiCalling = () => {
        let request = {
            url: `/api/v1/meeting_manager/recording/download/${props.auth.institute_id}/${props.download_id}?type=1`,
            token: props.auth.student_auth
        }
        props.flag(true)
        api.getAuth(request).then(data => {
            props.awsvideourl(data.data.video_url)
            data && props.flag(false)
            data && props.click(true)
            props.toggleawsclick()
        }).catch((err) => {
            props.flag(false);
            props.click(false)

            if (err && err.response && err.response.status == 403) {
                { props.dispatch({ type: 'LOGOUT' }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Network error");
            }
       })
    }

    const downlodeApi = () => {
        let request = {
            url: `/api/v1/meeting_manager/recording/download/${props.auth.institute_id}/${props.download_id}`,
            headers: {
                headers: {
                    Authorization: props.auth.student_auth,
                    "Content-Type": "video/mp4",
                },
                'responseType': 'blob'
            }
        }
        props.flag(true)
        api.getAuthVideo(request).then(response => {
            props.flag(false)
            const filename = `${awsplay}_${new Date().getTime()}.mp4`;
            let blob = new Blob([response.data], { type: 'video/mp4' });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.target = '_blank';
            a.click();
            URL.revokeObjectURL(a.href);

        }).catch((err) => {
            props.flag(false);
            props.click(false)
            if (err && err.response && err.response.status == 403) {
                { props.dispatch({ type: 'LOGOUT' }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Not able to downlode video file. please contact institute admin.");
            }
        })
    }
    const UpdatVimeoWatchCall = () => {
        let request = {
            url: `/api/v1/instFileSystem/update-watch-count`,
            token: props.auth.student_auth,
            data: {
                "video_id": props.vimeo_video_id,
                "institute_id": props.auth.institute_id
            },
        }
        props.flag(true)
        api.putAuth(request).then(data => {
            data && props.flag(false)
        }).catch((err) => {
            props.flag(false);
            if (err && err.response && err.response.status == 403) {
                { props.dispatch({ type: 'LOGOUT' }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Not able to downlode video file. please contact institute admin.");
            }
        })
    }
    const VimeoPlayer = ()=>{
        props.setvimeoVideoId(props.vimeo_video_id)
        props.toggleVimeoclick();
    }
    const downloadvimeo = () => {
        let request = {
            url: `/prod/vimeo/download-links/${props.vimeo_video_id}`,
            headers: { 'x-prod-inst-id': props.auth.institute_id },
        }
        props.flag(true)
        api.getOther(request).then(data => {
            data && props.flag(false)
            if (data.data.result.length === 0) {
                toast.error("No Download Link Found  ");
            }
            else {
                props.vimeoDownlode(data.data.result, true)
            }

        }).catch((err) => {
            props.flag(false);
            if (err && err.response && err.response.status == 403) {
                { props.dispatch({ type: 'LOGOUT' }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Not able to downlode video file. please contact institute admin.");
            }
        })
    }

    useEffect(() => {
        show_video_button(props.view_proctur_live_recorded_session)
        show_vimeo_downlode_button(props.vimeo_video_downlodable, props.recording_uploaded_on)
        vdocipher_and_aws_downlode(props.proctur_live_view_or_download_visibility, props.view_proctur_live_recorded_session, props.recording_uploaded_on)
    }, []);

    return (<>
        <div className="view_recording_list">
            <div className="view_recording_list_left">
                <div className="view_lecture_name">
                    <p>{props.view_list_session_name}</p>
                </div>
                <div className="view_lecture_details">
                    <span className="dotdot">·</span>
                    <span className="view_date">{props.recording_date_time ? props.recording_date_time : "-"}</span>
                    <span className="dotdot">·</span>
                    <span className="view_date">{props.view_list_time_duration ? props.view_list_time_duration : "-"}</span>
                    <span className="dotdot">·</span>
                    <span className="view_date"> {props.view_size} MB</span>
                </div>
            </div>
            <div className="view_recording_list_right">
                <button className="aws_downlode" hidden={awsdownlode} onClick={downlodeApi}><img src={downlode} /></button>
                <button className={props.download_id ? "aws_play" : "disable_button"} hidden={awsplay} onClick={() => { AwsApiCalling() }}><i className="fa fa-play-circle" /></button>
                <button className="videocipher_downlode" hidden={vdodownlode} onClick={downlodeApi}><img src={downlode} /></button>
                <button className={props.video_id ? "videocipher_play" : "disable_button"} hidden={vdoplay} onClick={() => { vdocipherApicalling() }}><i className="fa fa-play-circle" /></button>
                <button className="vimeo_downlode" hidden={vimeodownlode} onClick={() => { downloadvimeo(); }}><img src={downlode} /></button>
                <button className={props.vimeo_video_id ? "vimeo_play" : "disable_button"} hidden={vimeoplay} onClick={() => {VimeoPlayer(); UpdatVimeoWatchCall(); }}><i className="fa fa-play-circle" /></button>
            </div>
        </div>
        <ToastContainer />
    </>)
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(View_recording_list)
