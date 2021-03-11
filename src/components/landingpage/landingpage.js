import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
import './Greeting.css'
import './Contact.css'
import { Fade } from "react-reveal";
import emoji from "react-easy-emoji";
import Headroom from "react-headroom";
import Button from "../../components/button/Button";


function Landingpage() {

  return <>

    <Headroom>
      <header className="header">
        <a href="#" className="logo">
          <span className="grey-color"> </span>
          <span className="logo-name">Uploader<sup>2</sup></span>
          <span className="grey-color"></span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
        <Link to="/login">
          <li>
            <a>Login</a>
           
          </li>
          </Link>
          <Link to="/signup">
          <li>
            <a>Signup</a>
           
          </li>
          </Link>
        </ul>
      </header>
    </Headroom>
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className="greeting-text" id="type">
                {" "}
                <span className="wave-emoji">{emoji("👋")}</span>
                <span>welcome to uploder<sup>2</sup></span>

                {" "}

              </h1>
              <p className="greeting-text-p subTitle">It is a all in one solution for your space saving mode.You can store anything you want.</p>

              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
               </div>
            </div>
          </div>
          <div className="greeting-image-div">
            <img
              alt="srikanth sitting on table"
              src={require("../../assets/myimage.svg").default}
            ></img>
          </div>
        </div>
      </div>
    </Fade>
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title"> {emoji("Contact Me ☎️")}</h1>
            <p className="subTitle contact-subtitle">Contact us for any problems about our product</p>

            <div className="contact-text-div">
              <a className="contact-detail" href="tel:9848282503">
                9848282503
              </a>
              <br />
              <br />
              <a
                className="contact-detail-email"
                href="mailto:kasireddysrikanth27@gmail.com"
              >
                kasireddysrikanth27@gmail.com
              </a>
              <br />
              <br />

            </div>
          </div>

        </div>
      </div>
    </Fade>
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className="footer-text">
          {emoji("Made with ❤️ by Srikanth Kasireddy")}
        </p>
      </div>
    </Fade>

  </>
}
export default Landingpage;