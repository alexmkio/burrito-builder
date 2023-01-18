import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../../util/test-utils";
import BurritoCard from "./BurritoCard";

describe("Burrito Tests", () => {
  describe("Describe an order with queso and toppings", () => {
    beforeAll(() => {
      const order1 = {
        id: 1673407662856,
        name: "Alex",
        email: "a@k.com",
        pickupTime: "2023-01-10T22:31",
        quantity: 1,
        protein: "chicken",
        queso: true,
        toppings: {
          tomatoSalsa: true,
          greenChiliSalsa: true,
          chiliCornSalsa: true,
          sourCream: true,
          cheese: true,
          lettuce: true,
          guacamole: true,
        },
        burritoCost: 10.7,
      };

      renderWithProviders(<BurritoCard order={order1} />);
    });

    afterAll(() => {
      cleanup();
    });

    it("has a heading element", () => {
      expect(screen.getByRole("heading")).toBeTruthy();
    });

    it("displays a name", () => {
      expect(screen.getByText(/name: alex/i)).toBeTruthy();
    });

    it("displays a pickup time", () => {
      expect(
        screen.getByText(/pickup time: 1\/10\/2023, 10:31:00 pm/i)
      ).toBeTruthy();
    });

    it("displays a quantity", () => {
      expect(screen.getByText(/quantity: 1/i)).toBeTruthy();
    });

    it("displays protein selection", () => {
      expect(screen.getByText(/protein: chicken/i)).toBeTruthy();
    });

    it("displays if it's getting queso", () => {
      expect(screen.getByText(/queso: yes/i)).toBeTruthy();
    });

    it("displays toppings", () => {
      expect(screen.getByText(/toppings:/i)).toBeTruthy();
    });

    it("renders toppings within an unordered list", () => {
      const list = screen.getByRole("list");
      const listItems = within(list).getAllByRole("listitem");

      expect(within(list).getAllByRole("listitem")).toHaveLength(7);

      const ingredients = [
        "tomato salsa",
        "green chili salsa",
        "chili corn salsa",
        "sour cream",
        "cheese",
        "lettuce",
        "guacamole",
      ];

      listItems.forEach((item) => {
        if (typeof item.textContent === "string")
          expect(ingredients.includes(item.textContent)).toBeTruthy();
      });
    });
  });

  describe("Describe an order without queso and toppings", () => {
    beforeAll(() => {
      const order2 = {
        id: 6666666666666,
        name: "Ellen",
        email: "e@b.com",
        pickupTime: "2023-01-10T22:31",
        quantity: 6,
        protein: "chicken",
        queso: false,
        toppings: {
          tomatoSalsa: false,
          greenChiliSalsa: false,
          chiliCornSalsa: false,
          sourCream: false,
          cheese: false,
          lettuce: false,
          guacamole: false,
        },
        burritoCost: 10.7,
      };

      renderWithProviders(<BurritoCard order={order2} />);
    });

    afterAll(() => {
      cleanup();
    });

    it("displays if it's getting queso", () => {
      expect(screen.getByText(/queso: no/i)).toBeTruthy();
    });

    it("displays toppings", () => {
      expect(screen.getByText(/toppings:/i)).toBeTruthy();
    });

    it("if there are no toppings it renders 'none' instead of a list", () => {
      expect(screen.getByText(/toppings: none/i)).toBeTruthy();
      expect(screen.queryByRole("list")).toBeFalsy();
    });
  });
});
