import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAppStore } from "../store";
import { useParams } from "react-router";

import { BoardHeader } from "./BoardHeader";

jest.mock("../store", () => ({
  useAppStore: jest.fn(),
}));

jest.mock("react-router", () => ({
  useParams: jest.fn(),
}));

describe("BoardHeader Component", () => {
  beforeEach(() => {
    (useParams as unknown as jest.Mock).mockReturnValue({ id: "1" });
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      boards: [
        { title: "Board 1", description: "Description 1", columns: [["col1"]] },
      ],
      addColumn: jest.fn(),
    });
    render(<BoardHeader />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders board title", () => {
    const titleElement = screen.getByText("Board 1");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders board description", () => {
    const descriptionElement = screen.getByText("Description 1");
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders column name input", () => {
    const inputElement = screen.getByTestId("column-name");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders add column button", () => {
    const buttonElement = screen.getByRole("button", {
      name: /add column/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  test("add column button is disabled by default", () => {
    const buttonElement = screen.getByRole("button", {
      name: /add column/i,
    });
    expect(buttonElement).toBeDisabled();
  });

  test("it shows an error if column name is empty", async () => {
    const inputElement = screen.getByTestId("column-name");
    expect(
      screen.queryByText("String must contain at least 3 character(s)")
    ).toBeNull();
    await act(async () => {
      fireEvent.focus(inputElement);
      fireEvent.blur(inputElement);
    });
    const errorElement = screen.getByText(
      "String must contain at least 3 character(s)"
    );
    expect(errorElement).toBeInTheDocument();
  });

  test("it shows an error if column name is already in use", async () => {
    const inputElement = screen.getByTestId("column-name");
    fireEvent.change(inputElement, { target: { value: "col1" } });
    await act(async () => {
      fireEvent.focus(inputElement);
      fireEvent.blur(inputElement);
    });
    const errorElement = screen.getByText("Column name already in use");
    expect(errorElement).toBeInTheDocument();
  });

  test("it calls addColumn when form is submitted", async () => {
    const addColumn = jest.fn();
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      boards: [
        { title: "Board 1", description: "Description 1", columns: [["col1"]] },
      ],
      addColumn,
    });
    const inputElement = screen.getByTestId("column-name");
    const buttonElement = screen.getByRole("button", {
      name: /add column/i,
    });
    await act(() => {
      fireEvent.change(inputElement, { target: { value: "col2" } });
    });
    expect(buttonElement).not.toBeDisabled();
    await act(() => {
      fireEvent.click(buttonElement);
    });
    expect(addColumn).toHaveBeenCalledWith(0, "col2");
  });
});
