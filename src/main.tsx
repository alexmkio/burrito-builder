import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import RootRoute from "./routes/root";
import OrdersRoute from "./routes/orders";
import OrderRoute from "./routes/order";

const router = createHashRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "orders/",
    element: <OrdersRoute />,
  },
  {
    path: "order/:orderId",
    element: <OrderRoute />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
