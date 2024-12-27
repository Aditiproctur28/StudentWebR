import React, { useState } from 'react'
import './popupLogin.css'
import { connect } from 'react-redux';

function Forgotpopup(props) {

    const [selected, setSelected] = useState(0);


    return (
        <>

            <div className="popup-login-div1">
                <div className="popup-login-div" style={{ width: '600px' }}>
                    <div className="popup-login" style={{ width: '550px' }}>

                        <div className="popup-heading">Forgot Password For:</div>

                        {props.arr.map((el, i) => (
                            <label key={i} class="container-popupLogin">{el.name}
                                <div>{el.display}-{el.institute_name}</div>
                                <input type="radio" name="radio" value={i} checked={i == selected} onChange={(e) => setSelected(Number(e.target.value))}
                                />
                                <span class="checkmark"></span>
                            </label>
                        ))

                        }



                    </div>

                    <div className="popuplogin-buttons">

                        <button className="pop-button" onClick={() =>{ props.continueApi(props.arr[selected].user_id, props.arr[selected].institute_id)}}>Reset Password</button>
                        <button className="pop-button2" onClick={() => props.show_forgot_password()}>Cancel</button>
                    </div>

                </div>
            </div>


        </>
    )
}

const mapStateToProps = (state) => ({ ...state.auth });


export default connect(mapStateToProps)(Forgotpopup);