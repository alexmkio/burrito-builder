import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Orders from "./components/Orders/Orders";
import { OrderType } from "./types";

function App() {
  const [orders, setOrders] = useState<OrderType[] | null>(null);

  const addOrder = (order: OrderType) => {
    !orders ? setOrders([order]) : setOrders([...orders, order]);
  };

  return (
    <>
      <Header />
      <main>
        <Form addOrder={addOrder} />
        {orders ? <Orders orders={orders} /> : <h2>No Orders</h2>}
      </main>
    </>
  );
}

export default App;
