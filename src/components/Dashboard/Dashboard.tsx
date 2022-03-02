import React, { useState, useRef } from "react";
import "./Dashboard.scss";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import DashboardService from "./DashboardService";

const Dashboard = () => {
  const selector = useSelector((state: RootStateOrAny) => state.login.value);
  const fileRef = useRef<any>(null);
  const [ocrData, setOcrData] = useState<any>({
    imgFlg: "",
    ocrResult: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [apiCall, setApiCall] = useState(false);
  const userDetails: any = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);

  /**
   * Method to handle image upload
   * @param event
   */
  const handleImageUpload = (event: any) => {
    const files = event.target.files;
    getBase64(files[0]).then((data) => {
      setOcrData({
        ...ocrData,
        ["imgFlg"]: data,
      });
    });
  };
  /**
   * Method to get the base 64 image
   * @param file
   * @returns
   */
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  /**
   * Method to convert image to string
   */
  const OCR = () => {
    setApiCall(true);
    DashboardService.OCR({ base64: ocrData.imgFlg })
      .then((response) => {
        response.json().then((data) => {
          if (data?.idType?.toLocaleLowerCase() !== "pan") {
            setErrorMsg("Uploaded document was not a pan card.");
            setOcrData({
              ...ocrData,
              ["ocrResult"]: "",
            });
            setApiCall(false);
          } else if (
            data?.name?.toLocaleLowerCase() !==
              parseUserDetails.name.toLocaleLowerCase() ||
            data?.fname?.toLocaleLowerCase() !==
              parseUserDetails.fname.toLocaleLowerCase()
          ) {
            setErrorMsg("User details not matching.");
            setOcrData({
              ...ocrData,
              ["ocrResult"]: "",
            });
            setApiCall(false);
          } else {
            setErrorMsg("");
            setOcrData({
              ...ocrData,
              ["ocrResult"]: data,
            });
            setApiCall(false);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /**
   * Method to clear the data
   */
  const clearData = () => {
    setOcrData({
      imgFlg: "",
      ocrResult: "",
    });
    fileRef.current.value = null;
  };
  return (
    <React.Fragment>
      <div className="Dashboard">
        <div className="mt-3 mb-3 d-flex justify-content-end welcomeMsg">
          Welcome {parseUserDetails.name}
        </div>
        <div className="container">
          <div className="row">
            <div className="imgBlock col-sm-3 text-center">
              <img src="https://ocr.space/Content/Images/icons/upload.png" />
              <label>Upload File</label>
            </div>
            <div className="imgBlock col-sm-3 text-center">
              <img src="https://ocr.space/Content/Images/icons/start.png" />
              <label>Start OCR</label>
            </div>
            <div className="imgBlock col-sm-3 text-center">
              <img src="https://ocr.space/Content/Images/icons/result.png" />
              <label>Get Result</label>
            </div>
            <div className="imgBlock col-sm-3 text-center">
              <img src="https://ocr.space/Content/Images/icons/overlay.png" />
              <label>Check Overlay</label>
            </div>
          </div>
          <div className="row mt-5 justify-content-between mb-3">
            <div className="col-sm-4 imgBlk">
              <span className="title mb-3">Image Preview</span>
              <div className="uploadImg mb-5">
                <label className="mb-3">Upload PAN</label>
                <input
                  type="file"
                  onChange={(event) => handleImageUpload(event)}
                  ref={fileRef}
                />
                {ocrData.imgFlg && (
                  <img className="mt-3" src={ocrData.imgFlg} />
                )}
              </div>
            </div>
            <div className="col-sm-4 text-center action">
              <div>
                <button
                  className="btn btn-success startOcr"
                  onClick={OCR}
                  disabled={ocrData.imgFlg === "" ? true : false}
                >
                  Start OCR
                </button>
                <button
                  className="btn btn-danger"
                  onClick={clearData}
                  disabled={ocrData.imgFlg === "" ? true : false}
                >
                  Clear
                </button>
              </div>
              {apiCall && <div className="success mt-5">Loading...</div>}
            </div>
            {/* {apiCall && (<div className="success">
              Loading...
            </div>)} */}
            <div className="col-sm-4 resultBlk">
              <span className="title mb-3">OCR Result</span>
              <div className="showResult mb-3">
                {ocrData.ocrResult === "" ? (
                  <label>No data found</label>
                ) : (
                  <React.Fragment>
                    <label className="mb-3">
                      <strong>Name: </strong>
                      {ocrData.ocrResult["name"]}
                    </label>
                    <label className="mb-3">
                      <strong>Father Name: </strong>
                      {ocrData.ocrResult["fname"]}
                    </label>
                    <label className="mb-3">
                      <strong>Date of Birth: </strong>
                      {ocrData.ocrResult["dob"]}
                    </label>
                    <label className="mb-3">
                      <strong>PAN Number: </strong>
                      {ocrData.ocrResult["pan"]}
                    </label>
                    <label className="mb-3">
                      <strong>ID Type: </strong>
                      {ocrData.ocrResult["idType"]}
                    </label>
                  </React.Fragment>
                )}
              </div>
              {errorMsg && <div className="error">{errorMsg}</div>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
