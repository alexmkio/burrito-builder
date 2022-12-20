// export type CardType = {
//   id:         number
//   question:   string
//   answer:     string
//   side:       string
//   categories: string[]
// }

export type OrderType = {
  id: number;
  name: string;
};

// export type Toppings = {
//   tomatoSalsa: boolean;
//   greenChiliSalsa: boolean;
//   chiliCornSalsa: boolean;
//   sourCream: boolean;
//   cheese: boolean;
//   lettuce: boolean;
//   guacamole: boolean;
// };

export type Toppings = {
  [key: string]: boolean;
};
