import { fireEvent, render, screen } from "@testing-library/react";
import { MessageList } from "../components/ui";
import { ExtendedMessage } from "../contexts/MessagesContext";

describe("MessageList", () => {
  const MOCK_MESSAGES: ExtendedMessage[] = [
    { message: "Test message", priority: 0, index: 0 },
  ];

  const MOCK_ON_CLEAR_MESSAGE = jest.fn();

  it("Should render a title depending on the priority.", () => {
    render(
      <MessageList
        messages={MOCK_MESSAGES}
        listPriority={0}
        onClearMessage={MOCK_ON_CLEAR_MESSAGE}
      />
    );

    expect(screen.getByText(/Error Type 0/)).toBeInTheDocument();
  });

  it("Should render the counter depending on the amount of messages.", () => {
    render(
      <MessageList
        messages={MOCK_MESSAGES}
        listPriority={0}
        onClearMessage={MOCK_ON_CLEAR_MESSAGE}
      />
    );

    expect(screen.getByText(/Count 1/)).toBeInTheDocument();
  });

  it("Should render a div containing the message text", () => {
    render(
      <MessageList
        messages={MOCK_MESSAGES}
        listPriority={0}
        onClearMessage={MOCK_ON_CLEAR_MESSAGE}
      />
    );

    expect(screen.getByText(/Test message/)).toBeInTheDocument();
  });

  it("Should render an action button.", () => {
    render(
      <MessageList
        messages={MOCK_MESSAGES}
        listPriority={0}
        onClearMessage={MOCK_ON_CLEAR_MESSAGE}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should call onClearMessage function when the button is clicked.", () => {
    render(
      <MessageList
        messages={MOCK_MESSAGES}
        listPriority={0}
        onClearMessage={MOCK_ON_CLEAR_MESSAGE}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(MOCK_ON_CLEAR_MESSAGE).toHaveBeenCalled();
  });
});
