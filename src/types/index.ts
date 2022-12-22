export type Toppings = {
  [key: string]: boolean;
  tomatoSalsa: boolean;
  greenChiliSalsa: boolean;
  chiliCornSalsa: boolean;
  sourCream: boolean;
  cheese: boolean;
  lettuce: boolean;
  guacamole: boolean;
};

export type OrderType = {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  style: string;
  rice: string;
  protein: string;
  queso: boolean | null;
  toppings: Toppings;
  burritoCost: number;
};

export type ToppingNames = {
  [key: string]: string;
  tomatoSalsa: string;
  greenChiliSalsa: string;
  chiliCornSalsa: string;
  sourCream: string;
  cheese: string;
  lettuce: string;
  guacamole: string;
};