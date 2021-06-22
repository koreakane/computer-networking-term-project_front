import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [info, setInfo] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/", {
        withCredentials: true,
      });
      setInfo(response.data);
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
          <button onClick={fetchData}>get cookie</button>
          <div>cookie</div>
          <div>{info && info.number}</div>
        </div>
        <div>
          <button onClick={fetchData}>get jwt</button>
          <div>jwt</div>
          <div>{info && info.number}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
