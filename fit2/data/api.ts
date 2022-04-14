import { IWorkout } from "../interface/interface";

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
  export class API implements IWorkoutApi {
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
  