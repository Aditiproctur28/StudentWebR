import React ,{Component} from 'react';
class VideoPlayer extends Component {
    render() {
      return (<>
        
                <video width="100%" height="100%" controls>
                        <source src={this.props.url} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
       
      </>);
    }   
  }
  export default VideoPlayer;

