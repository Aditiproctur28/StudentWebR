import noclassimg from '../../assets/timetable/tt_no_class.png'

function NoSchedule(props) {
    return (<div>
    
      {props.view==="month" 
?
      <div className='inner_container_no_class_tt'>
        <center>
          <div className='text_n_image_container_no_class'>
            <center><div>
              <div className='text_div_no_class_tt'>
                Schedule not Found On Selected Date
              </div>
              </div>
            </center>
            <div className="tt_noschedule_image_container">
            <div className='image_div_no_class_tt'>
              
                <img src={noclassimg} />
              
            </div>
            </div>
          </div>
        </center>
      </div>

 :
 
       
 <div className='inner_container_no_class_tt'>
 <center>
   <div className='text_n_image_container_no_class'>
     <center><div>
       <div className='text_div_no_class_tt'>
       Choose Month to view Live class, Exam’s, classes
       </div>
       </div>
     </center>
     <div className="tt_noschedule_image_container">
     <div className='image_div_no_class_tt'>
       
         <img src={noclassimg} />
       
     </div>
     </div>
   </div>
 </center>
</div>
           
   }
   </div>
    )
  } 

  export default NoSchedule