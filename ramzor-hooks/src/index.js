import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/reducers/rootReducer";
import Layout from "./hoc/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

ReactDom.render(
  <Layout>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Layout>,
  document.getElementById("app")
);
