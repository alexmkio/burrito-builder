import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { cleanup, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../util/test-utils";
import Burrito from "./Burrito";

describe("Burrito Tests", () => {
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
    const initialOrders = [order1];
    renderWithProviders(<Burrito />, "/order/1673407662856", {
      preloadedState: {
        orders: { value: initialOrders },
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("has a heading element", () => {
    expect(
      screen.getByRole("heading", {
        name: /order #: 1673407662856/i,
      })
    ).toBeTruthy();
  });
});
