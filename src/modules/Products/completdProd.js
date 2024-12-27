import React, { useState, useEffect } from 'react';
import './completedProd.css'
import dateP from '../../assets/products/dateP.png'
import pdff from '../../assets/products/pdff.png'
import Header from '../../components/header';
import { connect } from 'react-redux';
import api from '../../api/api';
import { useParams } from 'react-router-dom';
import reddate from '../../assets/products/reddate.png'
import Loader from '../../components/loader';
import { ErrorMessageHandling } from '../../components/error.js'
import { ToastContainer, toast } from 'react-toastify';
import {useHistory} from "react-router-dom";
import fevicon from '../../assets/favicon.png';
const CompletedProd = (props) => {
    let { id } = useParams()
    const [subjectDetail, setsubjectDetail] = useState([])
    const [loader, setloader] = useState(false)
    

    useEffect(() => {
        const favicon = document.getElementById("favicon");
        favicon.href = localStorage.getItem('feviconIcon');  

        let request = {
            url: `/prod/student-product/item-type-description/${id}`,
            headers: { 'x-prod-inst-id': props.auth.institute_id },
        }
        setloader(true)
        api.getCustomAuth(request).then(data => {
            setsubjectDetail(data.data.result)
            setloader(false)
        }).catch((err) => {
            if (err && err.response && err.response.status == 403) {
                { this.props.dispatch({ type: 'LOGOUT',msg:err.response.data.message }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error(ErrorMessageHandling(err));
            }

        })

    }, []);
    const moment= require('moment') 
    let dates = props.product.item.enrolled_date
    let newdate = dates.split("T")
    newdate = newdate[0]
    var dateString = moment(newdate).format('DD-MM-YYYY');
    let date = props.product.item.expire_on
    let newdates = date ? date.split("T") : '-'
    newdates = newdates[0]
    var dateStrings = moment(newdates).format('DD-MM-YYYY');
    const history = useHistory();
   const Course = (course) => {
        if(course && Array.isArray(course)){
         var course_type = ''
         course.map((item, index) => {
            if (index < course.length - 1) {
               course_type = course_type + item.course_type + ','
            }
            else {
               course_type = course_type + item.course_type
            }
   
         })
         return course_type;
   
        }else{
           return '-'
   
        }
   
      }
    return (<>
        <div>
            {
                loader && <Loader />
            }
        </div>

        <Header />
        <div className="completed-container">
            <div className="completed-container2">
            <div className="documentCard-complete">
                <div className="image-card22" style={{ backgroundImage: `url(${props.product.item.logo_url})` }}>
                    <div className="price">
                        {props.product.item.price == 0 ? <p>Free</p> : <p>{props.product.item.price + " " + props.product.currency_code}</p>}
                    </div>
                </div>
                <div className="product-heading">
                <span   title={props.product.item.title}>{props.product.item.title} </span>
                </div>
                
                <div style={{padding:"13px", overflow:"hidden",textOverflow:"ellipsis"}}>
               
                <span title={props.product.item.about.replace(/<\/?[^>]+(>|$)/g, "")}  className="Exam-heading2" >{props.product.item.about.replace(/<\/?[^>]+(>|$)/g, "")}</span>
                    
                </div>
                <div className="Category-heading1">
                    <span>{props.auth.is_institute_type_school ? "Standard:":"Category/Course:" } </span>
                    <span title={Course(props.product.item.product_ecourse_maps)} className="Exam-heading2">{Course(props.product.item.product_ecourse_maps)} </span>
                </div>


                <div className="Category-heading1">
                <span>Order ID: </span>
                <div className="Exam-heading" >{props.product.item.public_order_id}  </div>
            </div>
                {props.product.item.is_enrolled == true &&
                    <div className="card-prods2">
                        <div className="purchase-heading">
                            <span className="date-purchased"><img src={dateP} alt="" className="prod-date" /> Purchased On </span>
                            <span className="date" title={props.product.item.purchased}> {dateString}</span>
                        </div>

                        <div className="partition-prod"></div>

                        <div className="purchase-heading">
                        {  props.product.item.expired == false?
                            <span ><img src={reddate} alt="" className="prod-date" /> Expiry Date </span>
                            : <span ><img src={reddate} alt="" className="prod-date" /> Expired on </span>
                        }
                            <span className="date" title={props.product.item.expire}>  {dateStrings}</span>

                        </div>
                    </div>
                }
              
            </div>
            <button className="goback" onClick={() => { window.location = "../product" }} >Go Back!</button>
</div>

            {/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="complete-div">
                {(subjectDetail).map((item, index) => (
                    <div className="types">
                        <div className="studyM">
                            <div className="dot"></div>
                            <div className="study-heading">{item.item_type}</div>
                        </div>
                        <div className="product-details">
                            <div className="div-para" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            {item.item_type == "Study Material" ?
                                <div className="div-info" >You can find study material by going to Study Material &gt; Purchased product &gt; Select Product</div>
                                : item.item_type == "Mock Test" ?
                                    <div className="div-info" >You can find and attempt the test by going to the My Tests &gt; Mock Test &gt; Select Product</div>
                                    : item.item_type == "Live Class" ?
                                        <div className="div-info" >Live classes will be scheduled by your Institute and will be shown in live class Upcoming Section </div>
                                        : item.item_type == "Classroom Classes" ?
                                            <div className="div-info" >Classroom classes will be scheduled by your Institute and will be shown in Timetable  </div>
                                            : item.item_type == "Printed Materials" ?
                                                <div className="div-info" >You can find printed material  by going to Study Material &gt; Purchased product &gt; Select Product   </div>
                                                : item.item_type == "Video Lecture" ?
                                                    <div className="div-info" >You can find video lectures by going to Study Material &gt; Purchased product &gt; Select Product</div>
                                                    : item.item_type == "Online Test" ?
                                                        <div className="div-info" >You can find and attempt the test by going to the My Tests &gt; Online Test &gt; Select Product</div>
                                                        : <div></div>
                            }
                        </div>


                    </div>

                ))
                }
            </div>





        </div>
        <ToastContainer />
    </>
    );
}


const mapStateToProps = state => ({ auth: state.auth, product: state.product.data })
export default connect(mapStateToProps)(CompletedProd)