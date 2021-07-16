import Signup from './Signup';
import {AuthenticationProvider} from './authenticationContext';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';
import Users from './Datatable';
import EditUserInfo from './EditUserInfo';


function App() {
  return (
         <Router>
          <AuthenticationProvider>
            <Switch>
                  <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>
                  <PrivateRoute exact path="/" component={Dashboard}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/login" component={Login}/>
                  <PrivateRoute path="/Users" component={Users}/>
                  <PrivateRoute path="/EditUserInfo/:id" component={EditUserInfo}/>
            </Switch>
          </AuthenticationProvider>
        </Router>
  )
}

export default App;
