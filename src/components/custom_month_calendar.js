import React,{useState,Component} from 'react'
import { connect } from 'react-redux'
// import api from '../../../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


    

 class Callendar extends React.Component  {
        constructor(props)
        {
          super(props);
          this.state = {
            daysArr: []  
          };    
        }

     Cal = () => {
     var d=new Date()
     var curr_day=d.getDate
     var curr_month=d.getMonth()
     var  curr_year=d.getFullYear()
     var dates_day=d.getDay()
   
     var first = new Date(d.getFullYear(), d.getMonth(), 1);
     var first_day=first.getDay()

     var last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
     var last_day=last.getDay()

     var total_days_in_month=new Date(d.getFullYear(), d.getMonth()+1, 0);
     var total_days=total_days_in_month.getDate()

     let arr=[[],[],[],[],[],[] ]
    //  arr.push([])
    
     var date=1
     var index=0
     var loopcount=1
     var curr_arr_child=0

     while(loopcount<=42)
     {
         
        if ((index<first_day) || (date>total_days) )
        {
            index++;
            arr[curr_arr_child].push("");
        }
        else if ((index>=first_day) && (date<=total_days))
        {
           index++;
           arr[curr_arr_child].push(date)
           date++;
        }

        if(arr[curr_arr_child].length==7)
        {
            curr_arr_child++        
        }
        loopcount++;
     }

     this.setState({daysArr: arr})
     
       
    }

    componentDidMount(){
        this.Cal()
    }

render()
{
  return (
      <>
      <div>
      { this.props.val==='month'
      
      ? 


      <div  style={{border:"2px solid blue"}} onClick={this.Cal}>
       month days view.
       <table className='tt_table_calendar2' >
           <tr>
               <th>Sun</th>
               <th>Mon</th>
               <th>Tue</th>
               <th>Wed</th>
               <th>Thur</th>
               <th >Fri</th>
               <th>Sat</th>
           </tr>
           {
               this.state.daysArr.map((weeks, index) => <tr key={index}>
                   {
                       weeks.map((days, index2) => <td key={index2}>{days}</td>)
                    //    weeks.map((days, index2) => <td key={index2}>{printDayData(days)}</td>)
                   }
               </tr>)
           }
       </table>

     </div>


    :


     <div style={{border:"2px solid red"}}>
     year month view.
     </div>
 }

</div>

 </>
 

  )
}
}


const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(Callendar)









