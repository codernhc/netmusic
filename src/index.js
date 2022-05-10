import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.tsx';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Context } from "./context/index.tsx";
// import Route from "./router/index";
// import service from "./service/index";
// import FooterPlayer from "./components/FooterPlayer/index.tsx";


// React Hook "useContext" cannot be called at the top level
// const { player_lists } = useContext(DemoContext);

const root = ReactDOM.createRoot(document.getElementById("root"));

// axios.defaults.baseURL = "http://localhost:3000";
// text service.request({
//   url: "/search?keywords=薛之谦",
//   method: "get",
// }).then((res) => {
//   console.log(res);
// });
// service.instance.get("/search?keywords=薛之谦").then((res) => {
//   console.log(res.data);
// });

root.render(
  <Context>
    <React.StrictMode>
      <BrowserRouter>
        {/* {
          // 判断player_lists是否有值
          player_lists.length > 0 ? <FooterPlayer /> : null
        }
        <Route /> */}
        {/* text: */}
        <App></App>
      </BrowserRouter>
    </React.StrictMode>
  </Context>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
