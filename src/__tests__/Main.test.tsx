import { render } from "@testing-library/react";
import { Main } from "../components/features";
import { MessageProvider } from "../contexts/MessagesContext";

const Wrapper = () => {
  return (
    <MessageProvider>
      <Main />
    </MessageProvider>
  );
};

describe("Main", () => {
  it("Should render correctly", () => {
    const { container } = render(<Wrapper />);
    expect(container).toBeInTheDocument();
  });
});
