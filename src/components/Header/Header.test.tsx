import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { renderWithRouter } from "../../util/test-utils";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

describe("Header Tests", () => {
  afterEach(() => {
    cleanup();
  });

  it("has a logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("img", { name: /React logo/i })).toBeTruthy();
  });

  it("has a heading element", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Burrito Builder/i })
    ).toBeTruthy();
  });

  it("at '/' route has link to orders page", async () => {
    const route = "/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", {
        name: /Navigate to orders page/i,
      })
    ).toBeTruthy();
  });

  // https://testing-library.com/docs/example-react-router/#testing-library-and-react-router-v5
  // Or can I test value of href?
  it.skip("the link to orders page works as intended", async () => {
    const route = "/";
    const history = createMemoryHistory();
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={[route]}
        location={history.location}
        navigator={history}
      >
        <Header />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("link", {
        name: /Navigate to orders page/i,
      })
    );
    await waitFor(() => {
      expect(history.location.pathname).toBe("/orders/");
    });
  });

  it("at '/' route does not have link to home page", () => {
    const route = "/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("link", { name: /Navigate to home page/i })
    ).toBeFalsy();
  });

  it("at '/orders/' route has link to orders page", () => {
    const route = "/orders/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /Navigate to home page/i })
    ).toBeTruthy();
  });

  it("at '/orders/' route does not have link to home page", () => {
    const route = "/orders/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("link", { name: /Navigate to orders page/i })
    ).toBeFalsy();
  });

  it("at '/order/:orderID' route has link to home & orders page", () => {
    const route = "/order/123";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /Navigate to home page/i })
    ).toBeTruthy();

    expect(
      screen.getByRole("link", { name: /Navigate to orders page/i })
    ).toBeTruthy();
  });

  it.skip("a failed attempt to use a customRenderer helper fn", () => {
    renderWithRouter(<Header />, { route: "/orders/" });

    expect(
      screen.getByRole("link", { name: /Navigate to home page/i })
    ).toBeTruthy();

    expect(
      screen.queryByRole("link", { name: /Navigate to orders page/i })
    ).toBeFalsy();
  });
});
