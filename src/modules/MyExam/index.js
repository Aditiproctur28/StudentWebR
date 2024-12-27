import React from 'react'
import Header from '../../components/header';
import MyNav from './nav'
import { connect } from 'react-redux'

class MyExam extends React.Component  {
   constructor(props)
   {super(props);}
 
render(){
   return(
      <>
         <Header/>
         <MyNav/>
       </>
   )
}
}
const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(MyExam)