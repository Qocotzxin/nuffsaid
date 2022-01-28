import { Header } from "../components/ui";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  it("Should render the title passed to the component.", () => {
    render(<Header title="Test title" />);

    expect(screen.getByText(/Test title/)).toBeInTheDocument();
  });

  it("Should render the text passed inside a heading element.", () => {
    render(<Header title="Test title" />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
