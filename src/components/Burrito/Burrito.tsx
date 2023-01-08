import "./Burrito.scss";
import { ToppingNames } from "../../types";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useLoaderData, useLocation } from "react-router-dom";
import { OrderType } from "../../types";

const Burrito = () => {
  const pathArray = useLocation().pathname.split('/');
  const orderId = Number(pathArray[pathArray.length - 1])
  const orders = useSelector((state: RootState) => state.orders.value);
  const order: OrderType | undefined = orders.find(
    (order) => order.id === orderId
  );

  const toppingNames: ToppingNames = {
    tomatoSalsa: "tomato salsa",
    greenChiliSalsa: "green chili salsa",
    chiliCornSalsa: "chili corn salsa",
    sourCream: "sour cream",
    cheese: "cheese",
    lettuce: "lettuce",
    guacamole: "guacamole",
  };

  let orderedToppings = null;
  if (order) {
    orderedToppings = Object.keys(order.toppings).filter(
      (e) => order.toppings[e]
    );
  }

  return (
    <>
      {order && orderedToppings ? (
        <>
          <h2>Name: {order.name}</h2>
          <p>Pickup Time: {new Date(order.pickupTime).toLocaleString()}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Protein: {order.protein}</p>
          <p>Queso: {order.queso ? "yes" : "no"}</p>
          <p>Toppings: {orderedToppings?.length ? "" : "none"}</p>
          {orderedToppings.length > 0 && (
            <ul>
              {orderedToppings.map((e) => (
                <li key={e}>{toppingNames[e]}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <h2>Order Not Found</h2>
      )}
    </>
  );
};

export default Burrito;
