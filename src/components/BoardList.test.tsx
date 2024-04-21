import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { BoardList } from "./BoardList";
import { useAppStore } from "../store";

describe("BoardList Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <BoardList />
      </MemoryRouter>
    );
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
    });
    const boardLists = screen.getAllByTestId("list-item");
    expect(boardLists[0]).toHaveTextContent("Board 1");
    expect(boardLists[0]).toHaveTextContent("Description 1");
  });

  test("each link has the correct href", async () => {
    const store = useAppStore.getState();
    await act(() => {
      store.addBoard({ title: "Board 1", description: "Description 1" });
      store.addBoard({ title: "Board 2", description: "Description 2" });
      store.addBoard({ title: "Board 3", description: "Description 3" });
    });
    const boardLists = screen.getAllByTestId("list-item");
    expect(boardLists[0].closest("a")).toHaveAttribute("href", "/board/0");
    expect(boardLists[1].closest("a")).toHaveAttribute("href", "/board/1");
    expect(boardLists[2].closest("a")).toHaveAttribute("href", "/board/2");
  });
});
