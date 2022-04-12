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
export type IWorkoutsType = "Cardio" | "Cycling" | "Running" | "General";
export interface IWorkout {
  id?: number;
  title: string;
  duration: number;
  description: string;
  type: IWorkoutsType;
  // Typo in API
  data: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  weight: number;
  height?: number;
}

const iconsMapping = {
  Cycling: <DirectionsBikeIcon />,
  Running: <DirectionsRunIcon />,
  Cardio: <FitnessCenterIcon />,
};

export const colorsMapping = {
  Cycling: '#0088FE',
  Running: '#00C49F',
  Cardio: '#FFBB28'
}

interface IWorkoutApi {
  list: () => Promise<IWorkout[]>;
  create: (workout: IWorkout) => Promise<IWorkout>;
  update: (workout: IWorkout) => Promise<IWorkout>;
  delete: (workout: IWorkout) => Promise<void>;
}
const postJson = (url: string, method: string, data: any) => {
  return fetch(url, {body: JSON.stringify(data), method, headers: {
    'Content-Type':'application/json'
  }});
}
class API implements IWorkoutApi {
  async list() {
    return await (await fetch("/workouts/")).json();
  }

  async delete(workout: IWorkout) {
    const result = await fetch(`/workouts/${workout.id}`, { method: "DELETE" });
  }

  async update(workout: IWorkout) {
    const newWorkout = await postJson(`/workouts/${workout.id}`, "PATCH", workout);
    return workout;
  }

  async create(workout: IWorkout) {
    const newWorkout = await (await postJson(`/workouts/`, "POST", workout)).json();
    return newWorkout;
  }
}

class DummyApi implements IWorkoutApi {
  state: IWorkout[];
  constructor() {
    // przykłądowe treningi
    this.state = [
      {
        id: 234,
        title: "helps",
        duration: 34,
        data: "2022-04-11",
        description: "jnei fu udwqwubcubuqud",
        type: "Cardio",
      },
      {
        id: 245,
        title: "Krustain",
        duration: 34,
        data: "2022-04-11",
        description: "jnei fu udwqwubcubuqud",
        type: "Running",
      },
      {
        id: 235,
        title: "Monika",
        duration: 34,
        data: "2022-04-11",
        description: "jnei fu udwqwubcubuqud",
        type: "Cardio",
      },
      {
        id: 215,
        title: "Michał",
        duration: 34,
        data: "2022-04-11",
        description: "jnei fu udwqwubcubuqud",
        type: "Running",
      },
    ];
  }
  list(): Promise<IWorkout[]> {
    // pozytywnie kończy promisa
    return Promise.resolve([...this.state]);
  }
  create(workout: IWorkout): Promise<IWorkout> {
    const newItem = { ...workout, id: Math.floor(Math.random() * 100000) };
    this.state.push(newItem);
    return Promise.resolve(newItem);
  }
  update(workout: IWorkout): Promise<IWorkout> {
    const index = this.state.findIndex((item) => item.id === workout.id);
    this.state[index] = { ...workout };
    return Promise.resolve(workout);
  }
  delete(workout: IWorkout): Promise<void> {
    const index = this.state.findIndex((item) => item.id === workout.id);
    this.state.splice(index, 1);
    return Promise.resolve();
  }
}
const api = new API();
const Home: NextPage = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogWorkout, setDialogWorkout] = useState<IWorkout | null>(null);

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
      data: "",
      duration: 0,
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

  const graphData = useMemo(()=>{
    const countByType = workouts.reduce((dict: { [k: string]: number }, workout)=>{
        dict[workout.type] = (dict[workout.type] || 0) + 1;
        return dict;
    }, {});
    // workouts.reduce((sum: number, workout)=> sum + workout.duration, 0);
    return Object.entries(countByType).map(([name,value])=>({name, value}));
  }, [workouts])

  return (
    <Container maxWidth="sm">
      <Box sx={{width:"100%", height: 260}}>
        <PieGraph data={graphData}/>
      </Box>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <List sx={{ width: "100%" }}>
          {workouts.map((item) => (
            // <ListItem key={item.id} disablePadding>
            //   <ListItemButton onClick={handleDetail(item)}>
            //     <ListItemText primary={item.title} />
            //   </ListItemButton>
            // </ListItem>
            <>
              <ListItem key={item.duration}>
                <ListItemButton onClick={handleDetail(item)}>
                  <>
                    <ListItemAvatar>
                      <Avatar sx={{background: colorsMapping[item.type]}}>{iconsMapping[item.type]}</Avatar>
                    </ListItemAvatar>
                  </>
                  <ListItemText primary={item.title} secondary={item.data} />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
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
  );
};

export default Home;
