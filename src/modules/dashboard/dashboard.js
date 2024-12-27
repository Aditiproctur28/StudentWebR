import empty_dash from '../../assets/dashboard/empty_dashboard.png';
import Header from '../../components/header';
import { connect } from 'react-redux';
import Vimeo from '../../components/popupVimeo/vimeo';
import './dashboard.css'
import { useEffect, useState } from 'react';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var today = new Date();
var date = today.getDate() + '-' + monthNames[(today.getMonth())] + '-' + today.getFullYear();


function greeting() {
  if (today.getHours() >= 0 && today.getHours() < 12) {
    return "Good Morning";
  } else if (today.getHours() == 12) {
    return "Good Noon";
  } else if (today.getHours() >= 12 && today.getHours() <= 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}




function Dashboard(props) {

  let [time, setTime] = useState("")
  let [ampm, setAmpm] = useState("AM")

  useEffect(() => {
    const timeout = setInterval(() => {
      let d = new Date(); //object of date()
      let hr = d.getHours();
      let min = d.getMinutes();
      let sec = d.getSeconds();
      let hr_rotation = 30 * hr + min / 2; //converting current time
      let min_rotation = 6 * min;
      let sec_rotation = 6 * sec;
      document.getElementById('hour').style.transform = `rotate(${hr_rotation}deg)`;
      document.getElementById('minute').style.transform = `rotate(${min_rotation}deg)`;
      document.getElementById('second').style.transform = `rotate(${sec_rotation}deg)`;



      let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours()
      let minn = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
      let secc = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()
      var ampm = today.getHours() >= 12 ? 'PM' : 'AM';
      let time = hour + ":" + minn + ":" + secc;
      setTime(time)
      setAmpm(ampm)
    }, 1000);
    return () => clearTimeout(timeout);
  }, [])

  const moment=require('moment')

  const dayss=()=>{
    let day= moment().format("dddd");
    let qoutess=""
     if (day=="Monday"){
      qoutess= "Teacher can open the door, but you must enter it yourself"
    }else if(day=="Tuesday"){
      qoutess=  "Every student can LEARN, just not on the same day or in the same way."
    }else if(day=="Wednesday"){
      qoutess=  " Avoid time-pass and do work for more and more output."
    }else if(day=="Thursday"){
      qoutess=  "Your only limit is your mind."
    }else if(day=="Friday"){
      qoutess= " Avoid time-pass and do work for more and more output."
    }else if(day=="Saturday"){
      qoutess= "Study hard and see the magic"
    }else if(day=="Sunday"){
      qoutess=  "It’s not the time to look for excuses."
    }
   return qoutess
  }
  let qoutess=dayss()



  return (
    <>
      <Header />
      <div className='dashboard_container'>
        <div class="outter-cover-student-homepage">
          <div class="inner-cover-student-homepage">
            <p class="name-student-homepage">
              {greeting()}, {props.auth.parentslogin ? props.auth.parent_name :(props.auth.name ? props.auth.name: "User" ) }!
            </p>
            <div class="clock-student-homepage">
              <div class="wrap-student-homepage">
                <span id="hour" class="hour-student-homepage"></span>
                <span class="minute-student-homepage" id="minute"></span>
                <span class="second-student-homepage" id="second"></span>
                <span class="dot-student-homepage"></span>
                <span class="mark-time-6-student-homepage"></span>
                <span class="mark-time-12-student-homepage"></span>
                <span class="mark-time-3-student-homepage"></span>
                <span class="mark-time-9-student-homepage"></span>
              </div>
            </div>
            <p class="time-student-homepage" id="time">{time}<sup>{ampm}</sup></p>
            <p class="date-student-homepage">
              {date}
            </p>
            <p class="qoutes-student-homepage"> {qoutess}
              </p>
          </div>
        </div>

      </div>
    </>
  )
}

// export default Dashboard

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Dashboard)
