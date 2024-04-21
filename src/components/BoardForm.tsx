import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
});

export const BoardForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    values: {
      title: null,
      description: null,
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    handleSubmit(data);
  };
  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6" data-testid="title">
        Create New Board
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        {...register("title", { required: true })}
        error={!!errors.title}
        helperText={errors.title?.message?.toString()}
        inputProps={{
          "data-testid": "title-input",
        }}
      />

      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4} // This makes it a text area with a height of 4 lines
        fullWidth
        {...register("description", { required: true })}
        error={!!errors.description}
        helperText={errors.description?.message?.toString()}
        inputProps={{
          "data-testid": "description-textarea",
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!isValid}
      >
        Create New Board
      </Button>
    </Box>
  );
};
