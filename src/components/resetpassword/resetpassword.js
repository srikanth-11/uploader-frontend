import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import auth from '../../service/auth';
import validator from '../../service/validater'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";
import resetlogo from '../../assets/undraw_secure_login_pdn4.svg'
import { useAlert } from 'react-alert';

function Resetpassword() {

  const [password, setPassword] = useState('');
  const [loader, setloader] = useState("false")
  const [buttonHidden, setButtonHidden] = useState(true);



  const params = useParams();
  const alert = useAlert();
  const history = useHistory()


  const onSubmitHandler = async (e) => {
    setloader("true")
    e.preventDefault()
    if (validator.isValidPassword(password)) {
      const data = {
        password,
        token: params.resetToken
      }
      const res = await auth.resetPassword(data);
      if (res) {
        alert.success(res.message);
        setloader("false")
        history.push('/login');
      } else {
        alert.error('Token expired');
      }
    } else {
      alert.error('Password should be greater than 6');
    }
  }
  useEffect(() => {
    if (password.length > 0) {
      setButtonHidden(false)
    } else {
      setButtonHidden(true)
    }
  }, [password])


  return <div className="Form m-1">

    <div
      className="row no-gutters pt-5 shadow-lg justify-content-md-center p-4"
    >
      <div className="col-lg-5 p-3 pt-5">
        <img
          src={resetlogo}
          className="img-fluid"
          alt="Login Logo"
        />
      </div>
      <div className="col-lg-7">
        <h1 className="font-weight-bold">Reset Password</h1>

        <form id="resetPasswordForm" action="">

          <div className="form-group form-row">
            <div className="col-lg-7 py-2">
              <input
                type="password"
                name=""
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="form-control"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
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
                Reset Passowrd
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
export default Resetpassword;