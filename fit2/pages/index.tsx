import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import produce from "immer";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import WorkoutDialog from "../components/workout-dialog";
import styles from "../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Example from "../components/pie-chart";
import PieGraph from "../components/pie-chart";
import Menu from "../components/app-bar";
import moment from "moment";
import { IWorkout } from "../interface/interface";
import Stats from "../components/stats";

const iconsMapping = {
  Cycling: <DirectionsBikeIcon />,
  Running: <DirectionsRunIcon />,
  Cardio: <FitnessCenterIcon />,
};

export const colorsMapping = {
  Cycling: "#0088FE",
  Running: "#00C49F",
  Cardio: "#FFBB28",
};

interface IWorkoutApi {
  list: () => Promise<IWorkout[]>;
  create: (workout: IWorkout) => Promise<IWorkout>;
  update: (workout: IWorkout) => Promise<IWorkout>;
  delete: (workout: IWorkout) => Promise<void>;
}
const postJson = (url: string, method: string, data: any) => {
  return fetch(url, {
    body: JSON.stringify(data),
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
class API implements IWorkoutApi {
  async list() {
    return await (await fetch("/workouts/")).json();
  }

  async delete(workout: IWorkout) {
    const result = await fetch(`/workouts/${workout.id}`, { method: "DELETE" });
  }

  async update(workout: IWorkout) {
    const newWorkout = await postJson(
      `/workouts/${workout.id}`,
      "PATCH",
      workout
    );
    return workout;
  }

  async create(workout: IWorkout) {
    const newWorkout = await (
      await postJson(`/workouts/`, "POST", workout)
    ).json();
    return newWorkout;
  }
}

const api = new API();
const Home: NextPage = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogWorkout, setDialogWorkout] = useState<IWorkout | null>(null);
  console.log(workouts);
  useEffect(() => {
    setLoading(true);
    api
      .list()
      .then((items) => setWorkouts(items))
      .finally(() => setLoading(false));
  }, []);

  const handleDetail = (workout: IWorkout) => () => {
    setDialogOpen(true);
    setDialogWorkout(workout);
  };
  const handleClose = () => {
    setDialogOpen(false);
    setDialogWorkout(null);
  };
  const handleAdd = () => {
    handleDetail({
      title: "",
      data: moment().format("YYYY-MM-DD"),
      duration: 15,
      description: "",
      type: "Cardio",
    })();
  };
  const handleSave = (workout: IWorkout) => {
    if (workout.id) {
      api.update(workout).then(() => {
        setWorkouts(
          produce((draft) => {
            const index = draft.findIndex((item) => item.id === workout.id);
            draft[index] = workout;
          })
        );
        handleClose();
      });
    } else {
      api.create(workout).then((newWorkout) => {
        setWorkouts(
          produce((draft) => {
            draft.push(newWorkout);
          })
        );
        handleClose();
      });
    }
  };

  const handleRemove = (workout: IWorkout) => {
    api.delete(workout).then(() => {
      setWorkouts(
        produce((draft) => {
          const index = draft.findIndex((item) => item.id === workout.id);
          draft.splice(index, 1);
        })
      );
      handleClose();
    });
  };

  console.log(workouts);

  return (
    <>
      <Menu />
      <Container maxWidth="sm">
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <>
            <Stats workouts={workouts} />
            <List sx={{ width: "100%" }}>
              {workouts.map((item) => (
                <>
                  <ListItem key={item.duration}>
                    <ListItemButton onClick={handleDetail(item)}>
                      <>
                        <ListItemAvatar>
                          <Avatar sx={{ background: colorsMapping[item.type] }}>
                            {iconsMapping[item.type]}
                          </Avatar>
                        </ListItemAvatar>
                      </>
                      <ListItemText
                        primary={item.title}
                        secondary={item.data}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </>
        )}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>

        {isDialogOpen && dialogWorkout && (
          <WorkoutDialog
            workout={dialogWorkout}
            save={handleSave}
            remove={handleRemove}
            close={handleClose}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
