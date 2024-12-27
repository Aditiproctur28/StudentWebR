import React from "react";
import correctAnsIcon from "../../../../assets/exam/answer.png";
const CurrectAnswer = (props) => {
    const alphabates = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const setAnswer = (item) => {
        if(item!= null){
        let data = item.split(",")
        let dat = ""
        data.map((item, index) => {
            if(index == 0){
                dat = dat + alphabates[item - 1]
            }
            else{
                dat = dat + " , " + alphabates[item - 1]
            }
        })
        return (dat)
    }
    else{
        return null
    }
    }

    return (<>
        <div style={{ marginTop: "32px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={correctAnsIcon} height={24} width={24} />
                <p className="feedbacktitle"> Correct Answer</p>
                <div className="stateLine" style={{ width: "85%" }}></div>
            </div>
            <div>
                {
                    props.ques_type == 5 ?  <p className="feedbackmsg"> Option {props.correct_ans == 1 ? "true" : "false"} is correct</p> :
                    <p className="feedbackmsg"> Option ({setAnswer(props.correct_ans)}) is correct</p>
                }
                
            </div>
        </div>
    </>)
}
export default CurrectAnswer;
