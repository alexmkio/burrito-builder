import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import FormAndOrders from "./components/FormAndOrders/FormAndOrders";
import Orders from "./components/Orders/Orders";
import Burrito from "./components/Burrito/Burrito";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
