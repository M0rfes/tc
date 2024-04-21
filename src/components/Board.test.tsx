import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAppStore } from "../store";
import { useParams } from "react-router";
import { Board } from "./Board";
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
        {
          title: "Board 1",
          description: "Description 1",
          columns: [["col1"], ["col2"], ["col3"]],
        },
      ],
    });
    render(<Board />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders all the columns", () => {
    const columnElements = screen.getAllByTestId("column");
    expect(columnElements).toHaveLength(3);
  });

  test("renders the correct column title", () => {
    const columnElements = screen.getAllByTestId("column");
    expect(columnElements[0]).toHaveTextContent("col1");
    expect(columnElements[1]).toHaveTextContent("col2");
    expect(columnElements[2]).toHaveTextContent("col3");
  });

  test("renders add task button", () => {
    const buttonElements = screen.getAllByTestId("add-task");
    expect(buttonElements).toHaveLength(3);
  });
});
