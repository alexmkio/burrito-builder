import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Orders from "./components/Orders/Orders";
import { OrderType } from "./types";

function App() {
  const [orders, setOrders] = useState<OrderType[] | null>(null);

  return (
    <>
      <Header />
      <main>
        <Form />
        {orders ? <Orders orders={orders} /> : <h2>No Orders</h2>}
      </main>
    </>
  );
}

export default App;
