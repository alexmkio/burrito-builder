import "./Orders.scss";
import Burrito from "../Burrito/Burrito";
import { OrderType } from "../../types";

type OrdersProps = {
  orders: OrderType[];
};

const Orders = ({ orders }: OrdersProps) => {
  return (
    <section>
      <h1>Orders</h1>
      {orders.map((order) => {
        return <Burrito order={order} />;
      })}
    </section>
  );
};

export default Orders;
