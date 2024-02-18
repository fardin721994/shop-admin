import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  ///////////
  const [filename, setFilename] = useState("Choose File");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);

    if (props.fileType === "subtitle") {
      props.setUploadedFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
      /////////////////////
      if (props.setUploadedFileSrc) {
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = function () {
          // imgavat.attr('src', reader.result);
          props.setUploadedFileSrc(reader.result);
        };
      }
    }

    /////////////////////
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseName", props.courseName);
    formData.append("courseSection", props.courseSection);
    formData.append("fileType", props.fileType);
    formData.append("file", file);

    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/courses/new/section",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      // const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  return (
    <div className="w-75 py-3 mx-auto d-flex flex-column justify-content-center">
      {message ? <Message msg={message} /> : null}
      <form
        onSubmit={onSubmit}
        className=" d-flex flex-column justify-content-center"
      >
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          {/* <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label> */}
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {/* {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default FileUpload;
