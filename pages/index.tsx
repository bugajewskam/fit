import { CircularProgress, Container, Fab } from "@mui/material";
import produce from "immer";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import WorkoutDialog from "../components/workout-dialog";
import AddIcon from "@mui/icons-material/Add";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Menu from "../components/app-bar";
import moment from "moment";
import { IWorkout } from "../interface/interface";
import Stats from "../components/stats";
import WorkoutsList from "../components/lists";
import { API } from "../data/api";
import { DummyApi } from "../helper/dummyApi";
import { WorkoutContext } from "../context/workout-context";

export const iconsMapping = {
  Cycling: <DirectionsBikeIcon />,
  Running: <DirectionsRunIcon />,
  Cardio: <FitnessCenterIcon />,
};

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

  const handleItemClick = (workout: IWorkout) => {
    setDialogOpen(true);
    setDialogWorkout(workout);
  };
  const handleClose = () => {
    setDialogOpen(false);
    setDialogWorkout(null);
  };
  const handleAdd = () => {
    handleItemClick({
      title: "",
      data: moment().format("YYYY-MM-DD"),
      duration: 15,
      description: "",
      type: "Cardio",
    });
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
    <><WorkoutContext.Provider value={{save: handleSave, remove: handleRemove, close: handleClose}}>
      <Menu />
      <Container maxWidth="sm">
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <>
            <Stats workouts={workouts} />
            <WorkoutsList workouts={workouts} onItemClick={handleItemClick} />
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
          />
        )}
      </Container>
      </WorkoutContext.Provider>
    </>
  );
};

export default Home;
