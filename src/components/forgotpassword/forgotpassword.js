import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';
import auth from '../../service/auth'
import validator from '../../service/validater'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import forgotlogo from '../../assets/undraw_forgot_password_gi2d.svg';



function Forgotpassword() {

  const initialEmail = '';
  const [email, setEmail] = useState(initialEmail);
  const [loader, setloader] = useState("false")
  const [buttonHidden, setButtonHidden] = useState(true);
  const alert = useAlert();
  const history = useHistory();

  const onSubmitHandler = async (e) => {
    setloader("true")
    e.preventDefault()
    if (validator.isEmail(email)) {
      const res = await auth.forgotPassword({ email });
      if (res) {
        alert.show(res.message);
        setloader("false")
        history.push('/login');
      }
    } else {
      alert.error('Please enter an valid email');
    }
  }
  useEffect(() => {
    if (email.length > 0) {
      setButtonHidden(false)
    } else {
      setButtonHidden(true)
    }
  }, [email])


  return <div className="Form m-5">

    <div
      className="row no-gutters pt-5 shadow-lg justify-content-md-center p-4"
    >
      <div className="col-lg-5 p-3 pt-5">
        <img
          src={forgotlogo}
          className="img-fluid"
          alt="Login Logo"
        />
      </div>
      <div className="col-lg-7">
        <h1 className="font-weight-bold mt-5">Forgot Password?</h1>

        <form id="forgetPasswordForm" action="">
          <div className="form-group form-row">
            <div className="col-lg-7">
              <input
                type="email"
                name=""
                id="username"
                placeholder="Enter Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="form-control my-3 p-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group form-row">
            <div className="col-lg-7 my-1">
              <button
                type="submit"
                className="resetButton w-100 btn btn-outline-primary py-2"
                disabled={buttonHidden}
                onClick={onSubmitHandler}

              >
                Reset Password
       </button>
              <div style={{ zIndex: -1 }}> <Loader type="ThreeDots" color="#00BFFF" height={160} width={160} visible={loader} /></div>
            </div>
          </div>
          <p>
            Dont have an account?  <Link to="/signup"><a>Register Here</a></Link>
          </p>
          <p>Already have an account? <Link to="/login">
            <a>Login</a></Link></p>

        </form>
      </div>
    </div>

  </div>
}
export default Forgotpassword;