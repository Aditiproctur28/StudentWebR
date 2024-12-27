import React from 'react';
import Past_Uplode_file from './past_uplode_file_pdf';
import Past_Submit_assignment_link from './past_submit_assignment_link';


const Past_submit_assignment = (props) => {
    return (<>
        <div style={{ paddingTop: "32px" }}>
            <div style={{height:"220px" , overflow:"auto"}}>
                <div >
                    {
                        props.submitassigment.map((data, index) => {
                            return (
                                !data.attachment_url && <Past_Uplode_file key={index} name={data.attachment_display_name} attachment_id={data.attachment_id} />
                            )
                        })
                    }

                </div>
                <div>
                    {
                        props.submitassigment.map((data, index) => {
                            return (
                                data.attachment_url && <Past_Submit_assignment_link key={index} link_name={data.attachment_display_name} link={data.attachment_url} />
                            )
                        })
                    }

                </div>
            </div>
            <div className="pastview_sub_ass_remark">
                <p className="remark_title">Remarks</p>
                {props.stdComment ? <label style={{ wordBreak: "break-all" }}>{props.stdComment}</label> : <label>-</label>}

            </div>
        </div>
    </>)
}

export default Past_submit_assignment;