import React from "react";
import { connect } from 'react-redux'
import profile_img2 from '../../assets/profile/profile_image2.png'

class ProfilePhoto extends React.Component {
    constructor(props) {
        super(props)
        this.state =
        {
            photo: profile_img2,
            photo2: ""
            , count: 0
        }
    }
    photo3 = ""
    photoUpdate() {
        if (this.props.photos != profile_img2) {
            this.setState({ photo: this.props.photos })



        }

        if (this.props.photos != profile_img2 && this.props.photos) {
            this.setState({ photo2: this.props.photos })
            setTimeout(() => {
                if (this.state.photo2 != "") {
                    this.setState({ count: this.state.count + 1 })
                }
            }, 1000);
        }
        if (this.state.photo != profile_img2) {
            this.photo3 = this.state.photo
        }
    }
    componentDidMount() {
        this.photoUpdate()
        //    this.props.dispatch({
        //     type: 'PROFILE_INFO',
        //     to_state_profile_pic:this.photo3,
        //   })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.photoUpdate()


        }
        if (prevState.photo != this.state.photo) {
            if (this.state.photo != profile_img2) {

                // this.props.dispatch({
                //     type: 'PROFILE_INFO',
                //     to_state_profile_pic:this.photo3,
                //   })
            }

        }
    }

    render() {
        return (
            <>
                <img
                    id='profile_photo_temp'
                    src={
                        this.state.photo
                            ? this.state.photo
                            : profile_img2
                    }
                ></img>
            </>
        )
    }

}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(ProfilePhoto)