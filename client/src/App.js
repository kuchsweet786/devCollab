import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Signin from './pages/sign-in/sign-in';
import Signup from './pages/sign-up/sign-up';
import FindProjectForm from "./pages/findProjectForm/findProjectForm";
import SubmitProjectForm from "./pages/submitProjectForm/submitProjectForm.js";
import Navbar from "./components/navbar/navbar";
import Homepage from "./pages/home-page/home-page";
import Footer from "./components/footer/footer";


const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
      <Route
          exact
          {...rest}
          render={(props) => (isAuthenticated)
              ? <Component {...props} />
              : <Redirect to={{pathname: '/signin'}}/>}
      />
  )
};

const PublicRoute = ({component: Component, ...rest}) => {
  return (
      <Route
          exact
          {...rest}
          render={(props) => (!isAuthenticated) ? <Component {...props} /> : <Redirect to={{pathname: '/'}} /> }
      />
  )
};

const App = (props) => (
  
  <Router> 
    <div>
      <Navbar />
      <Switch>
        <PublicRoute exact path="/" component={Homepage}/>
        <PublicRoute exact path="/signup" component={Signup}/>
        <PublicRoute exact path="/signin" component={Signin}/>
        <PublicRoute exact path="/findproject" component={FindProjectForm} />
        <PublicRoute exact path="/submitproject" component={SubmitProjectForm} />
        {/* private routes will be project submit & project find page */}
      </Switch>
      <Footer />
      </div>
  </Router>
 
)


export default App;
