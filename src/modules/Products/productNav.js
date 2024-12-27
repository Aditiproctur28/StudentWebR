import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api'
import { connect } from 'react-redux';
import './productNav.css'

function ProductNav(props) {
  return (
    <div>
      <nav className='live-prod'>
        <div className='live-container'>
          <div className='live-menu'>
            <div className='live-item'>
              <span className={props.keys == "prod_ongoing" ? "live-links-active" : "live-links"} onClick={() => props.ChangeTab('prod_ongoing')}>Active</span>
              <span className="link-sub">{props.ongoing}</span>
            </div>
            <div className='live-item'>
              <span className={props.keys == "prod_completed" ? "live-links-active" : "live-links"} onClick={() => props.ChangeTab('prod_completed')}>Expired</span>
              <span className="link-sub">{props.expire}</span>
            </div>
          </div>
          {props.auth.prodUrl != "" &&
            <div className="More-Products">
              <span className="buy-products" >To buy More Products</span>
              {
                props.auth.prodUrl && <button className="click-me" onClick={() => { window.open(props.auth.prodUrl) }}>Click Here</button>
              }
            </div>
          }
        </div>

      </nav>
    </div>
  );
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(ProductNav)