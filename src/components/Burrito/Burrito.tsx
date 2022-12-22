import "./Burrito.scss";
import { OrderType, ToppingNames } from "../../types";

type BurritoProps = {
  order: OrderType;
};

const Burrito = ({ order }: BurritoProps) => {
  const dateSubmitted = new Date(order.id);
  let riceString = "";
  if (order.rice === "white") riceString = " white rice,";
  if (order.rice === "brown") riceString = " brown rice,";
  let quesoString = order.queso ? " queso," : "";
  const toppingNames: ToppingNames = {
    tomatoSalsa: "tomato salsa",
    greenChiliSalsa: "green chili salsa",
    chiliCornSalsa: "chili corn salsa",
    sourCream: "sour cream",
    cheese: "cheese",
    lettuce: "lettuce",
    guacamole: "guacamole",
  };
  let toppingsString = Object.keys(order.toppings).reduce(
    (acc, currentValue) => {
      if (order.toppings[currentValue])
        acc += ` ${toppingNames[currentValue]},`;
      return acc;
    },
    ""
  );
  const constructOrderString = () => {
    let orderStringWithTrailingComma = `A ${order.protein} ${order.style} with${riceString}${quesoString}${toppingsString}`;
    let orderStringWithTrailingPeriod = `${orderStringWithTrailingComma.substring(
      0,
      orderStringWithTrailingComma.length - 1
    )}.`;
    let numberOfCommas = orderStringWithTrailingPeriod.split(",").length - 1;
    let replacementString;
    if (numberOfCommas === 0) {
      return `A ${order.protein} ${order.style}.`;
    } else if (numberOfCommas === 1) {
      replacementString = " and";
    } else if (numberOfCommas >= 2) {
      replacementString = ", and";
    }
    return (
      orderStringWithTrailingPeriod.substring(
        0,
        orderStringWithTrailingPeriod.lastIndexOf(",")
      ) +
      replacementString +
      orderStringWithTrailingPeriod.substring(
        orderStringWithTrailingPeriod.lastIndexOf(",") + 1
      )
    );
  };
  const orderString = constructOrderString();
  return (
    <article>
      <h2>Name: {order.name}</h2>
      <p>
        <b>Time of order: {dateSubmitted.toLocaleString("en-US")}</b>
      </p>
      <p>Order: {orderString}</p>
    </article>
  );
};

export default Burrito;
