import IndexService from "./request";

const service = new IndexService({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  interceptors: {
    reqInterceptor: (config) => {
      // console.log("all req", config);
      return config;
    }
  }
});

export default service;