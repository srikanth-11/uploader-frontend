import logo from './logo.svg';
import './App.css';
import FileUpload from './components/fileupload/fileupload'
import Forgotpassword from './components/forgotpassword/forgotpassword'
import Resetpassword from './components/resetpassword/resetpassword'
import Landingpage from './components/landingpage/landingpage'
import Signup from './components/signup/signup'
import Login from './components/login/login'
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ProtectedRoute from './components/protected-route/protectedroute'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const options = {
    timeout: 3000,
    position: positions.TOP_RIGHT
  };
  return <> <Provider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/app" component={FileUpload} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Landingpage}/>
        <Route exact path="/forgotpassword" component={Forgotpassword} />
        <Route path="/resetpassword/:resetToken" component={Resetpassword} />
      </Switch>
    </BrowserRouter>


  </Provider>
  </>
}


export default App;
