import produce from "immer";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import WorkoutDialog from "../components/workout-dialog";
import styles from "../styles/Home.module.css";

export interface IWorkout {
  id?: number;
  title: string;
  duration: string;
  date: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  weight: number;
  height?: number;
}

interface IWorkoutApi {
  list: () => Promise<IWorkout[]>;
  create: (workout: IWorkout) => Promise<IWorkout>;
  update: (workout: IWorkout) => Promise<IWorkout>;
  delete: (workout: IWorkout) => Promise<void>;
}
// class API implements IApi {
// 	async list(){
// 		return await(await(fetch('/workouts/'))).json();
// 	}

// 	async delete(workout:IWorkout){
// 		const result = await(fetch(`/workouts/${workout.id}`, method: 'DELETE'));

// 	}

// 	async update(workout:IWorkout){
// 		const newWorkout = await(await(fetch(`/workouts/${workout.id}`,
//     method: 'POST',
//     body: JSON.toJSON(workout))).json());
// 		return newWorkout;
// 	}

// 	async create(workout:IWorkout){
// 		const newWorkout = await(await(fetch(`/workouts/`, method: 'POST', body: JSON.toJSON(workout))));
// 		return newWorkout;
// 	}
// }

class DummyApi implements IWorkoutApi {
  state: IWorkout[];
  constructor() {
    // przykłądowe treningi
    this.state = [
      { id: 234, title: "helps", duration: "34", date: "2022-04-11" },
      { id: 245, title: "Krustain", duration: "34", date: "2022-04-11" },
      { id: 235, title: "Monika", duration: "34", date: "2022-04-11" },
      { id: 215, title: "Michał", duration: "34", date: "2022-04-11" },
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
const api = new DummyApi();
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
    handleDetail({ title: "", date: "", duration: "0" })();
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

  return (
    <>
    {workouts.map((item)=>
    <div>{item.title}</div>)}

        <button onClick={handleAdd}> Add </button>
        {isDialogOpen && dialogWorkout && (
        <WorkoutDialog
          workout={dialogWorkout}
          save={handleSave}
          remove={handleRemove}
          close={handleClose}
        />)}
    </>
  );
};

export default Home;
