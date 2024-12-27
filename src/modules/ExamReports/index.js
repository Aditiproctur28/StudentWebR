import React from 'react'
import Header from '../../components/header';
import Nav from './nav'
import { connect } from 'react-redux'

class Exam extends React.Component  {
   constructor(props)
   {super(props);}
 
render(){
   return(
      <>
         <Header/>
         <Nav/>
      </>
   ) } }
const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(Exam)