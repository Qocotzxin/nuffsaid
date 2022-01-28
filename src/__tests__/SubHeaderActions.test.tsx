import { SubHeaderActions } from "../components/ui";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SubHeaderActions", () => {
  const onToggleMessagesServiceerviceFn = jest.fn();
  const onClearMessageFn = jest.fn();

  it("Should execute onToggleMessagesServiceervice callback when Stop button is clicked.", () => {
    render(
      <SubHeaderActions
        onToggleMessagesServiceervice={onToggleMessagesServiceerviceFn}
        onClearMessage={onClearMessageFn}
        isMessageServiceStopped={false}
      />
    );

    fireEvent.click(screen.getByText(/Stop/));

    expect(onToggleMessagesServiceerviceFn).toHaveBeenCalledTimes(1);
  });

  it("Should display Resume instead of Stop for the first button when isMessageServiceStopped is true", () => {
    render(
      <SubHeaderActions
        onToggleMessagesServiceervice={onToggleMessagesServiceerviceFn}
        onClearMessage={onClearMessageFn}
        isMessageServiceStopped={true}
      />
    );

    expect(screen.getByText(/Resume/)).toBeInTheDocument();
  });

  it("Should execute onClearMessage callback when Clear button is clicked.", () => {
    render(
      <SubHeaderActions
        onToggleMessagesServiceervice={onToggleMessagesServiceerviceFn}
        onClearMessage={onClearMessageFn}
        isMessageServiceStopped={false}
      />
    );

    fireEvent.click(screen.getByText(/Clear/));

    expect(onClearMessageFn).toHaveBeenCalledTimes(1);
  });
});
