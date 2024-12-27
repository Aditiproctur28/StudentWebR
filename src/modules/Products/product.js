import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import OngoingProd from '../Products/ongoingProd'
import ProductNav from '../Products/productNav'
import Header from '../../components/header';
import api from '../../api/api'
import { connect } from 'react-redux';
// import CompletedProd from '../Products/completdProd'
import Loader from '../../components/loader';
import { ErrorMessageHandling } from '../../components/error.js'
import { ToastContainer, toast } from 'react-toastify';
import NoProduct from '../Products/noProduct'



class Product extends Component {
      
   ongoingProduct = []
   completedProduct = []
    
      state = {
         products: [],
         cproducts: [],
         loader: false,
         key: "prod_ongoing",
      };
 
   Course = (course) => {
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

   componentDidMount = () => {
      let request = {
         url: `/prod/student-product/my-products`,

         headers: {
            'x-prod-user-id': this.props.auth.user_id,
            'x-prod-inst-id': this.props.auth.institute_id,
            'Authorization': this.props.auth.student_auth,
            "Source": "WEB"
         },

      }
      this.setState({ loader: true })
      api.getCustomAuth(request).then(data => {
         // this.setState({ cproducts: data.data.result })
         data.data.result.map((item,index)=>{
            if(item.expired == false){
               this.ongoingProduct.push(item)
               }
               else {
                     this.completedProduct.push(item)
               }
         })
         this.setState({ loader: false })

      }).catch((err) => {
         this.setState({ loader: false })
         if (err && err.response && err.response.status == 403) {
            { this.props.dispatch({ type: 'LOGOUT',msg:err.response.data.message }) }
         } else if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message)
         } else {
            toast.error(ErrorMessageHandling(err));
         }

      })
     
   }

   ChangeTab = (tab) => {
      this.props.dispatch({type: 'RETURN_TAB', tab})
   }

   render() {
    
      // const { products, cproducts } = this.state
      return (<>
         <div>
            {
               this.state.loader && <Loader />
            }
         </div>

         <Header />

         <ProductNav
            ChangeTab={this.ChangeTab}
            keys={this.props.tab}
            ongoing ={this.ongoingProduct.length}
            expire={this.completedProduct.length}
         />

         {
           this.props.tab == 'prod_ongoing'&&
           (
           
           this.ongoingProduct.length >0 ?
            this.ongoingProduct.map((item, index) => {
                  return (
                     <OngoingProd
                       item={item}
                        course_type={this.Course}
                        currency_code={item.country_details.currency_code}
                        descriptionPage={this.descriptionPage}
                     />
                     
                  )
               }):<NoProduct />)
               }
               {
            
                  this.props.tab !== 'prod_ongoing'&&
                  (
                  this.completedProduct.length > 0?
                  this.completedProduct.map((item, index) => {
                     return (
                        <OngoingProd
                          item={item}
                           course_type={this.Course}
                           currency_code={item.country_details.currency_code}
                           descriptionPage={this.descriptionPage}
                           key={this.props.tab}
                        />
                     )
                  }):<NoProduct />)
               

   }
   
  <ToastContainer />


      </>
      );
   }
}

const mapStateToProps = state => ({ auth: state.auth, tab: state.product.tab })
export default connect(mapStateToProps)(Product)