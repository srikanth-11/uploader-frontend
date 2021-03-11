import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from '../../components/dashboard/dashboard'
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
      const filedata = await axios.post(`https://sri-uploader.herokuapp.com//file`, data, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,

        },


      })
      console.log(filedata)
      window.location.reload()
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

  return (
    <>

      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <form onSubmit={submitFile}>




              <div class="form-group files">
                <label>Upload Your File </label>
                <input type="file" class="form-control" />
                <button type="submit" className="btn btn-primary my-2 my-sm-0 float-right">upload</button>
              </div>


            </form>


          </div>
          <div class="col-md-6">
            <form onSubmit={submitFile}>




              <div class="form-group files color">
                <label>Upload Your File </label>
                <input type="file" class="form-control" />
                <button type="submit" className="btn btn-primary my-2 my-sm-0 float-right">upload</button>
              </div>


            </form>


          </div>
        </div>
      </div>





      <form onSubmit={submitFile}>
        <label className="text-light p-1">Upload file</label>
        <input type="file" className="text-light p-1 justify-content-center" onChange={event => setFile(event.target.files)} />
        <button type="submit" className="btn btn-primary my-2 my-sm-0 float-right">upload</button>
      </form>


      <Dashboard>

      </Dashboard>



    </>
  );
};

export default FileUpload;