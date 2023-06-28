import { render, screen } from "@testing-library/react";
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
});
