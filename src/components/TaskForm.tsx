import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "../store";
type TaskFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (props: {
    title: string;
    description: string;
    deadline: Date;
  }) => void;
  task: Task | null;
};

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
});

export const TaskForm: FC<TaskFormProps> = ({
  open,
  onClose,
  onSubmit,
  task,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    values: {
      title: task?.title || "",
      description: task?.description || "",
      deadline: task?.deadline || null,
    },
  });

  return (
    <Modal
      open={open || !!task}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        component="form"
        onSubmit={handleSubmit((data: any) => {
          onSubmit(data);
          reset();
        })}
      >
        <Typography variant="h6" data-testid="title">
          Create New Task
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          inputProps={{
            "data-testid": "title-input",
          }}
          {...register("title", { required: true })}
          error={!!errors.title}
          helperText={errors.title?.message?.toString()}
        />

        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4} // This makes it a text area with a height of 4 lines
          fullWidth
          inputProps={{
            "data-testid": "description-textarea",
          }}
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={errors.description?.message?.toString()}
        />

        <DateTimePicker
          disablePast
          label="Due Date"
          onChange={(date) => {
            const oldDate = getValues("deadline");
            if (!date && !oldDate) {
              setError("deadline", {
                type: "required",
                message: "Due date is required",
              });
            }
            if (!date) {
              return;
            }
            setValue("deadline", date);
          }}
          onError={(error) => {
            if (!error) {
              setError("deadline", {});
              return;
            }
            setError("deadline", {
              type: "invalid",
              message: error,
            });
          }}
          value={getValues("deadline")}
          data-testid="due-date"
        />
        {errors.deadline && (
          <Typography color="error">
            {errors.deadline.message?.toString()}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValid}
          data-testid="submit-button"
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
