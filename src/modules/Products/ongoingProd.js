import React from 'react';
import './ongoingProd.css'
import dateP from '../../assets/products/dateP.png'
import reddate from '../../assets/products/reddate.png'
import Balls from './Balls.png'
// import CompletedProd from '../../modules/Products/completdProd'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function OngoingProd(props) {
    const moment= require('moment') 
    let dates = props.item.enrolled_date
    let newdate = dates.split("T")
    newdate = newdate[0]
    var dateString = moment(newdate).format('DD-MM-YYYY');

    let date = props.item.expire_on
    let newdates = date ? date.split("T") : '-'
    newdates = newdates[0]
    var dateStrings = moment(newdates).format('DD-MM-YYYY');
   

    return (<>
        <div className="documentCard" onClick={() => { props.dispatch({ type: 'UPDATE_PRODUCT', data: { ...props } }); setTimeout(() => { window.location = 'product/' + props.item.id }, 300) }} >
          
            <div className="image-card" style={{ backgroundImage: `url(${props.item.logo_url})` }} >

            <div className="price">
                  {props.item.price==0?<p>Free</p>:<p>{props.item.price + "  "+props.currency_code}</p>}
                  </div>
            </div>
            <div className="product-heading">
                <span  title={props.item.title}>{props.item.title} </span>
            </div>

            <div className="Category-heading1">
            <span title={props.item.about.replace(/<\/?[^>]+(>|$)/g, "")}  className="Exam-heading" >{props.item.about.replace(/<\/?[^>]+(>|$)/g, "")}</span>
                {/* <span className="Exam-heading" style={{width:"90%"}} dangerouslySetInnerHTML={{ __html: props.item.about }} ></span> */}
                
            </div>

            <div className="Category-heading1">
                <span>{props.auth.is_institute_type_school ? "Standard:":"Category/Course:" } </span>
                <div className="Exam-heading" title={props.course_type(props.item.product_ecourse_maps)}>{props.course_type(props.item.product_ecourse_maps)}  </div>
            </div>

            <div className="Category-heading1">
                <span>Order ID: </span>
                <div className="Exam-heading" >{props.item.public_order_id}  </div>
            </div>
            {props.item.is_enrolled == true &&
                <div className="card-prod1">
                    <div className="purchase-heading">
                        <span className="date-purchased"><img src={dateP} alt="" className="prod-date" /> Purchased On </span>
                        <span className="date"> {dateString}</span>
                    </div>
                    <div className="purchase-heading">
                  { 
                   props.item.expired == false?
                        <span ><img src={reddate} alt="" className="prod-date"/> Expiry Date </span>
                        : <span ><img src={reddate} alt="" className="prod-date" /> Expired on </span>
            }

                        <span className="date"   >  {dateStrings}</span>

                    </div>
                </div>
            }
        </div>


    </>
    );
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(OngoingProd)