import React, { useState,useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import auth from  "../../service/auth";
import { useAlert } from "react-alert";
import ValidatorService from '../../service/validater';
import Signuplogo from '../../assets/undraw_publish_post_vowb.svg'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";


function Signup() {
  const [userDetails, setUserDetails] = useState({ email: '', password: '',  });
  const alert = useAlert();
  const history = useHistory()
  const [loader, setloader] = useState("false")
  const [buttonHidden, setButtonHidden] = useState(true);

  const onSubmitHandler = async (e) => {
    setloader("true")
    e.preventDefault()
      const {  email, password} = userDetails;
      
      if (!ValidatorService.isEmail(email)) {
          alert.error('Please enter an valid email');
      }
      else if (!ValidatorService.isValidPassword(password)) {
          alert.error('Password should be greater than 6');
      } else {
          const user = await auth.signUpUser(userDetails);
          if (user) {
            
              alert.success(user.message, { timeout: 10000 });
              setloader("false")
              history.push("/login")
          } else {
              alert.error('Invalid credentails');
          }
      }
  }
  useEffect(() => {
    if(userDetails.email.length > 0 && userDetails.password.length > 0 ){
      setButtonHidden(false)
    }else{
      setButtonHidden(true)
    }
  }, [userDetails.email, userDetails.password])


  return (
    <div className="Form m-1">
      <div className="row no-gutters pt-5  justify-content-center p-4">
        <div className="col-lg-5 p-3 pt-5">
          <img
            src={Signuplogo}
            className="img-fluid"
            alt="Login Logo"
          />
        </div>
        <div className="col-lg-7">
          <h1 className="font-weight-bold text-grey">Sign Up</h1>
          <h4>Create an account</h4>
          <form id="signUpForm" action="">
            <div className="form-group form-row ">
              <div className="col-lg-7">
                <input
                  type="email"
                  name=""
                  id="username"
                  placeholder="Enter Email"
                  className="form-control my-3 p-2 "
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
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
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                />
              </div>
            </div>
           
             
            <div className="form-group form-row">
              <div className="col-lg-7 my-1" id="registerButtonDiv">
                <button
                  type="submit"
                  className="registerButton w-100 btn btn-outline-primary py-2"  onClick={onSubmitHandler}
                  disabled={buttonHidden}
                >
                  Register
                 
                </button>
                <div style={{zIndex:-1}}> <Loader type="ThreeDots" color="#00BFFF" height={160} width={160} visible={loader}  /></div>
              </div>
            </div>
           
           
            <p className="text-grey">
              Already have an account?
              <Link to="/login">
                
                <a>Sign In</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
