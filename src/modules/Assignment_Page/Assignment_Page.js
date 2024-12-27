import React, { useState, useEffect } from 'react';
import '../../css/assignment/Assignment_module.css';
import Search from '../../components/Search/Search';
import Ongoing_page from './OngoingClasses/Ongoing';
import AssiPastClasses from './PastClasses';
import Assignment_Img from '../../assets/assignment/Assignment_Img.png';
import Header from '../../components/header';
import { connect } from 'react-redux';
import api from '../../api/api';
import Loader from '../../components/loader';
import { ErrorMessageHandling } from '../../components/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var ongoingstatus = ['Select Status', 'Pending', 'Draft', 'Submitted', 'Evaluated']
var paststatus = ['Select Status', 'Submitted', 'Not Submitted', 'Evaluated', 'Expired'];


const Assigment = (props) => {
    const [defOpen, setdefOpen] = useState(new URLSearchParams(window.location.Search))
    const [search, setsearch] = useState("")
    const [fstatus, setfstatus] = useState('Select Status')
    const [assignmentTyp, setAssignmentTyp] =  useState("ongoingAssign")
    const [loaderflag, setloaderflag] = useState(true)
    const [change_classes, setchange_classes] = useState(true)
    const [upcoming_online_assignment_list, setupcoming_online_assignment_list] = useState([])
    const [past_online_assignment_list, setpast_online_assignment_list] = useState([])
    const onSelectStatus = () => {
        setfstatus(document.getElementById("Select_status").value);
    }

    const url = window.location.href
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const defaultTab = searchParams.get('open');
        if (defaultTab === '999') {
            onClickPast()
        }

    }, [])



    const onClinkOngoing = () => {
        setchange_classes(true)
        //  window.location = `/assignment`
        setAssignmentTyp("ongoingAssign")
    }
    const onClickPast = () => {
        setchange_classes(false)
        setAssignmentTyp("pastAssign")
    }

    useEffect(() => {

        let request = {
            url: '/api/v2/onlineAssignment/student/getAssignmentsDetail',
            token: props.auth.student_auth,
            data: {
                category_id: 255,
                institute_id: props.auth.institute_id,
                student_id: props.auth.student_id
            }
        }

        api.postAuth(request).then(data => {
            setloaderflag(false)
            setupcoming_online_assignment_list(data.data.result.upcoming_online_assignment_list)
            setpast_online_assignment_list(data.data.result.past_online_assignment_list)

        }).catch((err) => {
            setloaderflag(false)
            if (err && err.response && err.response.status == 403) {
                { props.dispatch({ type: 'LOGOUT',msg:err.response.data.message }) }
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message)
                setloaderflag(false)
                window.location = '/dashboard'
            } else {
                toast.error(ErrorMessageHandling(err));
                setloaderflag(false)
            }

        })

    }, []);



    return (<>

        <div>
            {loaderflag && <Loader />}
        </div>
        <Header />
        <div style={{ paddingBottom: "25px", backgroundColor: 'fafafa' }}>
            <div style={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: '1px' }}>
                <button className={assignmentTyp == "ongoingAssign" ?"Active":"Inactive"} onClick={onClinkOngoing}>Ongoing</button><lable className="class_count_lable">{String(upcoming_online_assignment_list.length).padStart(1, '0')}</lable>
                <button className={assignmentTyp == "pastAssign" ?"Active":"Inactive"} onClick={onClickPast}>Past </button><lable className="class_count_lable">{String(past_online_assignment_list.length).padStart(1, '0')}</lable>
                <div className="Assignment_Search_bar">
                    <div className="Assignment_Select_bar">
                        <form style={{ paddingRight: '10px', paddingLeft: '10px', border: '1px solid #EDEAEA', backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: '5px' }} >

                            <select className="Select_status" id="Select_status" onChange={onSelectStatus}>

                                {
                                    assignmentTyp == "ongoingAssign" ? (ongoingstatus.map((data, index) => {
                                        return (
                                            <option key={index} value={data}>{data}</option>)
                                    }
                                    )) : (paststatus.map((data, index) => {
                                        return (
                                            <option key={index} value={data}>{data}</option>)
                                    }

                                    ))
                                }

                            </select>
                        </form>
                    </div>
                    <div className="Assignment_Search_bar_button">
                        <Search setsearch={setsearch} In={1} />

                    </div>
                </div>
                <div style={{ marginLeft: '15px', marginRight: '15px' }}>
                    {
                        change_classes ? (
                            (upcoming_online_assignment_list.length !== 0) ? (
                                <Ongoing_page
                                    classes={upcoming_online_assignment_list}
                                    search={search}
                                    fstatus={fstatus}
                                />
                            ) :
                                (<div className="assignment_main_div">
                                    <div className="no_assignment">
                                    {props.auth.is_institute_type_school ? (
                                   <p>No Homework is available yet! </p>
                                ) : (
                                   <p>No Assignment is available yet! </p>
                                )}
                                    </div>
                                    <div className="no_assignment_img">
                                        <img src={Assignment_Img} />
                                    </div>
                                </div>)
                        ) : ((past_online_assignment_list.length !== 0) ?
                            (<AssiPastClasses
                                past_online_assignment_list={past_online_assignment_list}
                                search={search}
                                fstatus={fstatus}
                            />
                            ) :

                            (<div className="assignment_main_div">
                                <div className="no_assignment">
                                {props.auth.is_institute_type_school ? (
                                   <p>No Homework is available yet! </p>
                                ) : (
                                   <p>No Assignment is available yet! </p>
                                )}
                                </div>
                                <div className="no_assignment_img">
                                    <img src={Assignment_Img} />
                                </div>
                            </div>))
                    }

                </div>
            </div>
        </div>
        <ToastContainer />
    </>)

}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Assigment)
