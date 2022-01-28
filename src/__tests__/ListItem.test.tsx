import { fireEvent, render, screen } from "@testing-library/react";
import { ListItem } from "../components/ui";

describe("ListItem", () => {
  const MESSAGE_MOCK = { message: "Test message", priority: 0, index: 0 };
  const ACTION_MOCK = { text: "Action button", callback: jest.fn() };
  it("Should render the message passed.", () => {
    render(<ListItem incomingMessage={MESSAGE_MOCK} />);

    expect(screen.getByText(/Test message/)).toBeInTheDocument();
  });

  it("Should not render any button when action is not passed.", () => {
    render(<ListItem incomingMessage={MESSAGE_MOCK} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("Should render a button with the specified text when action is passed.", () => {
    render(<ListItem incomingMessage={MESSAGE_MOCK} action={ACTION_MOCK} />);

    expect(screen.queryByRole("button")).toBeInTheDocument();
    expect(screen.getByText(/Action button/)).toBeInTheDocument();
  });

  it("Should render a button that, when clicked, should invoke the callback passed passing the index as parameter.", () => {
    render(<ListItem incomingMessage={MESSAGE_MOCK} action={ACTION_MOCK} />);

    fireEvent.click(screen.getByRole("button"));

    expect(ACTION_MOCK.callback).toHaveBeenCalledWith(0);
  });
});
