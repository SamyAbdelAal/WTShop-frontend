import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import registerServiceWorker from "./registerServiceWorker";
import { checkForExpiredToken } from "./store/actions";
import { fetchProducts } from "./store/actions";
import { fetchAddresses } from "./store/actions";
// Components
import App from "./App";

// Store
import store from "./store";

store.dispatch(checkForExpiredToken());
store.dispatch(fetchProducts());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
