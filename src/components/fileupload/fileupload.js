import React, { useState } from 'react';
import axios from 'axios';
import { useHistory ,Link} from "react-router-dom";
import auth from '../../service/auth'
import './fileupload.css'

import { useAlert } from "react-alert";


const FileUpload = () => {
  const alert = useAlert();
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  let token = localStorage.getItem('token')
  let myemail = parseJwt(token).email
  let myuserid = parseJwt(token).userid
  let youremail = myemail.slice(0, -10);



  const [file, setFile] = useState(null);


  const submitFile = async (e) => {
    e.preventDefault()
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('image', file[0]);
      const result = await axios.post(`https://sri-uploader.herokuapp.com/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(result)
      const data = {
        email: myemail,
        location: result.data.Location,
        filename: file[0].name,
        userid: myuserid
      }
      console.log(data)
      const filedata = await axios.post(`https://sri-uploader.herokuapp.com/file`, data, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,

        },


      })
      console.log(filedata)
    
      if (filedata) {
        alert.success(filedata.data.message);


      } else {
        alert.error('Unable to create');
      }
      // handle success
    } catch (error) {
      alert.error('Unable to create');
    }
  };
  let history = useHistory();
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };

  return (
    <>
 <div className="container-fluid">
      <h1 style={{ justifyContent: "center", textAlign: "center" }}>
        {" "}
        UPLODER<sup>2</sup>
      </h1>
      <div className="h5 mb-0 font-weight-bold text-danger">
     <Link to="/app">
        <button className="btn btn-primary float-left" >
          check your files
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

      </div>
      <div class="container">
        <div class="row">
        <div className="col-md-6">
            <p>You can upload your stuff here</p>
          </div>
          <div class="col-md-6">
            <form onSubmit={submitFile}><div class="form-group files color">
              <label>Upload Your File </label>
              
              <input type="file" class="form-control" onChange={event => setFile(event.target.files)} />
              <button type="submit" className="btn btn-primary my-2 my-sm-0 p-2 float-right">upload</button>
            </div>
            </form> </div>
        </div>
        </div>








    



    </>
  );
};

export default FileUpload;