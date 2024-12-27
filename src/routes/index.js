import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { siteRoutes, dashboardRoutes } from "./allroutes";
import moment from "moment";

function ParamsExample(props) {
  const [currTime, setcurrTime] = useState(new Date());
  const favicon = document.getElementById("favicon");
  favicon.href = localStorage.getItem('feviconIcon');
  useEffect(() => {
    if (
      moment(currTime).format("YYYY-MM-DD") !=
      moment(props.logindatetime).format("YYYY-MM-DD")
    ) {
      props.dispatch({ type: "LOGOUT" });
    }
  }, []);


  function PrivateRoute({ children, ...rest }) {
    return (
      <Route {...rest} render={({ location }) =>
        props.user_id !== 0 ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
      />
    );

  }


  return (
    <Router>
      <Switch>
        {
          siteRoutes.map((routes, i) => {
            return (
              <Route key={i}
                path={routes.path}
                exact={routes.exact}
                strict={routes.strict}
                children={<routes.component />}
              />
            )

          })

        }

        <PrivateRoute path="/">
          <Switch>
            {
              dashboardRoutes.map((routes, i) => {
                return (
                  <Route key={i}
                    path={routes.path}
                    exact={routes.exact}
                    strict={routes.strict}
                    children={<routes.component />}
                  />
                )
              })
            }
          </Switch>
        </PrivateRoute>
      </Switch>
    </Router>
  )
}


const mapStateToProps = state => ({ 
  user_id: state.auth.user_id,
  logindatetime: state.auth.logindatetime,
  student_auth: state.auth.student_auth,
})
export default connect(mapStateToProps)(ParamsExample)
