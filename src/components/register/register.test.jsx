import { render, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import userEvent from "@testing-library/user-event";

describe("Register component", () => {
  it("should render Register component correctly", () => {
    render(<Register />);
    const element = screen.getByRole("heading", { level: 2, name: "Register" });
    expect(element).toBeInTheDocument();
  });

  it("should render Register component identified with testId correctly", () => {
    render(<Register />);
    const element = screen.getByTestId("heading");
    expect(element).toBeInTheDocument();
  });

  it("should show error message when all the fields are not enetered", async () => {
    const user = userEvent.setup();
    render(<Register />);
    const buttonElement = screen.getByRole("button", { name: /register/i });
    await user.click(buttonElement);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });

  it("should not show any error message when the component is loaded", () => {
    render(<Register />);
    const alertElement = screen.queryByRole("alert"); // getBy... thorows error when no elemnt found
    expect(alertElement).not.toBeInTheDocument();
  });

  it("should show success message when the registration is successful", async () => {
    const username = "testuser";
    const email = "test@gmail.com";
    const password = "testpassword";
    const user = userEvent.setup();
    const successMessage = "You have successfully registered";

    const { container } = render(<Register />);

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);
    const skillsDropdownElement = container.querySelector(
      "div > div > form > div:nth-child(5) > div > div > div:nth-child(2) > div"
    );
    const subscribeElement = screen.getByRole("checkbox", {
      name: /subscribe to our newsletter/i,
    });
    const buttonElement = screen.getByRole("button", {
      name: /register/i,
    });

    await user.type(nameElement, username);
    await user.type(emailElement, email);
    await user.type(passwordElement, password);
    await user.click(skillsDropdownElement);
    await user.keyboard("{enter}");
    await user.click(subscribeElement);
    await user.click(buttonElement);

    expect(nameElement).toHaveValue(username);
    expect(emailElement).toHaveValue(email);
    expect(passwordElement).toHaveValue(password);
    expect(subscribeElement.checked).toBe(true);

    await waitFor(() => {
      const alertElement = screen.getByRole("alert");
      expect(alertElement).toBeInTheDocument();
      expect(alertElement).toHaveTextContent(successMessage);
      expect(alertElement).toHaveClass("alert-success");
    });
  });
});
