import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState("");
  const handlechange = (event) => {
    // console.log(event.target.value);C:\fakepath\photo.jpng.jpg
    // console.log(URL.createObjectURL(event.target.files[0])); to convert into url //http://localhost:3000/8c070bac-aea9-488d-bab9-eabdd5a8953a
    setImage(event.target.files[0]);
  };
  const submit = () => {
    // console.log("testing");
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("data", { name: "divya" });
    axios
      .post("http://localhost:3300/image-upload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((Response) => {
        console.log("res", Response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="offset-lg-3 col-lg-5 mt-5 p-5 border">
          <form>
            <div>
              <label htmlFor="imginput" className="form-label">
                upload your Image
              </label>
              <input
                type="file"
                id="imginput"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <button
              className="btn btn-success w-100 mt-3"
              type="button"
              onClick={submit}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
