import "./Burrito.scss";
import { OrderType, ToppingNames } from "../../types";

type BurritoProps = {
  order: OrderType;
};

const Burrito = ({ order }: BurritoProps) => {
  const toppingNames: ToppingNames = {
    tomatoSalsa: "tomato salsa",
    greenChiliSalsa: "green chili salsa",
    chiliCornSalsa: "chili corn salsa",
    sourCream: "sour cream",
    cheese: "cheese",
    lettuce: "lettuce",
    guacamole: "guacamole",
  };

  let orderedToppings = Object.keys(order.toppings).filter(
    (e) => order.toppings[e]
  );

  return (
    <article>
      <h2>Name: {order.name}</h2>
      <p>Pickup Time: {new Date(order.pickupTime).toLocaleString()}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Protein: {order.protein}</p>
      <p>Queso: {order.queso ? "yes" : "no"}</p>
      <p>Toppings: {orderedToppings.length ? "" : "none"}</p>
      <ul>
        {orderedToppings.map((e) => (
          <li key={e}>{toppingNames[e]}</li>
        ))}
      </ul>
    </article>
  );
};

export default Burrito;
