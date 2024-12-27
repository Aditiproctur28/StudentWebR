import cross_icon from '../../../assets/profile/cross_icon.png'
import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import api from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class EditProfilePic extends React.Component 
{

    render()
    {
        return(
            <div>

            </div>
        )
    }
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(EditProfilePic)
