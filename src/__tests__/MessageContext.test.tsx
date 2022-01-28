import React from "react";
import {
  MessageProvider,
  useMessageContext,
} from "../contexts/MessagesContext";
import { fireEvent, render, screen } from "@testing-library/react";
import generateMessage, { Message } from "../Api";

jest.mock("../Api");

const DummyComponent = () => {
  const {
    messages,
    lastMessage,
    onClearMessage,
    onClearAllMessages,
    onToggleMessagesService,
    isMessageServiceStopped,
  } = useMessageContext();
  return (
    <div>
      <span>Messages: {messages.length}</span>
      <span>Last message: {lastMessage?.message}</span>
      <button onClick={() => onClearMessage(0)}>Clear One</button>
      <button onClick={onClearAllMessages}>Clear All</button>
      <button onClick={onToggleMessagesService}>Toggle Service</button>
      <span>
        Is message service stopped: {isMessageServiceStopped.toString()}
      </span>
    </div>
  );
};

const Wrapper = () => (
  <MessageProvider>
    <DummyComponent />
  </MessageProvider>
);

describe("MessageContext", () => {
  it("Should throw an error when not using the provider", () => {
    expect(() => render(<DummyComponent />)).toThrow();
  });

  it("Should add a the message to the array of messages.", () => {
    (generateMessage as jest.MockedFunction<any>).mockImplementation(
      (callback: (message: Message) => void) =>
        callback({ message: "Test message", priority: 0 })
    );

    render(<Wrapper />);

    expect(screen.getByText(/Messages: 1/)).toBeInTheDocument();
  });

  it("Should add set lastMessage with the value of the last message sent by the service.", () => {
    (generateMessage as jest.MockedFunction<any>).mockImplementation(
      (callback: (message: Message) => void) =>
        callback({ message: "Test last message", priority: 0 })
    );

    render(<Wrapper />);

    expect(
      screen.getByText(/Last message: Test last message/)
    ).toBeInTheDocument();
  });

  it("Should clear the specified message when onClearMessage is called.", () => {
    (generateMessage as jest.MockedFunction<any>).mockImplementation(
      (callback: (message: Message) => void) =>
        callback({ message: "Test last message", priority: 0 })
    );

    render(<Wrapper />);

    fireEvent.click(screen.getByText(/Clear One/));

    expect(screen.getByText(/Messages: 0/)).toBeInTheDocument();
  });

  it("Should clear all the messages from the array when onClearAllMessages is called.", () => {
    (generateMessage as jest.MockedFunction<any>).mockImplementation(
      (callback: (message: Message) => void) =>
        callback({ message: "Test last message", priority: 0 })
    );

    render(<Wrapper />);

    fireEvent.click(screen.getByText(/Clear All/));

    expect(screen.getByText(/Messages: 0/)).toBeInTheDocument();
  });

  it("Should set isMessageServiceStopped to false on init.", () => {
    (generateMessage as jest.MockedFunction<any>).mockImplementation(
      (callback: (message: Message) => void) =>
        callback({ message: "Test last message", priority: 0 })
    );

    render(<Wrapper />);

    expect(
      screen.getByText(/Is message service stopped: false/)
    ).toBeInTheDocument();
  });

  it("Should set isMessageServiceStopped to true when onToggleMessagesService is called for the first time.", () => {
    (generateMessage as jest.MockedFunction<any>).mockImplementation(
      (callback: (message: Message) => void) => {
        callback({ message: "Test last message", priority: 0 });
        return () => {};
      }
    );

    render(<Wrapper />);

    fireEvent.click(screen.getByText(/Toggle Service/));

    expect(
      screen.getByText(/Is message service stopped: true/)
    ).toBeInTheDocument();
  });
});
