import "./Orders.scss";
import Burrito from "../Burrito/Burrito";
import { OrderType } from "../../types";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";

type OrdersProps = {
  orders: OrderType[];
};

const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.value);
  const list = orders.map((order) => <Burrito order={order} key={order.id} />);

  return (
    <section>
      {orders.length > 0 ? (
        <>
          <h2>Orders</h2>
          <section>{list}</section>
        </>
      ) : (
        <h2>No Orders</h2>
      )}
    </section>
  );
};

export default Orders;
