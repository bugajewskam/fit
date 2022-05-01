import React from "react";
import { IWorkout } from "../interface/interface";

export const WorkoutContext = React.createContext({
  save: (item: IWorkout) => {},
  remove: (item: IWorkout) => {},
  close: () => {},
});
