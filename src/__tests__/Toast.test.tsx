import { render, screen } from "@testing-library/react";
import { Toast, handleClose } from "../components/ui";

describe("Toast", () => {
  const LAST_MESSAGE_MOCK = { message: "Test message", priority: 0 };
  it("Should render an opened toast displaying the message text, if the message has priority 0.", () => {
    render(<Toast lastMessage={LAST_MESSAGE_MOCK} />);

    expect(screen.getByText(/Test message/)).toBeInTheDocument();
  });

  it("Should not render the toast if the message has other priority.", () => {
    render(<Toast lastMessage={{ ...LAST_MESSAGE_MOCK, priority: 1 }} />);

    expect(screen.queryByText(/Test message/)).not.toBeInTheDocument();
  });

  describe("Handle close function", () => {
    it("Should not do anything if handleClose is called with reason 'clickaway'.", () => {
      const MOCK_FN = jest.fn();
      handleClose(MOCK_FN, "clickaway");

      expect(MOCK_FN).not.toHaveBeenCalled();
    });

    it("Should call the onClose function if no reason is provided.", () => {
      const MOCK_FN = jest.fn();
      handleClose(MOCK_FN);

      expect(MOCK_FN).toHaveBeenCalled();
    });

    it("Should call the onClose function if reason provided is not 'clickaway'.", () => {
      const MOCK_FN = jest.fn();
      handleClose(MOCK_FN, "other reason");

      expect(MOCK_FN).toHaveBeenCalled();
    });
  });
});
