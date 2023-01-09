import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { renderWithRouter } from "../../util/test-utils";

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

  it("at '/' route has link to orders page", () => {
    const route = "/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /Navigate to orders page/i })
    ).toBeTruthy();
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
