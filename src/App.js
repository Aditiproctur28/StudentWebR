import Header from "./components/header/index";
import Login from "../src/modules/login/login";
import Routes from "./routes";
import Loader from "./components/loader";
import moment from "moment";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import config from "./config";

function App(props) { 
  // useEffect(() => {
  // if(config.env ==="prod"){
  //   document.addEventListener('contextmenu', event => event.preventDefault());
  //   document.onkeydown = function (e) {
  //     if(e.keyCode == 123) {
  //       return false;
  //     }
  //     if(e.ctrlKey && e.shiftKey && e.keyCode == 73){
  //       return false;
  //     }
  //     if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
  //       return false;
  //     }
  //     if(e.ctrlKey && e.keyCode == 85) {
  //       return false;
  //     }
  //   }
  // }
  //  }, [])
  return (
    <div>
      <Routes />
    </div>
  );
}

// export default App

export default App;
