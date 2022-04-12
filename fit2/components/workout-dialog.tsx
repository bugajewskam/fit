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
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

import { IWorkout, IWorkoutsType } from "../pages/index";
import { Card, Container, Grid, TextField } from "@mui/material";
import produce from "immer";
import Filter from "./filter";
import DateInput from "./date-input";

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

  useEffect(() => setItem(workout), [workout]);
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(
      produce((draft) => {
        draft!.title = e.target.value;
      })
    );
  };
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(
      produce((draft) => {
        draft!.duration = Number(e.target.value);
      })
    );
  };
  const handleDateChange = (date: moment.Moment) => {
    setItem(
      produce((draft) => {
        draft!.data = date.format("YYYY-MM-DD");
      })
    );
  };
  const handleTypeChange = (type: IWorkoutsType) => {
    setItem(
      produce((draft) => {
        draft!.type = type;
      })
    );
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(
      produce((draft) => {
        draft!.description = e.target.value;
      })
    );
  };
  if (item === null) {
    return <></>;
  }

  return (
    <Dialog fullScreen open onClose={close}>
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
            Sound
          </Typography>
          {item.id && (
            <Button autoFocus color="inherit" onClick={() => remove(item)}>
              delete
            </Button>
          )}
          <Button autoFocus color="inherit" onClick={() => save(item)}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Filter value={item.type} onTabChange={handleTypeChange} />
      <Container maxWidth="sm">
        <Grid container sx={{ gap: 4, padding: 4 }}>
          <TextField
            label="Title"
            fullWidth
            value={item.title}
            onChange={handleTitleChange}
          />
          <DateInput date={item.data} handleChange={handleDateChange} />
          {/* <TextField fullWidth value={item.date} onChange={handleDateChange} /> */}
          <TextField
            fullWidth
            value={item.duration}
            label="Duration"
            onChange={handleDurationChange}
          />
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            rows={6}
            label="Description"
            value={item.description}
            onChange={handleDescriptionChange}
          />
        </Grid>
      </Container>
    </Dialog>
  );
}
