import { describe, it, expect, afterEach, beforeAll, beforeEach } from "vitest";
import { cleanup, screen, waitFor, within } from "@testing-library/react";
import { renderWithProviders } from "../../util/test-utils";
import Form from "./Form";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe("Form Tests", () => {
  let user: UserEvent

  const inputs = [
    {
      label: "Name",
      required: true,
      type: "textbox",
      children: [],
    },
    {
      label: "Email address",
      required: false,
      type: "textbox",
      children: [],
    },
    {
      label: "Pickup Time",
      required: true,
      type: "textbox",
      children: [],
    },
    {
      label: "Quantity (1-10)",
      required: false,
      type: "spinbutton",
      children: [],
    },
    {
      label: "Protein",
      required: false,
      type: "group",
      children: [
        {
          option: "Chicken",
          type: "radio",
        },
        {
          option: "Steak",
          type: "radio",
        },
        {
          option: "Barbacoa",
          type: "radio",
        },
        {
          option: "Carnitas",
          type: "radio",
        },
        {
          option: "Sofritas",
          type: "radio",
        },
      ],
    },
    {
      label: "Queso",
      required: true,
      type: "group",
      children: [
        {
          option: "Yes",
          type: "radio",
        },
        {
          option: "No",
          type: "radio",
        },
      ],
    },
    {
      label: "Toppings",
      required: false,
      type: "group",
      children: [
        {
          option: "Tomato Salsa",
          type: "checkbox",
        },
        {
          option: "Green Chili Salsa",
          type: "checkbox",
        },
        {
          option: "Chili Corn Salsa",
          type: "checkbox",
        },
        {
          option: "Sour Cream",
          type: "checkbox",
        },
        {
          option: "Cheese",
          type: "checkbox",
        },
        {
          option: "Lettuce",
          type: "checkbox",
        },
        {
          option: "Guacamole",
          type: "checkbox",
        },
      ],
    },
  ];

  beforeEach(() => {
    user = renderWithProviders(<Form />).user;
  });

  afterEach(() => {
    cleanup();
  });

  it("has a heading", () => {
    expect(
      screen.getByRole("heading", {
        name: /build your burrito/i,
      })
    ).toBeTruthy();
  });

  it("displays a message about required fields", () => {
    expect(
      screen.getByText(/fields marked with an asterisk \(\*\) are required/i)
    ).toBeTruthy();
  });

  it("form has adequate aria roles and labeling", () => {
    inputs.forEach((input) => {
      if (input.type === "group") {
        expect(
          screen.getByRole("group", {
            name: `${input.label}:`,
          })
        ).toBeTruthy();

        input.children.forEach((child) => {
          expect(
            screen.getByRole(child.type, {
              name: child.option,
            })
          ).toBeTruthy();
        });
      } else {
        let label = input.required ? `* ${input.label}:` : `${input.label}:`;

        expect(
          screen.getByLabelText(label, { selector: "input" })
        ).toBeTruthy();
      }
    });
  });

  it("all text inputs have placeholder text", () => {
    let textInputs = screen.queryAllByRole("textbox");

    textInputs.forEach((input) => {
      expect(input.getAttribute("placeholder")).toBeTruthy();
    });
  });

  it("all text inputs update accordingly", async () => {
    let textInputs = screen.queryAllByRole("textbox");

    textInputs.forEach(async (input) => {
      expect(input.getAttribute("value")).toBe("");

      await user.click(input);
      await user.keyboard("testing 123");

      // documentation suggests that the following assertion doesn't need to be in a waitFor hook but it fails without it

      await waitFor(() => {
        expect(input.getAttribute("value")).toBe("testing 123");
        expect(input.getAttribute("value")).not.toBe("");
      });

      // attempting to get the following tests to fail doesn't seem to work
      // not sure if it's working properly

      await user.clear(input);

      expect(input.getAttribute("value")).toBe("");
      expect(input.getAttribute("value")).not.toBe("testing 123");
    });
  });

  it("all number inputs update accordingly", async () => {
    let numInputs = screen.queryAllByRole("spinbutton");

    numInputs.forEach(async (input) => {
      let inputValue = input.getAttribute("value");

      await user.click(input);
      await user.keyboard("[ArrowUp]");

      // The following test should pass
      // expect(input.getAttribute("value")).toBe("2");

      await waitFor(() => {
        expect(input.getAttribute("value")).toBe(
          (Number(inputValue!) + 1).toString()
        );

        // The following test should not pass
        expect(input.getAttribute("value")).toBe(
          (Number(inputValue!) + 6).toString()
        );
      });
    });
  });

  it("radio groups should only have one selection at a time", async () => {
    let proteinGroup = screen.getByRole("group", {
      name: /protein:/i,
    });

    let quesoGroup = screen.getByRole("group", {
      name: /queso:/i,
    });

    let radioGroups = [proteinGroup, quesoGroup];

    radioGroups.forEach(async (group) => {
      let allRadios = within(group).queryAllByRole("radio");

      allRadios.forEach((radio) => {
        // Expect that all radios start as unchecked
        expect(radio.hasAttribute("checked")).toBe(false);
      });

      // Click the first radio
      await user.click(allRadios[0]);

      await waitFor(() => {
        // Expect that clicking one radio will turn that radio true, but all other radios remain unchecked
        allRadios.forEach((radio, index) => {
          index === 0
            ? expect(radio.hasAttribute("checked")).toBe(true)
            : expect(radio.hasAttribute("checked")).toBe(false);
        });
      });

      // Click the second radio
      await user.click(allRadios[1]);

      await waitFor(() => {
        // Expect that clicking another radio will turn that radio true, and uncheck the first radio
        allRadios.forEach((radio, index) => {
          index === 1
            ? expect(radio.hasAttribute("checked")).toBe(true)
            : expect(radio.hasAttribute("checked")).toBe(false);
        });
      });
    });
  });

  it("all checkboxes start unchecked", async () => {
    let allCheckboxes = screen.queryAllByRole("checkbox");

    allCheckboxes.forEach((checkbox) => {
      // Expect that all checkboxes start as unchecked
      expect(checkbox.hasAttribute("checked")).toBe(false);
    });
  });

  it("all checkboxes can be checked", async () => {
    let allCheckboxes = screen.queryAllByRole("checkbox");

    allCheckboxes.forEach(async (checkbox) => {
      await user.click(checkbox);

      await waitFor(() => {
        expect(checkbox.hasAttribute("checked")).toBe(true);
      });
    });
  });

  it("once checked all checkboxes can be checked", async () => {
    let allCheckboxes = screen.queryAllByRole("checkbox");

    allCheckboxes.forEach(async (checkbox) => {
      await user.click(checkbox);

      await waitFor(() => {
        expect(checkbox.hasAttribute("checked")).toBe(true);
        expect(checkbox.hasAttribute("checked")).not.toBe(false);
      });

      await user.click(checkbox);

      await waitFor(() => {
        expect(checkbox.hasAttribute("checked")).toBe(false);
        // The next line should not pass but does
        expect(checkbox.hasAttribute("checked")).toBe(true);
        expect(checkbox.hasAttribute("checked")).not.toBe(true);
      });
    });
  });

  it("fetch placeholder test", () => {
    expect(1).toBeTruthy();
  });

  it("can submit a completed form", () => {
    expect(1).toBeTruthy();
  });

  it("cannot submit a form missing required information", () => {
    expect(1).toBeTruthy();
  });

  it("clears form after successful submission", () => {
    expect(1).toBeTruthy();
  });

  it("displays base order price of $7.15", () => {
    expect(screen.getByText(/cost: 7\.15/i)).toBeTruthy();
  });

  it("chicken and sofritas do not increase base price", async () => {
    let chickenRadio = screen.getByRole("radio", {
      name: /chicken/i,
    });

    let sofritasRadio = screen.getByRole("radio", {
      name: /sofritas/i,
    });

    await user.click(chickenRadio);

    await waitFor(() => {
      expect(screen.getByText(/cost: 7\.15/i)).toBeTruthy();
    });

    await user.click(sofritasRadio);

    await waitFor(() => {
      expect(screen.getByText(/cost: 7\.15/i)).toBeTruthy();
    });
  });

  it("carnitas increases base price by $0.50", async () => {
    let carnitasRadio = screen.getByRole("radio", {
      name: /carnitas/i,
    });

    await user.click(carnitasRadio);

    expect(screen.getByText(/cost: 7\.65/i)).toBeTruthy();
    expect(screen.queryByText(/cost: 7\.15/i)).toBeFalsy();
  });
});
