import React, { useState, useEffect } from "react";
import { useHistory,Link } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import ModalImage from "react-modal-image";
import auth from "../../service/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Carddetails() {
  const alert = useAlert();
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  let token = localStorage.getItem("token");
  let myemail = parseJwt(token).email;
  let youremail = myemail.slice(0, -10);

  const [file, setFile] = useState([]);
  const [loader, setloader] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      setloader("true");
      const result = await axios.get(
        "https://sri-uploader.herokuapp.com/files",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      if (result) {
        setloader("false");
      } else {
        alert.error("there are no files");
      }
      console.log(result.data.data);
      setFile(result.data.data);
    };

    fetchData();
  }, []);
  let history = useHistory();
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
  async function deletedata(id) {
    const data = {
      nanoid: id,
      authorization: token,
    };
    const result = await axios.delete(
      "https://sri-uploader.herokuapp.com/deletefile",
      {
        data,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    if (result) {
      alert.success(result.data.message);
      window.location.reload();
    } else {
      alert.error("there are no files");
    }
  }
  console.log(file);
  return (
    <div className="container-fluid">
      <h1 style={{ justifyContent: "center", textAlign: "center" }}>
        {" "}
        UPLODER<sup>2</sup>
      </h1>
      <div className="h5 mb-0 font-weight-bold text-danger">
     <Link to="/upload">
        <button className="btn btn-primary float-left" >
        upload your files
        </button>
        </Link> 
      </div>
      <div className="h5 mb-0 font-weight-bold text-danger">
        <button className="btn btn-dark float-right" onClick={Logout}>
          logout
        </button>
      </div>
      <div>
        <h1
          style={{ justifyContent: "center", textAlign: "center" }}
          id="fix"
          className="text-primary center"
        >
          {youremail}
        </h1>
      </div>

      <div className="row">
        <div style={{ zIndex: -1 }}>
          {" "}
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={160}
            width={160}
            visible={loader}
          />
        </div>
        {file.map((item, index) => (
          <div className="col-xl-4 col-md-6 mb-4 p-1 " key={item.nanoid}>
            <div className="card  border-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 p-1 font-weight-bold text-danger">
                      <button
                        className="btn btn-danger float-right"
                        onClick={() => deletedata(item.nanoid)}
                      >
                        X
                      </button>
                    </div>
                    <ModalImage
                      className=" p-3"
                      small={item.location}
                      large={item.location}
                      alt={item.filename}
                    />
                    
                    <div className="text-xl font-weight-bold text-primary  mb-1">
                      Uploaded- {item.createdday}-{item.createdtime}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-primary">
                      {item.filename}
                    </div>
                    <div className="h5 mb-0 p-1font-weight-bold text-success">
                      <a href={item.location}>
                        <button className="btn btn-primary float-right">
                          download
                        </button>
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Carddetails;
