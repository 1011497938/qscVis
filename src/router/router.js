import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Home from 'pages/Home/Home';

const getRouter = () => (

  // <HashRouter>
    <Router>
    {/* <div>   */}
      {/* <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page1">Page1</Link></li>
        <li><Link to="/map">热力图</Link></li>
      </ul> */}
      <Switch >
        <Route path="/" component={Home}/>
      </Switch>
    {/* </div> */}
    </Router>
  // </HashRouter>

)
export default getRouter