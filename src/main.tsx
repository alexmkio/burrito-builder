import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { store } from "./app/store";
import { Provider } from "react-redux";
import FormAndOrders from "./components/FormAndOrders/FormAndOrders";
import Orders from "./components/Orders/Orders";
import Burrito, { loader as burritoLoader } from "./components/Burrito/Burrito";
      {
        path: "/",
        element: <FormAndOrders />,
      },
      {
        path: "orders/",
        element: <Orders />,
      },
      {
        path: "order/:orderId",
        element: <Burrito />,
        loader: burritoLoader,
      },

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    </Provider>
  </React.StrictMode>
);
