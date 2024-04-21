import { act, fireEvent, render, screen } from "@testing-library/react";
import { useAppStore } from "../store";
import { useParams } from "react-router";
import { Board } from "./Board";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { addDays } from "date-fns";
jest.mock("../store", () => ({
  useAppStore: jest.fn(),
}));
jest.mock("react-router", () => ({
  useParams: jest.fn(),
}));

describe("BoardHeader Component", () => {
  const deleteTask = jest.fn();
  const favoriteTask = jest.fn();
  const editTask = jest.fn();
  const sortTasks = jest.fn();
  const tasks = [
    {
      title: "ccc",
      description: "description1",
      deadline: addDays(new Date(), 1),
      isFavorite: true,
    },
    {
      title: "bbb",
      description: "description2",
      deadline: addDays(new Date(), 1),
    },
    {
      title: "aaa",
      description: "description3",
      deadline: addDays(new Date(), 1),
    },
  ];
  beforeEach(() => {
    (useParams as unknown as jest.Mock).mockReturnValue({ id: "1" });
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      boards: [
        {
          title: "Board 1",
          description: "Description 1",
          columns: [
            ["col1", tasks],
            ["col2", []],
            ["col3", []],
          ],
        },
      ],
      deleteTask,
      favoriteTask,
      editTask,
      sortTasks,
    });
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Board />
      </LocalizationProvider>
    );
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

  test("renders all the tasks", () => {
    const taskElements = screen.getAllByTestId("task");
    expect(taskElements).toHaveLength(3);
  });

  test("renders the correct task title and description", () => {
    const taskElements = screen.getAllByTestId("task");
    expect(taskElements[0]).toHaveTextContent("task1");
    expect(taskElements[0]).toHaveTextContent("description1");
    expect(taskElements[1]).toHaveTextContent("task2");
    expect(taskElements[1]).toHaveTextContent("description2");
    expect(taskElements[2]).toHaveTextContent("task3");
    expect(taskElements[2]).toHaveTextContent("description3");
  });

  test("render delete task button", () => {
    const buttonElements = screen.getAllByTestId("delete-task");
    expect(buttonElements).toHaveLength(3);
  });

  test("render favorite task button", () => {
    const buttonElements = screen.getAllByTestId("fav-task");
    expect(buttonElements).toHaveLength(3);
  });

  test("calls delete task when delete task button is clicked", async () => {
    const buttonElement = screen.getAllByTestId("delete-task")[0];
    await act(() => {
      fireEvent.click(buttonElement);
    });
    expect(deleteTask).toHaveBeenCalledWith(0, 0, 0);
  });

  test("calls favorite task when favorite task button is clicked", async () => {
    const buttonElement = screen.getAllByTestId("fav-task")[0];
    await act(() => {
      fireEvent.click(buttonElement);
    });
    expect(favoriteTask).toHaveBeenCalledWith(0, 0, 0);
  });

  test("calls edit task when edit task button is clicked", async () => {
    const buttonElement = screen.getAllByTestId("edit-task")[0];
    await act(() => {
      fireEvent.click(buttonElement);
    });
    const submitButtonElement = screen.getByTestId("submit-button");
    expect(submitButtonElement).toBeEnabled();
    await act(() => {
      fireEvent.click(submitButtonElement);
    });
    expect(editTask).toHaveBeenCalledWith(0, 0, 0, {
      title: "task1",
      description: "description1",
      deadline: tasks[0].deadline,
    });
  });

  test("calls sort tasks when sort button is clicked", async () => {
    const buttonElement = screen.getAllByTestId("sort-task")[0];
    await act(() => {
      fireEvent.click(buttonElement);
    });
    expect(sortTasks).toHaveBeenCalledWith(0, 0);
  });
});
