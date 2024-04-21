import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";

import { BoardList } from "./BoardList";
import { useAppStore } from "../store";

describe("BoardList Component", () => {
  beforeEach(() => {
    render(<BoardList />);
  });

  test("if boards count is 0 render no boards available", async () => {
    const store = useAppStore.getState();
    await act(() => {
      store.reset();
    });
    const noBoardsElement = screen.getByText("No boards available");
    expect(noBoardsElement).toBeInTheDocument();
  });

  test("renders all the boards from the store", async () => {
    const store = useAppStore.getState();
    await act(() => {
      store.addBoard({ title: "Board 1", description: "Description 1" });
      store.addBoard({ title: "Board 2", description: "Description 2" });
      store.addBoard({ title: "Board 2", description: "Description 3" });
    });
    const boardLists = screen.getAllByTestId("list-item");
    expect(boardLists).toHaveLength(3);
  });

  test("renders the correct title and description for each board", async () => {
    const store = useAppStore.getState();
    await act(() => {
      store.addBoard({ title: "Board 1", description: "Description 1" });
      store.addBoard({ title: "Board 2", description: "Description 2" });
      store.addBoard({ title: "Board 3", description: "Description 3" });
    });
    const boardLists = screen.getAllByTestId("list-item");
    expect(boardLists[0]).toHaveTextContent("Board 1");
    expect(boardLists[0]).toHaveTextContent("Description 1");
    expect(boardLists[1]).toHaveTextContent("Board 2");
    expect(boardLists[1]).toHaveTextContent("Description 2");
    expect(boardLists[2]).toHaveTextContent("Board 3");
    expect(boardLists[2]).toHaveTextContent("Description 3");
  });
});
