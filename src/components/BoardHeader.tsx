import { Box, Typography, TextField, Button } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router";
import { useAppStore } from "../store";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const BoardHeader: FC = () => {
  const props = useParams<{ id: string }>();
  const index = parseInt(props.id!) - 1;
  const { boards, addColumn } = useAppStore();
  const board = boards[index];
  const schema = z.object({
    name: z
      .string()
      .min(3)
      .superRefine((val, ctx) => {
        if (board.columns.some((column) => column[0] === val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Column name already in use",
            path: [],
          });
        }
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
    values: {
      name: "",
    },
  });
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
        <Typography variant="h6">{board.title}</Typography>
        <Typography variant="body1">{board.description}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
        component="form"
        onSubmit={handleSubmit((data) => {
          addColumn(index, data.name);
        })}
      >
        <TextField
          label="Column Name"
          variant="outlined"
          {...register("name", { required: true })}
          error={!!errors.name}
          helperText={errors.name?.message?.toString()}
          inputProps={{
            "data-testid": "column-name",
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Add Column
        </Button>
      </Box>
    </>
  );
};
