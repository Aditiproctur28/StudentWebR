import React from "react";
import './examBack.css'
import { connect } from 'react-redux'
import ExamNav from "./examNav";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api/api'
import ExamSchedules from "./MyExamCards";
import Loader from "../../components/loader";
import SearchImg from "../../assets/search/searchbar.png"
import { ErrorMessageHandling } from "../../components/error";
import ErrorBackdrop from "../../components/error_backdrop";

class MyNav extends React.Component {
 state =
{
  online_or_offline: "online",
  show_mock_practice_nav: true,
  is_schedules_view_open: false,
  choose_btn_online_mock_or_practice: "",
  test_type_id_of_choose_online_btn:"",
  online_card_sch_test_id: "",
  test_labels_data: {},
  offline_data: {},
  offline_label_array: [],
  offline_label_element: [],
  loader: false,
  total_schedules_digit: 0,
  label_id: -1,
  offline_choose_btn: "",
  Search:""
 ,error_backdrop_on:false,
 show_no_data_msg:1,

};

examnav_each_label_obj={}

componentDidMount()
{
  if (this.state.online_or_offline === "online") {
    this.OnlineTestLabelsApi();}
}

render(){
  return (
    <>
   <ToastContainer />
    {this.state.error_backdrop_on && <ErrorBackdrop onCancel={this.HandleErrorBackdrop} /> }
      {this.state.is_schedules_view_open === false
          ?
           <div >
           { this.state.loader&&<Loader/>}
            <nav className='live' style={{ display: "none" }} >
              <div className='live-menu'>
                <div className='live-item' onClick=
                  {
                    () => {
                      this.setState({ online_or_offline: "online" })
                      this.setState({ show_mock_practice_nav: true })
                      this.OnlineTestLabelsApi();
                    }
                  }
                >
                  <div className='live-links' style={this.state.online_or_offline === "online" ? { borderBottom: "5px solid #1954E7" } : {}}>
                    <span >Online</span>
                  </div>
                </div>
                <div className='live-item' onClick=
                  {
                    () => {
                      this.setState({ online_or_offline: "offline" })
                      this.OfflineTestLabelsApi();
                    }
                  }
                >
                  <div className='live-links' style={this.state.online_or_offline === "offline" ? { borderBottom: "5px solid #1954E7" } : {}} >
                    <span >Offline</span>
                  </div>
                </div>
              </div>
              <div className="Search_bar">
                  <form className="form_Style">
                      <input className="Search_Input"
                      type="text"
                    
                      placeholder="Search "
                      onChange={(e) => {this.setState({Search: e.target.value})}}                     
                  />
                  <button className="Search_button" ><img src={SearchImg}/></button>
              </form>
              </div>
            </nav>
            {<ExamNav online_or_offline={this.state.online_or_offline}
                show_mock_practice_nav={this.state.show_mock_practice_nav}
                choose_btn_online_mock_or_practice={this.state.choose_btn_online_mock_or_practice}
                test_labels_data={this.state.test_labels_data}
                ChildExamNav={this.HandleChildExamNav}
                changeSearch={this.changeSearch}
                offline_label_array={this.state.offline_label_array}
                offline_label_element={this.state.offline_label_element}
                offline_choose_btn={this.state.offline_choose_btn}
                ChildOffExamNav={this.HandleChildOffExamNav}
                setSearch={(Search) => this.setState({Search})}
                search={this.state.search}
              />
            }
                <div>
                <ExamSchedules
                  ChildExamSchedules3={this.HandleChildExamSchedules3}
                  online_or_offline={this.state.online_or_offline}
                  choose_btn_online_mock_or_practice={this.state.choose_btn_online_mock_or_practice}
                  test_type_id_of_choose_online_btn={this.state.test_type_id_of_choose_online_btn}
                  label_id={this.state.label_id}  
                  examnav_each_label_obj={this.examnav_each_label_obj}
                  test_labels_data={this.state.test_labels_data}
                  is_schedules_view_open={this.state.is_schedules_view_open}
                  offline_choose_btn={this.state.offline_choose_btn}
                  offline_data={this.state.offline_data}
                  offline_label_array={this.state.offline_label_array}
                  offline_label_element={this.state.offline_label_element}
                  Search= {this.state.Search}
                  show_no_data_msg={this.state.show_no_data_msg}
                />
                </div>      
           </div>
          :
            <></>
      }
    </>
  )
}

HandleErrorBackdrop = () =>
{
    this.setState({error_backdrop_on:false})
    window.location = '/dashboard'
}
changeSearch = (value) =>{
  this.setState({Search: value})
}
HandleChildExamSchedules3 = (loader_true_false) => {
  this.setState({ loader: loader_true_false })
}
HandleChildExamBack = (is_schedules_view) => {
  this.setState({ is_schedules_view_open: is_schedules_view })
}
HandleChildExamNav = (online_mock_or_practice, labelID,test_typ_id,label_obj) => {
  this.setState({ choose_btn_online_mock_or_practice: online_mock_or_practice, label_id: labelID,test_type_id_of_choose_online_btn:test_typ_id,show_no_data_msg:2})
  this.examnav_each_label_obj=label_obj
}
HandleChildOffExamNav = (label_name) => {
  this.setState({ offline_choose_btn: label_name })
}

OnlineGetTimeApi()
{
  let request = {
    url: `/examPanel/time`,
    token: this.props.auth.examdesk_auth_token,
  }

  api.getAuthExamW(request).then(response => {

  }).catch(error => {

    if (error && error.response && error.response.status == 403) {
      { this.props.dispatch({ type: 'LOGOUT', msg : error.response.message }) }
  } else if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message)
        this.setState({error_backdrop_on:true})    
  } else {
      toast.error(ErrorMessageHandling(error));   
  }
  })
}

