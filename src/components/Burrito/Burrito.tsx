import "./Burrito.scss";
import { OrderType } from "../../types";

type BurritoProps = {
  order: OrderType;
};

const Burrito = ({ order }: BurritoProps) => {
  return (
    <article>
      {order.name}: {order.id}
    </article>
  );
};

export default Burrito;
