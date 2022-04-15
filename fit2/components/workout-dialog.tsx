import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useMemo, useState } from "react";

import { IWorkout } from "../interface/interface";
import { Container, Grid, TextField } from "@mui/material";
import Filter from "./filter";
import DateInput from "./date-input";
import { Controller, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Workout } from "../interface/workout";
import AlertDialog from "./dialog";
import { WorkoutContext } from "../context/workout-context";

interface IWorkoutDialogProps {
  workout: IWorkout;
}
export default function WorkoutDialog({
  workout
}: IWorkoutDialogProps) {
  const [item, setItem] = useState<IWorkout | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { control, handleSubmit, formState, reset, register } =
    useForm<Workout>({
      mode: "onChange",
      resolver: classValidatorResolver(Workout),
      defaultValues: useMemo(() => {
        return workout;
      }, [workout]),
    });
    const {save, remove, close} = useContext(WorkoutContext);
  useEffect(() => setItem(workout), [workout]);

  if (item === null) {
    return <></>;
  }
  const handleDelete= () => setDeleteId(workout.id);


  return (
    <Dialog fullScreen open onClose={close}>
      <form onSubmit={handleSubmit((data) => save(data))}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {item.id ? "Edit workout" : "Add workout"}
            </Typography>
            {!!item.id && (
              <Button autoFocus color="inherit" onClick={handleDelete}>
                delete
              </Button>
            )}
            <Button autoFocus color="inherit" type={"submit"}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Controller
          name={"type"}
          control={control}
          render={(props) => (
            <Filter
              onTabChange={props.field.onChange}
              value={props.field.value}
            />
          )}
        />
        <Container maxWidth="sm">
          <Grid container sx={{ gap: 4, padding: 4 }}>
            <Controller
              name={"title"}
              control={control}
              render={(props) => (
                <TextField
                  label="Title"
                  fullWidth
                  value={props.field.value}
                  onChange={props.field.onChange}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
            <Controller
              name={"data"}
              control={control}
              render={(props) => (
                <DateInput
                  date={props.field.value}
                  handleChange={(date) => {
                    props.field.onChange(date && date.format("YYYY-MM-DD"));
                  }}
                />
              )}
            />
            <Controller
              name={"duration"}
              control={control}
              render={(props) => (
                <TextField
                  label="Duration"
                  fullWidth
                  type={"number"}
                  value={props.field.value}
                  error={props.fieldState.invalid}
                  helperText={props.fieldState.error?.message}
                  onChange={(event) => {
                    const value = event.target.value;
                    const v = Number(value) || value;
                    props.field.onChange(v);
                  }}
                />
              )}
            />

            <Controller
              name={"description"}
              control={control}
              render={(props) => (
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={6}
                  value={props.field.value}
                  error={props.fieldState.invalid}
                  onChange={props.field.onChange}
                  helperText={props.fieldState.error?.message}
                />
              )}
            />
            {/* 
            {workout.id && (
              <input
                hidden
                {...register(`id`, {
                  value: workout.id,
                })}
              />
            )} */}
          </Grid>
        </Container>
      </form>
      {deleteId && (
        <AlertDialog
          open={true}
          text={"Are you sure you want to delete this workout?"}
          title={"Delete workout"}
          onClickYes={() => {
            remove(item);
            setDeleteId(null);
          }}
          onClickNo={() => setDeleteId(null)}
        />
      )}
    </Dialog>
  );
}
