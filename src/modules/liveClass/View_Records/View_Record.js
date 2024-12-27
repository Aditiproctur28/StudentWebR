import React, { useState } from 'react';
import '../../../css/liveclass/View_Record_module.css';
import cancle from '../../../assets/liveclass/cancle.png';
import View_recording_list from "./view_recording_list";
import VideoPlayer from '../../../services/VideoPlayer';
import VideoCipherPlayer from '../../../services/Videocipherplayer';
import api from '../../../api/api';
import { connect } from 'react-redux';
import Loader from '../../../components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessageHandling } from '../../../components/error';
import { encode, decode } from 'base-64';
const View_Record = (props) => {
    const [click, onclick] = useState(false);
    const [videotype, changevideotype] = useState('');
    const [flag, setFlag] = useState(false);
    const [vimeoVideoId, setvimeoVideoId] = useState()
    const [awsVideoUrl, setawsVideoUrl] = useState()
    const [videoIdclose, setvideoIdclose] = useState()
    const [videocypher_playdata, setvideocypher_playdata] = useState()
    var videoObject = {}
    const setVideoObject = (obj) => {
        videoObject = obj;
    }
    
    const toggleawsclick = () => {
        onclick(!click)
        changevideotype('aws')

    }
    const toggleVimeoclick = () => {
        onclick(!click)
        changevideotype('vimeo')
    }

    const togglvdocipherclick = () => {
        onclick(!click)
        changevideotype('vdocipher')
    }
    const vdocipherclose = () => {
        vdocipherCloseAPI()
        onclick(!click)
    }
    const vdocipherCloseAPI = () => {
        let request = {
            url: "/api/v1/instFileSystem/allocateWatchHistory",
            token: props.auth.student_auth,
            data: {
                video_id: videoIdclose,
                watch_duration: videoObject.totalPlayed
            }
        }

        api.postAuth(request).then(data => {
        }).catch((err) => {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
        
                toast.error(ErrorMessageHandling(err))
            }
        })

    }
    
    return (<>
        {click ? (<div className="popup-box">
            <div className="video-box">
                <div className="video-top" >
                    <div className="video-session-name">
                        <p>{props.session_name}</p>
                    </div>
                    <div className="video-cancle-name">
                        <i class="fa fa-times" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => { videotype === 'aws' ? toggleawsclick() : (videotype === 'vdocipher') ? vdocipherclose() : toggleVimeoclick() }}></i>
                    </div>
                </div>

                <div style={{ height: '90%' }} >
                    {(videotype === 'aws') ? <VideoPlayer url={decode(awsVideoUrl)} /> :
                        (videotype === 'vdocipher') ? <VideoCipherPlayer setVideoObject={setVideoObject} otp={videocypher_playdata.data.otp} playbackInfo={videocypher_playdata.data.playbackInfo} /> :
                            (videotype === 'vimeo') &&
                            <iframe height="100%" width="100%"
                                src={`https://player.vimeo.com/video/${vimeoVideoId}?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=187610`}
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen=""
                            />
                    }
                </div>

            </div>



        </div>) :

            (<div className="popup-box">

                <div className="box">
                    {flag && <Loader />}
                    <div className="view_record_main">

                        <div className="view_recording">
                            <div className="view_recording_left">
                                <p> View Recording </p>
                            </div>
                            <div className="view_recording_right">
                                <button onClick={props.handleClose}><img src={cancle} /></button>
                            </div>

                        </div>
                        <div >

                            {
                                props.view_download_links.map((data, index) => (
                                    <View_recording_list key={index}
                                        setvideoIdclose={setvideoIdclose}
                                        setvimeoVideoId={setvimeoVideoId}
                                        view_list_time_duration={data.video_duration}
                                        recording_uploaded_on={data.recording_uploaded_on}
                                        recording_date_time={data.recording_date_time}
                                        view_list_session_name={data.session_name}
                                        view_size={data.video_size}
                                        vimeo_video_downlodable={props.vimeo_video_downlodable}
                                        view_proctur_live_recorded_session={props.view_proctur_live_recorded_session}
                                        proctur_live_view_or_download_visibility={props.proctur_live_view_or_download_visibility}
                                        download_id={data.download_id} vimeo_video_id={data.vimeo_video_id} video_id={data.video_id}
                                        toggleawsclick={toggleawsclick}
                                        togglvdocipherclick={togglvdocipherclick}
                                        toggleVimeoclick={toggleVimeoclick}
                                        flag={setFlag}
                                        click={onclick}
                                        awsvideourl={setawsVideoUrl}
                                        vimeoDownlode={props.vimeoDownlode}
                                        setvideocypher_playdata={setvideocypher_playdata}
                                    />
                                ))
                            }



                        </div>
                    </div>
                </div>
            </div>)}
        <ToastContainer />
    </>)

}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(View_Record)
