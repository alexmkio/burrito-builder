import "./Form.scss";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Toppings, OrderType } from "../../types";

const initialToppings = {
  tomatoSalsa: false,
  greenChiliSalsa: false,
  chiliCornSalsa: false,
  sourCream: false,
  cheese: false,
  lettuce: false,
  guacamole: false,
};

type FormProps = {
  addOrder: (order: OrderType) => void;
};

const Form = ({ addOrder }: FormProps) => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [rice, setRice] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [queso, setQueso] = useState<boolean | null>(null);
  const [toppings, setToppings] = useState<Toppings>(initialToppings);
  const [burritoCost, setBurritoCost] = useState<number>(7.15);

  const calculateCost = () => {
    let startingCost = 7.15;
    if (protein === "carnitas") startingCost += 0.5;
    if (protein === "steak" || protein === "barbacoa") startingCost += 1.0;
    if (queso) startingCost += 1.3;
    if (protein.length && toppings.guacamole) startingCost += 2.25;
    setBurritoCost(startingCost);
  };

  useEffect(() => {
    calculateCost();
  }, [protein, queso, toppings]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "name":
        setName(event.target.value);
        break;
      case "phoneNumber":
        setPhoneNumber(event.target.value);
        break;
      case "emailAddress":
        setEmailAddress(event.target.value);
        break;
      case "style":
        setStyle(event.target.value);
        break;
      case "rice":
        setRice(event.target.value);
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
    setPhoneNumber("");
    setEmailAddress("");
    setStyle("");
    setRice("");
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
      phoneNumber,
      emailAddress,
      style,
      rice,
      protein,
      queso,
      toppings,
      burritoCost,
    };
    addOrder(order);
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
          <span aria-hidden="true">*</span> Phone number:
          <input
            type="text"
            id="phoneNumber"
            required
            aria-required="true"
            aria-describedby="phoneError"
            value={phoneNumber}
            onChange={handleChange}
          />
        </label>
        <div className="error" id="phoneError" aria-live="polite">
          <p>Phone number is required</p>
        </div>

        <label>
          <span aria-hidden="true">*</span> Email address:
          <input
            type="text"
            id="emailAddress"
            required
            aria-required="true"
            aria-describedby="emailError"
            value={emailAddress}
            onChange={handleChange}
          />
        </label>
        <div className="error" id="emailError" aria-live="polite">
          <p>Email address is required</p>
        </div>

        <fieldset>
          <legend>
            <span aria-hidden="true">*</span> Pick your style:
          </legend>
          <label>
            Burrito
            <input
              type="radio"
              id="style"
              value="burrito"
              onChange={handleChange}
              checked={style === "burrito"}
              required
              aria-required="true"
              aria-describedby="styleError"
            />
          </label>
          <label>
            Bowl
            <input
              type="radio"
              id="style"
              value="bowl"
              onChange={handleChange}
              checked={style === "bowl"}
            />
          </label>
          <label>
            Tacos
            <input
              type="radio"
              id="style"
              value="tacos"
              onChange={handleChange}
              checked={style === "tacos"}
            />
          </label>
          <label>
            Salad
            <input
              type="radio"
              id="style"
              value="salad"
              onChange={handleChange}
              checked={style === "salad"}
            />
          </label>
        </fieldset>
        <div className="error" id="styleError" aria-live="polite">
          <p>Style is required</p>
        </div>

        <fieldset>
          <legend>Rice:</legend>
          <label>
            White
            <input
              type="radio"
              id="rice"
              value="white"
              onChange={handleChange}
              checked={rice === "white"}
            />
          </label>
          <label>
            Brown
            <input
              type="radio"
              id="rice"
              value="brown"
              onChange={handleChange}
              checked={rice === "brown"}
            />
          </label>
        </fieldset>

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
      Cost: {burritoCost.toFixed(2)}
    </section>
  );
};

export default Form;
