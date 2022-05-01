import { IWorkout } from "../interface/interface";

interface IWorkoutApi {
    list: () => Promise<IWorkout[]>;
    apiUrl : string
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
    apiUrl: string;
    constructor(apiUrl: string){
    	this.apiUrl=apiUrl;
    }
    async list() {
      return await (await fetch(`${this.apiUrl}/workouts/`)).json();
    }
  
    async delete(workout: IWorkout) {
      const result = await fetch(`${this.apiUrl}/workouts/${workout.id}`, { method: "DELETE" });
    }
  
    async update(workout: IWorkout) {
      const newWorkout = await postJson(
        `${this.apiUrl}/workouts/${workout.id}`,
        "PATCH",
        workout
      );
      return workout;
    }
  
    async create(workout: IWorkout) {
      const newWorkout = await (
        await postJson(`${this.apiUrl}/workouts/`, "POST", workout)
      ).json();
      return newWorkout;
    }
  }