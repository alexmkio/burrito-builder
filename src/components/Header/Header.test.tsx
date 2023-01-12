import { describe, it, expect, afterEach } from "vitest";
import { cleanup, screen, waitFor, within } from "@testing-library/react";
import Header from "./Header";
import { renderWithProviders } from "../../util/test-utils";

describe("Header Tests", () => {
  afterEach(() => {
    cleanup();
  });

  it("has a logo", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("img", { name: /React logo/i })).toBeTruthy();
  });

  it("has a heading element", () => {
    renderWithProviders(<Header />);

    expect(
      screen.getByRole("heading", { name: /Burrito Builder/i })
    ).toBeTruthy();
  });

  describe("Describes '/' Route", () => {
    it("has a link to orders page", async () => {
      const { history } = renderWithProviders(<Header />);

      expect(history.location.pathname).toBe("/");

      const nav = screen.getByRole("navigation");

      expect(
        within(nav).getByRole("link", {
          name: /Navigate to orders page/i,
        })
      ).toBeTruthy();
    });

    it("the link to orders page works as intended", async () => {
      const { user, history } = renderWithProviders(<Header />);

      const nav = screen.getByRole("navigation");

      await user.click(
        within(nav).getByRole("link", {
          name: /Navigate to orders page/i,
        })
      );

      await waitFor(() => {
        expect(history.location.pathname).toBe("/orders/");
      });
    });

    it("does not have a link to home page", () => {
      renderWithProviders(<Header />);

      expect(
        screen.queryByRole("link", { name: /Navigate to home page/i })
      ).toBeFalsy();
    });
  });

  describe("Describes '/orders/' Route", () => {
    it("has a link to home page", () => {
      const { history } = renderWithProviders(<Header />, "/orders/");

      expect(history.location.pathname).toBe("/orders/");

      const nav = screen.getByRole("navigation");

      expect(
        within(nav).getByRole("link", { name: /Navigate to home page/i })
      ).toBeTruthy();
    });

    it("the link to home page works as intended", async () => {
      const { user, history } = renderWithProviders(<Header />, "/orders/");

      const nav = screen.getByRole("navigation");

      await user.click(
        within(nav).getByRole("link", {
          name: /Navigate to home page/i,
        })
      );

      await waitFor(() => {
        expect(history.location.pathname).toBe("/");
      });
    });

    it("does not have a link to home page", () => {
      const { history } = renderWithProviders(<Header />, "/orders/");

      expect(history.location.pathname).toBe("/orders/");

      expect(
        screen.queryByRole("link", { name: /Navigate to orders page/i })
      ).toBeFalsy();
    });
  });

  describe("Describes '/orders/:orderId' Route", () => {
    it("has a link to home & orders page", () => {
      const { history } = renderWithProviders(<Header />, "/orders/123");

      expect(history.location.pathname).toBe("/orders/123");

      const nav = screen.getByRole("navigation");

      expect(
        within(nav).getByRole("link", { name: /Navigate to home page/i })
      ).toBeTruthy();

      expect(
        within(nav).getByRole("link", { name: /Navigate to orders page/i })
      ).toBeTruthy();
    });

    it("the link to home page works as intended", async () => {
      const { user, history } = renderWithProviders(<Header />, "/orders/123");

      const nav = screen.getByRole("navigation");

      await user.click(
        within(nav).getByRole("link", {
          name: /Navigate to home page/i,
        })
      );

      await waitFor(() => {
        expect(history.location.pathname).toBe("/");
      });
    });

    it("the link to orders page works as intended", async () => {
      const { user, history } = renderWithProviders(<Header />, "/orders/123");

      const nav = screen.getByRole("navigation");

      await user.click(
        within(nav).getByRole("link", {
          name: /Navigate to orders page/i,
        })
      );

      await waitFor(() => {
        expect(history.location.pathname).toBe("/orders/");
      });
    });
  });
});
