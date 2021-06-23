import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [info, setInfo] = useState({
    id: 0,
    name: "",
    authorized: false,
    counter: 0,
  });

  const [token, setToken] = useState(null);

  const getDataByCookie = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/get-cookie", {
        withCredentials: true,
      });
      setInfo(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const postDataByCookie = async (currentInfo) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/post-cookie",
        { info_cookie: currentInfo },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const getDataByJwt = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/get-jwt", {
        withCredentials: false,
      });
      setInfo(response.data.info_jwt);
      setToken(response.data.accessToken);
      window.localStorage.setItem("data", response.data.accessToken);
    } catch (e) {
      alert(e);
    }
  };

  const postDataByJwt = async (token, currentInfo) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/post-jwt",
        {
          token: token,
          info_jwt: currentInfo,
        },
        { withCredentials: false }
      );
      console.log(response.data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div className="App">
      <div>
        <div>
          <button onClick={getDataByCookie}>get cookie</button>
          <button onClick={() => postDataByCookie(info)}>post cookie</button>
          <div>cookie : ${document.cookie}</div>
        </div>
        <div>
          <button onClick={getDataByJwt}>get jwt</button>
          <button onClick={() => postDataByJwt(token, info)}>post jwt</button>
          <div>jwt : ${window.localStorage.getItem("data")}</div>
        </div>
        <div>id : {info && info.id}</div>
        <div>
          <button
            onClick={() =>
              setInfo({
                ...info,
                counter: info.counter + 1,
              })
            }
          >
            counter : {info && info.counter}
          </button>
        </div>
        <div>
          <div>name :</div>
          <input
            type="text"
            value={info && info.name}
            onChange={(e) =>
              setInfo({
                ...info,
                name: e.target.value,
              })
            }
          ></input>
        </div>
      </div>
    </div>
  );
}

export default App;
