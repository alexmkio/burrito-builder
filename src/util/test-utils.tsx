import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { createBrowserHistory } from "history";
import userEvent from "@testing-library/user-event";

export const renderWithRouter = (
  component: ReactElement,
  path: string = "/",
) => {
  const history = createBrowserHistory();
  history.push(path);

  return {
    user: userEvent.setup(),
    history,
    ...render(
      <Router location={history.location} navigator={history}>
        {component}
      </Router>
    ),
  };
};
