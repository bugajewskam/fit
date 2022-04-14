import {
  List,
  Divider,
} from "@mui/material";
import { IWorkout } from "../interface/interface";
import WorkoutItem from "./workout-list-item";
interface IWorkoutListProps {
  workouts: IWorkout[];
  onItemClick: (item: IWorkout) => void;
}
export default function WorkoutsList({ workouts, onItemClick }: IWorkoutListProps) {
  return (
    <List sx={{ width: "100%" }}>
      {workouts.map((item) => (
        <>
          <WorkoutItem item={item} onClick={onItemClick} />
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
