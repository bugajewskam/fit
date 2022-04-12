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

import { IWorkout } from "../pages/index";
import { TextField } from "@mui/material";
import produce from "immer";

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
        draft!.duration = e.target.value;
      })
    );
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(
      produce((draft) => {
        draft!.date = e.target.value;
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
      <TextField value={item.title} onChange={handleTitleChange} />
      <TextField value={item.date} onChange={handleDateChange} />
      <TextField value={item.duration} onChange={handleDurationChange} />
    </Dialog>
  );
}
