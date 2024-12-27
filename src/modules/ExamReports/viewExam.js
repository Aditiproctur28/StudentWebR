import React, { useEffect } from 'react'
import './viewExam.css'
import can from '../../assets/products/can.png';
import { Bar} from 'react-chartjs-2';

function ViewExam(props){
    
    const data = {
        labels: [],
        datasets: [
        {label: 'wrong',data: [],backgroundColor: ['black'],borderWidth: 1 },
        {label: ' right', data: [], backgroundColor: ['green'],legend: {display: true,labels: {fontColor: 'rgb(255, 99, 132)',fontSize: 25} },borderWidth: 1},
        {label: ' left', data: [],backgroundColor: ['blue'],borderWidth: 1},
        ]  
    }

    useEffect(()=>{
        props.subject_wise_distribution.map((key, index)=>{
        data.labels.push(key.subject_name.substr(0,20))
        data.datasets[0].data.push(key.wrong_ques_count)
        data.datasets[1].data.push(key.right_ques_count)
        data.datasets[2].data.push(key.left_ques_count)
    })},[])
    
    return(
        <>
        <center>
         <div className="pop-up-box-exam">
             <div className="box-exam">
                 <div>
                  <div ><button className="can-button" onClick={props.handleClose}><img src={can}/></button></div>
                  </div>
                  <div className="view-exam-div">Subject Wise Performance </div>
                  <div style={{display:"flex" , alignItems:"center" , fontSize:"10px"}}>
                <div style={{marginRight:"5px"}}>Total No of<br/>Questions</div>
                  <div width="500" height="500">
                    <Bar data={data}  width="400" height="250"   />
                  </div>
                </div>
             </div> 
         </div>
         </center>
        </>
    )
}
export default ViewExam;