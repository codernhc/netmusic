import axios from "axios";
// import { Loader  } from "rsuite";
// import React from "react";

class IndexService {
  instance;
  interceptors;
  loading;

  constructor(config) {
    this.instance = axios.create(config);
    // 赋值
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.reqInterceptor,
      this.interceptors?.reqInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.resInterceptor,
      this.interceptors?.resInterceptorCatch
    );

    this.instance.interceptors.request.use(
      (config) => {
        // this.loading = (
        //   <div id="loaderInverseWrapper" style={{ height: 200 }}>
        //     <Loader inverse center content="loading..." />
        //   </div>
        // );
        return config;
      },
      (err) => {
        // console.log("all req err", err);
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (config) => {
        //   setTimeout(() => {
        //     // Loading should be closed asynchronously
        //     this.loading?.close();
        //   }, 4000);
        // console.log("all res", config);
        return config;
      },
      (err) => {
        // console.log("all err res", err);
        return err;
      }
    );
  }

  request(config) {
    if (config.interceptors?.reqInterceptor) {
      this.interceptors = config.interceptors;
    }

    this.instance.request(config).then((res) => {
      // console.log(res);
      return res;
    });
  }
}

export default IndexService;
