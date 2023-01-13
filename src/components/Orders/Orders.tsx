import BurritoCard from "../BurritoCard/BurritoCard";
import { OrderType } from "../../types";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectOrders } from "../../features/orders/ordersSlice";

type OrdersProps = {
  orders: OrderType[];
};

const Orders = () => {
  const orders = useAppSelector(selectOrders);
  const list = orders.map((order) => (
    <article key={order.id}>
      <Link to={`../order/${order.id}`}>
        <BurritoCard order={order} />
      </Link>
    </article>
  ));

  return (
    <section>
      {orders.length > 0 ? (
        <>
          <h2>Orders</h2>
          {list}
        </>
      ) : (
        <h2>No Orders</h2>
      )}
    </section>
  );
};

export default Orders;
