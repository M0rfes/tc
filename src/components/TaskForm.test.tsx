import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskForm } from "./TaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

describe("TaskForm Component", () => {
  let open = true;
  let onClose = jest.fn();
  let onSubmit = jest.fn();

  beforeEach(() => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TaskForm
          open={open}
          onClose={onClose}
          onSubmit={onSubmit}
          task={null}
        />
      </LocalizationProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders create task title", () => {
    const titleElement = screen.getByTestId("title");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders task title input", () => {
    const titleElement = screen.getByTestId("title-input");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders task description textarea", () => {
    const descriptionElement = screen.getByTestId("description-textarea");
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders task due date input", () => {
    const dueDateElement = screen.getByLabelText("Due Date");
    expect(dueDateElement).toBeInTheDocument();
  });

  test("renders task create button", () => {
    const buttonElement = screen.getByTestId("submit-button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("create task button is disabled by default", () => {
    const buttonElement = screen.getByTestId("submit-button");
    expect(buttonElement).toBeDisabled();
  });

  test("it shows and error when task title has less then 3 characters", async () => {
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

  test("it shows and error when task description has less then 10 characters", async () => {
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
});
