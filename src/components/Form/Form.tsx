import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Toppings } from "../../types";
import {
  makeMinDateTimeString,
  makeMaxDateTimeString,
} from "../../util/date-utils";
import { fetchStarWars } from "../../util/fetch";
import { addOrder } from "../../features/orders/ordersSlice";
import { useAppDispatch } from "../../app/hooks";

const initialToppings = {
  tomatoSalsa: false,
  greenChiliSalsa: false,
  chiliCornSalsa: false,
  sourCream: false,
  cheese: false,
  lettuce: false,
  guacamole: false,
};

const Form = () => {
  let minDate = makeMinDateTimeString();
  const [name, setName] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Placeholder");
  const [email, setEmail] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>(minDate);
  const [quantity, setQuantity] = useState<number>(1);
  const [protein, setProtein] = useState<string>("");
  const [queso, setQueso] = useState<boolean | null>(null);
  const [toppings, setToppings] = useState<Toppings>(initialToppings);
  const [burritoCost, setBurritoCost] = useState<number>(7.15);
  const dispatch = useAppDispatch();

  const calculateCost = () => {
    let startingCost = 7.15;
    if (protein === "carnitas") startingCost += 0.5;
    if (protein === "steak" || protein === "barbacoa") startingCost += 1.0;
    if (queso) startingCost += 1.3;
    if (protein.length && toppings.guacamole) startingCost += 2.25;
    setBurritoCost(Number(startingCost.toFixed(2)));
  };

  const getPlaceholder = async () => {
    const lukeSkywalker = await fetchStarWars(1);
    setPlaceholder(lukeSkywalker.name);
  };

  useEffect(() => {
    getPlaceholder();
  }, [getPlaceholder]);

  useEffect(() => {
    calculateCost();
  }, [calculateCost, protein, queso, toppings]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "pickup-time":
        setPickupTime(event.target.value);
        break;
      case "quantity":
        setQuantity(Number(event.target.value));
        break;
      case "protein":
        setProtein(event.target.value);
        break;
      case "queso":
        event.target.value === "yes" ? setQueso(true) : setQueso(false);
        break;
      case "toppings":
        let currentToppings = { ...toppings };
        currentToppings[event.target.value] =
          !currentToppings[event.target.value];
        setToppings(currentToppings);
        break;
      default:
        console.log(`No case for ${event.target.id}.`);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPickupTime(makeMinDateTimeString());
    setProtein("");
    setQueso(null);
    setToppings(initialToppings);
    setBurritoCost(7.15);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let order = {
      id: Date.now(),
      name,
      email,
      pickupTime,
      quantity,
      protein,
      queso,
      toppings,
      burritoCost,
    };
    dispatch(addOrder(order));
    resetForm();
  };

  return (
    <section>
      <h2>Build your burrito</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <p>Fields marked with an asterisk (*) are required</p>

        <label>
          <span aria-hidden="true">*</span> Name:
          <input
            type="text"
            id="name"
            placeholder={placeholder}
            required
            aria-required="true"
            aria-describedby="nameError"
            value={name}
            onChange={handleChange}
          />
        </label>
        <div className="error" id="nameError" aria-live="polite">
          <p>Name is required</p>
        </div>

        <label>
          Email address:
          <input
            type="email"
            id="email"
            placeholder="you@domain.com"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label>
          Pickup Time:
          <input
            type="datetime-local"
            id="pickup-time"
            value={pickupTime}
            min={minDate}
            max={makeMaxDateTimeString()}
            required
            aria-required="true"
            aria-describedby="nameError"
            onChange={handleChange}
          />
        </label>
        <div className="error" id="pickUpTimeError" aria-live="polite">
          <p>Pick up time is required</p>
        </div>

        <label>
          Quantity (1-10):
          <input
            type="number"
            id="quantity"
            value={quantity}
            min={1}
            max={10}
            onChange={handleChange}
          />
        </label>

        <fieldset>
          <legend>Protein:</legend>
          <label>
            Chicken
            <input
              type="radio"
              id="protein"
              value="chicken"
              onChange={handleChange}
              checked={protein === "chicken"}
            />
          </label>
          <label>
            Steak
            <input
              type="radio"
              id="protein"
              value="steak"
              onChange={handleChange}
              checked={protein === "steak"}
            />
          </label>
          <label>
            Barbacoa
            <input
              type="radio"
              id="protein"
              value="barbacoa"
              onChange={handleChange}
              checked={protein === "barbacoa"}
            />
          </label>
          <label>
            Carnitas
            <input
              type="radio"
              id="protein"
              value="carnitas"
              onChange={handleChange}
              checked={protein === "carnitas"}
            />
          </label>
          <label>
            Sofritas
            <input
              type="radio"
              id="protein"
              value="sofritas"
              onChange={handleChange}
              checked={protein === "sofritas"}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>
            <span aria-hidden="true">*</span> Queso:
          </legend>
          <label>
            Yes
            <input
              type="radio"
              id="queso"
              value="yes"
              onChange={handleChange}
              checked={queso === true}
              required
              aria-required="true"
              aria-describedby="quesoError"
            />
          </label>
          <label>
            No
            <input
              type="radio"
              id="queso"
              value="no"
              onChange={handleChange}
              checked={queso === false}
            />
          </label>
        </fieldset>
        <div className="error" id="quesoError" aria-live="polite">
          <p>Queso is required</p>
        </div>

        <fieldset>
          <legend>Toppings:</legend>
          <label>
            Tomato Salsa
            <input
              type="checkbox"
              id="toppings"
              value="tomatoSalsa"
              onChange={handleChange}
              checked={toppings.tomatoSalsa}
            />
          </label>
          <label>
            Green Chili Salsa
            <input
              type="checkbox"
              id="toppings"
              value="greenChiliSalsa"
              onChange={handleChange}
              checked={toppings.greenChiliSalsa}
            />
          </label>
          <label>
            Chili Corn Salsa
            <input
              type="checkbox"
              id="toppings"
              value="chiliCornSalsa"
              onChange={handleChange}
              checked={toppings.chiliCornSalsa}
            />
          </label>
          <label>
            Sour Cream
            <input
              type="checkbox"
              id="toppings"
              value="sourCream"
              onChange={handleChange}
              checked={toppings.sourCream}
            />
          </label>
          <label>
            Cheese
            <input
              type="checkbox"
              id="toppings"
              value="cheese"
              onChange={handleChange}
              checked={toppings.cheese}
            />
          </label>
          <label>
            Lettuce
            <input
              type="checkbox"
              id="toppings"
              value="lettuce"
              onChange={handleChange}
              checked={toppings.lettuce}
            />
          </label>
          <label>
            Guacamole
            <input
              type="checkbox"
              id="toppings"
              value="guacamole"
              onChange={handleChange}
              checked={toppings.guacamole}
            />
          </label>
        </fieldset>

        <input type="submit" value="Submit" />
      </form>
      Cost: {burritoCost}
    </section>
  );
};

export default Form;
