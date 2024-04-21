import { act } from "react-dom/test-utils";
import { BoardForm } from "./BoardForm";
import { render, screen, fireEvent } from "@testing-library/react";

describe("BoardForm Component", () => {
  beforeEach(() => {
    render(<BoardForm />);
  });

  test("renders title", () => {
    const titleElement = screen.getByTestId("title");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders title input", () => {
    const titleElement = screen.getByTestId("title-input");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders description textarea", () => {
    const descriptionElement = screen.getByTestId("description-textarea");
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders create button", () => {
    const buttonElement = screen.getByRole("button", {
      name: /create new board/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  test("create button is disabled by default", () => {
    const buttonElement = screen.getByRole("button", {
      name: /create new board/i,
    });
    expect(buttonElement).toBeDisabled();
  });

  test("it shows and error is title has less then 3 characters", async () => {
    const titleElement = screen.getByTestId("title-input");
    expect(
      screen.queryByText("String must contain at least 3 character(s)")
    ).toBeNull();
    await act(() => {
      fireEvent.focus(titleElement);
      fireEvent.blur(titleElement);
    });
    const errorElement = screen.getByText(
      "String must contain at least 3 character(s)"
    );
    expect(errorElement).toBeInTheDocument();
  });

  test("it shows and error is description has less then 10 characters", async () => {
    const descriptionElement = screen.getByTestId("description-textarea");
    expect(
      screen.queryByText("String must contain at least 10 character(s)")
    ).toBeNull();
    await act(() => {
      fireEvent.focus(descriptionElement);
      fireEvent.blur(descriptionElement);
    });
    const errorElement = screen.getByText(
      "String must contain at least 10 character(s)"
    );
    expect(errorElement).toBeInTheDocument();
  });

  test("it enables the button when the form is valid", async () => {
    const titleElement = screen.getByTestId("title-input");
    const descriptionElement = screen.getByTestId("description-textarea");
    const buttonElement = screen.getByRole("button", {
      name: /create new board/i,
    });
    expect(buttonElement).toBeDisabled();
    await act(() => {
      fireEvent.change(titleElement, {
        target: { value: "Hello World" },
      });
      fireEvent.change(descriptionElement, {
        target: { value: "Hello World" },
      });
    });
    expect(buttonElement).toBeEnabled();
  });
});
