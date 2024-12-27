import React, { useState, useEffect } from 'react';
import './Forgot.css'
import api from '../../api/api'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessageHandling } from '../../components/error.js'
import Forgotpopup from '../login/Forgotpopup'
import Loader from '../../components/loader';

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user_name: "",
            openpopup: false,
            arr: [],
            flag:false,
        };
    }

    continueApi = (user_id, institute_id) => {
        let request = {
            url: `/api/v2/user/forgotPassword`,
            data: {
                institute_id: institute_id,
                source: "study-app",
                user_id: user_id,
                user_name: this.state.user_name,
            }
            
        }
        this.setState({ flag: true })
        api.postAuth(request).then(data => {
            this.setState({ flag: false })
            if (data.data.statusCode == 200 && data.data.result == null) {
                toast.success("New Password send to your registered mobile number.")
                this.setState({ openpopup: false })
                this.props.show_forgot_password();
            } else if (data.data.statusCode == 200 && data.data.result.length > 0) {
                // this.setState({ flag: true })
                let temp = data.data.result;
                let arr = temp;
                if (arr.length == 1) {
                    // this.setState({ flag: true })
                    this.continueApi(arr[0].user_id, arr[0].institute_id);
                } else {
                    // this.setState({ flag: true })
                    this.setState({ openpopup: true })
                }
                this.setState({ arr: arr })
            }
           



        }).catch((err) => {
            this.setState({ flag: false })
            if (err && err.response && err.response.status == 403) {
                { this.props.dispatch({ type: 'LOGOUT',msg:err.response.data.message }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
                //    window.location = '/dashboard'
            } else {
                toast.error(ErrorMessageHandling(err));
            }

        })
    }

    render() {
        return (
            <>
          

                <div className="popup-login-div1">
                    <div className="forgot-div">
                        <div className="fpass-div">Forgot Password</div>
                        <div className="paara-div">We're all a little forgetful sometimes. Just give us the phone number you signed up with and we'll get you a new password.</div>

                        <div className="mobile-No">
                            <label className="number-phone">Phone Number:</label>
                            <input type="text" name="Login" placeholder="Enter Phone Number" value={this.state.user_name}
                                onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        this.setState({ user_name: e.target.value })
                                    }
                                }}
                                className="place" />
                        </div>

                        <div className="forgot-buttons">
                            

                            <button className="closebutton" disabled={this.state.user_name.trim().length < 1} style={{ opacity: this.state.user_name.trim().length < 1 ? 0.5 : 1 }} onClick={() => { this.continueApi("", 0) }}>Continue</button>
                            <button className="closebutton2" onClick={() => this.props.show_forgot_password()}>Close</button>

                        </div>
                    </div>
                    {/* {this.state.show_forgot_password == true &&
                    
                        <ForgetPassword
                            show_forgot_password={() => this.setState({ show_forgot_password: false })}
                        />
                    } */}


                    {this.state.openpopup == true &&
                        <Forgotpopup
                            show_forgot_password={() => this.setState({ openpopup: false })}
                            arr={this.state.arr}
                            continueApi={this.continueApi}
                        />
                    }



                </div>
                <div>
            {
               this.state.flag && <Loader />
            }
         </div>
            </>
        );
    }
}



const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(ForgetPassword)