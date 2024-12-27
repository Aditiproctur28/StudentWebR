import ReactDOM from "react-dom";
import "./css/profile/profile.css";
import "./css/timetable/timetable.css";
import "./css/profile/profile_popup.css";
import "./css/backdrop.css";
import "./css/timetable/tt_timetable_popups.css";
import "./css/timetable/tt_download_recording_popup.css";
// import './css/timetable/callendar.css'
import "./css/loader.css";
import "./css/dashboard/dashboard.css";
import "./css/header/profile_module.css";
import "./css/header/header_module.css";
import "./css/login/login.css";
import "./css/timetable/calendar_timetable2.css";
// import './header_module.css'
import "./css/header/header_module.css";

import App from "./App";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootstore, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={rootstore}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'))