OnlineTestLabelsApi()
{
  this.setState({loader:true})
  let request = {
    url: `/student/testLabels`,
    token: this.props.auth.examdesk_auth_token,
  }

  api.getAuthExamW(request).then(response => {
    if (response && response.data && response.data.data) {
      if(response.data.data.length>=1)
      {
        var atleast_one_mock_test=false
        var atleast_one_online_test=false
        for(var i=0;i<response.data.data.length;i++)
        {
          if(response.data.data[i].test_type_id==1)
          {atleast_one_mock_test=true}
          if(response.data.data[i].test_type_id==4)
          {atleast_one_online_test=true}
        }
        if(!atleast_one_mock_test && !atleast_one_online_test)
        {
          response.data.data.push({"label_id": "OnlineP","label_name": "Online exam","test_type_id": 4,"title": "Online Exam",})
          response.data.data.push({"label_id": "MockP","label_name": "Mock Test","test_type_id": 1,"title": "Mock Test",})
        }
        else if(!atleast_one_mock_test)
        {
          response.data.data.push({"label_id": "MockP","label_name": "Mock Test","test_type_id": 1,"title": "Mock Test",})
        }
        else if(!atleast_one_online_test)
        {
          response.data.data.push({"label_id": "OnlineP","label_name": "Online exam","test_type_id": 4,"title": "Online Exam",})
        }
      }
      else if(response.data.data.length==0)
      {
        response.data.data.push({"label_id": "OnlineP","label_name": "Online exam","test_type_id": 4,"title": "Online Exam",})
        response.data.data.push({"label_id": "MockP","label_name": "Mock Test","test_type_id": 1,"title": "Mock Test",})
      }

      this.setState({ test_labels_data: response.data })
      this.setState({ total_schedules_digit: response.data.data.length })
      response.data.data.length === 0 && this.setState({ show_mock_practice_nav: false })
      response.data.data.length === 0 && this.setState({ choose_btn_online_mock_or_practice: "" })
    }
    this.setState({loader:false})

  }).catch(error => {
   var product_test_labels_if_noexamdesk_schedules=
        {
          "data": [{
                  "label_id": "OnlineP",
                  "label_name": "Online exam",
                  "test_type_id": 4,
                  "title": "Online Exam",
              },
              {
                  "label_id": "MockP",
                  "label_name": "Mock Test",
                  "test_type_id": 1,
                  "title": "Mock Test",
              },
          ]
        }
  this.setState({test_labels_data:product_test_labels_if_noexamdesk_schedules})
    if (error && error.response && error.response.status == 403) {
      { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
  } else if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message)

        this.setState({error_backdrop_on:true})      
  } else {
    if(!(ErrorMessageHandling(error).toLowerCase())==="unauthorized")
    {
      toast.error(ErrorMessageHandling(error));
    }    
  }
  this.setState({loader:false})
  })
}

OnlineTestsApi(label_id)
{

  let request = {
    url: `/student/testLabels/${this.props.auth.account_id}/tests`,
    token: this.props.auth.examdesk_auth_token,
  }

  api.getAuthExamW(request).then(response => {
    toast.success("tests recived")

  }).catch(error => {
    if (error && error.response && error.response.status == 403) {
      { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
  } else if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message)
        this.setState({error_backdrop_on:true})    
  } else {
      toast.error(ErrorMessageHandling(error)); }
  })
}

OfflineTestLabelsApi()
{
  let request = {
    url: `/api/v1/reports/Student/${this.props.auth.stud_id}`,
    token: this.props.auth.student_auth,
  }

  api.getAuth(request).then(response => {
    this.setState({ line: response })
    toast.success("offline tests recived")
    if (response && response.data && response.data.pastCourseExamSchdJson && response.data.pastCourseExamSchdJson.length > 0) {
      var arr = []
      var brr = []
      response.data.pastCourseExamSchdJson.map((element, index) => {
        arr.push(element.course_Name)
        brr.push(element)})
      this.setState({ offline_label_array: arr })
      this.setState({ offline_label_element: brr })
    }
    if (response && response.data) {
      this.setState({ offline_data: response.data })
    }
  }).catch(error => {
    if (error && error.response && error.response.status == 403) {
      { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
  } else if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message)
        this.setState({error_backdrop_on:true})   
  } else {
      toast.error(ErrorMessageHandling(error)); }
  })
}

}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(MyNav)
