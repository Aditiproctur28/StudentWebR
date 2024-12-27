import React, { Component } from 'react';
import './AudioPlayer.css'
import cross from '../../src/assets/document/cross.png'
// import api from '../../../api/api';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import api from '../api/api'


class AudioPlayer extends Component {
  myVar3 = "";
  myVar2 = "";
  myVar = "";

  constructor(props) {
    super()

  }

  playVdo = () => {
    let video = new window.VdoPlayer({
      otp: this.props.otp,
      playbackInfo: this.props.playbackInfo,
      theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
      container: document.querySelector("#iframeDisplay")
    })
    this.videoObject = video;
  }


  componentDidMount() {
    if (this.props.type && this.props.type == 'vdo') {
      this.playVdo(this.props.data);
    }
    if (this.props.type && this.props.type == 'file') {
      this.myVar3 = setTimeout(() => {
        document.getElementById('office').setAttribute('src', 'https://docs.google.com/gview?url=' + this.props.file_name + '&embedded=true');
      }, 2000)
      this.myVar2 = setTimeout(() => {
        document.getElementById('office').setAttribute('src', 'https://docs.google.com/gview?url=' + this.props.file_name + '&embedded=true');
      }, 5000)
      this.myVar = setTimeout(() => {
        document.getElementById('office').setAttribute('src', 'https://docs.google.com/gview?url=' + this.props.file_name + '&embedded=true');
      }, 12000)

    }
    document.addEventListener('contextmenu', event => event.preventDefault());
  }

  componentWillUnmount() {
    clearTimeout(this.myVar);
    clearTimeout(this.myVar2);
    clearTimeout(this.myVar3);
  }

  vdocipherCloseAPI = () => {
    let request = {
      url: "/api/v1/instFileSystem/allocateWatchHistory",
      token: this.props.auth.student_auth,
      data: {
        video_id: this.props.videoID,
        watch_duration: this.videoObject.totalPlayed
      }
    }

    api.postAuth(request).then(data => {
      console.log(data)

    }).catch((err) => {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      }
    })
  }



  render() {

    return (<>

      <div className="audioplayer">
        {(this.props.type == "file" || this.props.type == "youtube") ?
          <div className="audio" style={{ width: '100%', height: '100vh' }}>
            <button className="audio-button" onClick={() => { this.props.audiocancle(false) }} ><img src={cross} /></button>
            <div className="audio-popup" style={{ width: '100%', height: '100vh' }}>

              {
                this.props.type == "file" ? <div id="docs" style={{ width: '100%', height: '100vh' }}>
                  <iframe id="office" src={""} style={{ width: '100%', height: '95vh' }} frameborder="0" allowfullscreen="allowfullscreen"></iframe>
                  <div style={{ position: 'absolute', width: 100, height: 100, right: 10, top: 40 }}></div>
                </div>
                  :
                  <div style={{width: '100%', height: '100vh'}}>
                    <iframe style={{height: 'calc( 100vh - 40px )', border: 0, }} 
                      src={`https://www.youtube-nocookie.com/embed/${this.props.youtubeVideoID}?autoplay=1&controls=1&rel=0&disablekb=1&showinfo=0&modestbranding=1&iv_load_policy=3&end=0&loop=0&playsinline=0&start=0&nocookie=false&enablejsapi=1&origin=https%3A%2F%2Fweb.proctur.com&widgetid=1`}
                    />
                    <div style={{position: 'absolute', width: 'calc( 100% - 50px )', height: 35, bottom: 0, left: 50,}}></div>
                    <div style={{position: 'absolute', width: '100%', height: 'calc( 100vh - 90px )', bottom: 50, left: 0,}}></div>
                  </div>


              }

            </div>




          </div>
          : <div className="audio">
            <button className="audio-button" onClick={() => {
              if (this.props.type == 'vdo') {
                this.vdocipherCloseAPI();
                this.props.audiocancle(false);
              } else {
                this.props.audiocancle(false)
              }
            }} ><img src={cross} /></button>
            <div className="audio-popup">

              {this.props.type == "audio" &&
                <audio controls autoPlay>
                  <source src={this.props.audiofileName} type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>
              }

              {
                this.props.type == "vdo" &&
                <div id="iframeDisplay" className='video-player'></div>
              }


              {
                this.props.type == "vimeo" &&
                <iframe allowFullScreen
                  src={`https://player.vimeo.com/video/${this.props.videoID}`}
                />
              }

              

              {
                this.props.type == "image" &&
                <img src={this.props.file_name} style={{ width: '100%', height: '90vh' }} />
              }



            </div>




          </div>}
      </div>
    </>);
  }
}


const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(AudioPlayer)