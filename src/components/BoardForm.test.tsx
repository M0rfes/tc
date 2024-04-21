import { BoardForm } from "./BoardForm";
import { render, screen } from "@testing-library/react";

test("renders title", () => {
  render(<BoardForm />);
  const titleElement = screen.getByTestId("title");
  expect(titleElement).toBeInTheDocument();
});
