import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './studymnav.css'
import { connect } from 'react-redux';


function StudyMNav(props) {

  return (

    <div>

      <nav className='live'>
        <div className='live-menu'>
          <div className='live-item'>
            {
              props.auth.user_type != "99"&&
              <div className={props.selectedtab == "StudyLibrary" ? "live-links-active" : "live-links"} onClick={() =>{ props.selecttab("StudyLibrary"); props.changedmsg()}}>
              <span >Study Library</span>
            </div>
            }
           
          </div>
          {
            props.auth.enable_eLearn_feature &&
            <div className='live-item'>
              <div className={props.selectedtab == "PurchasedProduct" ? "live-links-active" : "live-links"} onClick={() =>{ props.selecttab("PurchasedProduct"); props.changedmsg()}} >
                <span>Purchased Product</span>
              </div>
            </div>
          }
        </div>

      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(StudyMNav);