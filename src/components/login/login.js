import React, { useState, useEffect } from 'react';
import Loginlogo from '../../assets/undraw_Login_re_4vu2.svg'
import { Link, useHistory } from 'react-router-dom';
import auth from "../../service/auth";
import { useAlert } from "react-alert";
import ValidatorService from '../../service/validater';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";


function Login() {
  const history = useHistory();
  const alert = useAlert();

  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const [loader, setloader] = useState("false")
  const [buttonHidden, setButtonHidden] = useState(true);

  const onSubmitHandler = async (e) => {
    setloader("true")
    e.preventDefault()
    if (!ValidatorService.isEmail(userCredentials.email)) {
      alert.error('Please enter an valid email');
    } else if (!ValidatorService.isValidPassword(userCredentials.password)) {
      alert.error('Password should be greater than 6');
    }
    const data = await auth.signInUser(userCredentials);
    console.log(data)
    if (data) {
      alert.success(data.message);
      setloader("false")
      history.push('/app');
    } else {
      alert.error('Unable to login');
    }

  }
  useEffect(() => {
    if (userCredentials.email.length > 0 && userCredentials.password.length > 0) {
      setButtonHidden(false)
    } else {
      setButtonHidden(true)
    }
  }, [userCredentials.email, userCredentials.password])

  return (
    <div className="Form m-1">
      <div className="row no-gutters pt-5 shadow-lg justify-content-md-center p-4">
        <div className="col-lg-5 p-3 pt-5">
          <img
            src={Loginlogo}
            className="img-fluid"
            alt="Login Logo"
          />
        </div>
        <div className="col-lg-7">
          <h1 className="font-weight-bold text-grey">Login</h1>
          <h4>Sign In to your account</h4>
          <form id="loginForm" action="">
            <div className="form-group form-row">
              <div className="col-lg-7">
                <input
                  type="email"
                  name=""
                  id="username"
                  placeholder="Enter Email"
                  className="form-control my-3 p-2"
                  value={userCredentials.email}
                  onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group form-row">
              <div className="col-lg-7 py-2">
                <input
                  type="password"
                  name=""
                  id="password"
                  placeholder="*********"
                  className="form-control"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={userCredentials.password}
                  onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                />
              </div>
            </div>

            <div className="form-group form-row">
              <div className="col-lg-7 my-1" id="loginButtonDiv">
                <button
                  type="submit"
                  className="loginButton w-100 btn btn-outline-primary py-2" disabled={buttonHidden} onClick={onSubmitHandler}
                >
                  Login
                </button>
                <div style={{ zIndex: -1 }}> <Loader type="ThreeDots" color="#00BFFF" height={160} width={160} visible={loader} /></div>
              </div>
            </div>
            <p>
              Forgot Password? <Link to="/forgotpassword">
                <a>Change Here</a></Link>
            </p>

            <p>
              Dont have an account?<Link to="/signup">
                <a>Register Here</a></Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
