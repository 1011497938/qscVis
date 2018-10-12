import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import BigWindows from 'pages/Big/BigWindows';

const getRouter = () => (

    <Router>
      <Switch >
        <Route exact path="/" component={BigWindows}/>
      </Switch>
    </Router>

)
export default getRouter