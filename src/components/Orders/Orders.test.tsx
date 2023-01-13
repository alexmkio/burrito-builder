import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { cleanup, screen, waitFor, within } from "@testing-library/react";
import { renderWithProviders } from "../../util/test-utils";
import Orders from "./Orders";

describe("Orders tests", () => {
  describe("Describe without orders", () => {
    beforeAll(() => {
      renderWithProviders(<Orders />, "/orders/");
    });

    afterAll(() => {
      cleanup();
    });

    it("displays 'no orders'", () => {
      expect(
        screen.getByRole("heading", {
          name: /no orders/i,
        })
      ).toBeTruthy();
    });
  });

  describe("Describe with orders", () => {
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

      renderWithProviders(<Orders />, "/orders/", {
        preloadedState: {
          orders: { value: [order1, order2] },
        },
      });
    });

    afterAll(() => {
      cleanup();
    });

    it("displays 'orders'", () => {
      expect(
        screen.getByRole("heading", {
          name: /orders/i,
        })
      ).toBeTruthy();
    });

    it("each order is within an article semantic", () => {
      expect(screen.getAllByRole("article")).toHaveLength(2);

      let article1 = screen.getAllByRole("article")[0];
      expect(
        within(article1).getByRole("heading", {
          name: /name: alex/i,
        })
      ).toBeTruthy();

      let article2 = screen.getAllByRole("article")[1];
      expect(
        within(article2).getByRole("heading", {
          name: /name: ellen/i,
        })
      ).toBeTruthy();
    });

    it("each order is a link", async () => {
      cleanup();

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

      const { user, history } = renderWithProviders(<Orders />, "/orders/", {
        preloadedState: {
          orders: { value: [order1, order2] },
        },
      });

      let article1 = screen.getAllByRole("article")[0];

      expect(within(article1).getByRole("link")).toBeTruthy();

      await user.click(within(article1).getByRole("link"));

      await waitFor(() => {
        expect(history.location.pathname).toBe("/order/1673407662856");
      });

      let article2 = screen.getAllByRole("article")[1];

      expect(within(article2).getByRole("link")).toBeTruthy();

      await user.click(within(article2).getByRole("link"));

      await waitFor(() => {
        expect(history.location.pathname).toBe("/order/6666666666666");
      });
    });
  });
});
