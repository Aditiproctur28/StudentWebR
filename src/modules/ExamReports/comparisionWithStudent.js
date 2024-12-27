import React from "react";
import './comparisionWithStudent.css'
import tick from '../../assets/products/tick.png'
import ghadi from '../../assets/products/ghadi.png'
import star from '../../assets/products/star.png'
import teer from '../../assets/products/teer.png'
import wrong from '../../assets/products/wrong.png'

function ComparisionWithStudent(props) {
     // percentage count when total question miss 
    function Percentage(right_question , wrong_question){
        var  percentage = (right_question*100 / (right_question +  wrong_question))
        if(percentage){ return(percentage.toFixed(2) + "%")  }
        else { return(percentage)}    
    }
    // persentage when total question present 
    function PercentageTotalQuestion(right_question , total_Question ){
        var percentage = (right_question * 100 / total_Question)
        if(percentage){ return(percentage.toFixed(2) + "%")}
        else {return(percentage) }
    }

    function time_convert(time) {
        var hr = ~~(time / 3600);
        var min = ~~((time % 3600) / 60);
        var sec = time % 60;
        var sec_min = "";
        if (hr > 0) {sec_min += "" + hr + ":" + ( min < 10 ? "0" : "");}
        sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
        sec_min += "" + sec;
        return sec_min ;
    }
    return (
        <> <div className="comparision-container" id="comparision-container">
                <div className="comparision-div">
                    <div className="comparision-div2">
                        <div className="comp-heading">
                            <div className="comparision-dot"></div>
                            <div className="comp-head">Exam Score</div>
                        </div>
                    </div>
                    <div className="comp-div" id="comp-div">
                        <table id="comp">
                            <tr>
                                <th>  Contenders</th>
                                <th><div className="comp-maindiv1"><img src={star} className="comp-img" /><div className="comp-heading2">Score</div></div></th>
                                <th><div className="comp-maindiv1"><img src={teer} className="comp-img" /><div className="comp-heading2">Accuracy</div></div></th>
                                <th><div className="comp-maindiv1"><img src={tick} className="comp-img" /><div className="comp-heading2">Correct</div></div></th>
                                <th><div className="comp-maindiv1"><img src={wrong} className="comp-img" /><div className="comp-heading2">Wrong</div></div></th>
                                <th><div className="comp-maindiv1"><img src={ghadi} className="comp-img" /><div className="comp-heading2">Time</div></div></th>
                            </tr>

                            <tr>
                                <td>You</td>
                                <td>{props.test_report.total_score}/{props.test_report.total_marks}</td>
                                <td>{Percentage(props.test_report.right_ques_count ,props.test_report.wrong_ques_count )}</td>
                                <td>{props.test_report.right_ques_count}/{props.test_report.right_ques_count + props.test_report.wrong_ques_count}</td>
                                <td>{props.test_report.wrong_ques_count}/{props.test_report.right_ques_count + props.test_report.wrong_ques_count}</td>
                                <td>{time_convert(props.test_report.total_attempted_time)}</td>
                            </tr>

                            <tr>
                                <td>Topper</td>
                                <td>{props.topper_report.marks_obtained}/{props.topper_report.maximum_marks}</td>
                                <td>{PercentageTotalQuestion(props.topper_report.total_correct_que, props.topper_report.total_attempted)}</td>
                                <td>{props.topper_report.total_correct_que}/{props.topper_report.total_attempted}</td>
                                <td>{props.topper_report.total_incorrect_que}/{props.topper_report.total_attempted}</td>
                                <td>{time_convert(props.topper_report.total_time_taken)}</td>

                            </tr>

                            <tr>
                                <td>Average</td>
                                <td>{props.average_report.marks}/{props.test_report.total_marks}</td>
                                <td>{PercentageTotalQuestion(props.average_report.correct, props.average_report.attempted)}</td>
                                <td>{props.average_report.correct}/{props.average_report.attempted}</td>
                                <td>{props.average_report.incorrect}/{props.average_report.attempted}</td>
                                <td>{time_convert(props.average_report.time_taken)}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ComparisionWithStudent;