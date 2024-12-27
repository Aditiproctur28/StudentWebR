import React, { Component } from 'react'


class VideoCipherPlayer extends Component {
    constructor(props) {
        super(props);
    }

    playVdo = () => {
        let video = new window.VdoPlayer({
            otp: this.props.otp,
            playbackInfo: this.props.playbackInfo,
            theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
            container: document.querySelector("#iframeDisplay")
        })
        this.videoObject = video;
        this.props.setVideoObject(video)
    }
    componentDidMount(props) {
        this.playVdo()
    }
    render() {
        return (<>
            <div id="iframeDisplay" style={{ height: "100%" ,width:"100%" }}>

            </div>
        </>)
    }


}

export default VideoCipherPlayer;