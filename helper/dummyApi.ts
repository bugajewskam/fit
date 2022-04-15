import { IWorkout } from "../interface/interface";
interface IWorkoutApi {
    list: () => Promise<IWorkout[]>;
    create: (workout: IWorkout) => Promise<IWorkout>;
    update: (workout: IWorkout) => Promise<IWorkout>;
    delete: (workout: IWorkout) => Promise<void>;
  }
 export class DummyApi implements IWorkoutApi {
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