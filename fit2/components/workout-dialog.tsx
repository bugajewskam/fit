import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { IWorkout, IWorkoutsType } from "../pages/index";
import { Card, Container, Grid, TextField } from "@mui/material";
import produce from "immer";
import Filter from "./filter";
import DateInput from "./date-input";
import { Controller, useForm } from "react-hook-form";
import { IsDate, IsInt, IsString, Min, MinLength } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Workout } from "../interface/workout";

interface IWorkoutDialogProps {
  workout: IWorkout;

  save(workout: IWorkout): void;

  remove(workout: IWorkout): void;

  close(): void;
}


export default function WorkoutDialog({
  workout,
  close,
  remove,
  save,
}: IWorkoutDialogProps) {
  const [item, setItem] = useState<IWorkout | null>(null);
  const { control, handleSubmit, formState, reset, register } =
    useForm<Workout>({
      mode: "onChange",
      resolver: classValidatorResolver(Workout),
      defaultValues: useMemo(() => {
        return workout;
      }, [workout]),
    });
  useEffect(() => setItem(workout), [workout]);

  if (item === null) {
    return <></>;
  }

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
             {item.id? 'Edit workout': 'Add workout'}
            </Typography>
            {item.id && (
              <Button autoFocus color="inherit" onClick={() => remove(item)}>
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
          //pozwala na wsadzanie MUI
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
              //pozwala na wsadzanie MUI
              render={(props) => (
                <TextField
                  label="Title"
                  fullWidth
                  value={props.field.value}
                  onChange={props.field.onChange}
                  error={props.fieldState.invalid}
                />
              )}
            />
            <Controller
              name={"data"}
              control={control}
              //pozwala na wsadzanie MUI
              render={(props) => (
                <DateInput
                  date={props.field.value}
                  handleChange={(date) => {props.field.onChange(date && date.format("YYYY-MM-DD"));
                  }}
                />
              )}
            />
            <Controller
              name={"duration"}
              control={control}
              //pozwala na wsadzanie MUI
              render={(props) => (
                <TextField
                  label="Duration"
                  fullWidth
                  type={"number"}
                  value={props.field.value}
                  error={props.fieldState.invalid}
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
              //pozwala na wsadzanie MUI
              render={(props) => (
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={6}
                  value={props.field.value}
                  error={props.fieldState.invalid}
                  onChange={props.field.onChange}
                />
              )}
            />

            {/* {workout.id && (
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
    </Dialog>
  );
}
