import "./Orders.scss";
import BurritoCard from "../BurritoCard/BurritoCard";
import { OrderType } from "../../types";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type OrdersProps = {
  orders: OrderType[];
};

const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.value);
  const list = orders.map((order) => (
    <article key={order.id}>
      <Link to={`order/${order.id}`}>
        <BurritoCard order={order} />
      </Link>
    </article>
  ));

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
