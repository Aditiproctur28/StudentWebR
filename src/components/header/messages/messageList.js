import React from "react";
import "./messages.css";

const MessageList = (props) => {
  return (
    <>
      <div>
        {props.message.map((data, index) => {
          return (
            <>
              <div className="messagelistmaindiv">
                <div className="msgs">
                  <p>{data.msg}</p>
                </div>
                <div className="msgtime">
                  <p>{data.time}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default MessageList;
