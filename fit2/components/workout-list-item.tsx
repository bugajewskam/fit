import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCallback } from "react";
import { IWorkout, IWorkoutsType } from "../interface/interface";
import { colorsMapping, iconsMapping } from "../pages";

interface IWorkoutItemProps {
  item: IWorkout;
  onClick: (item:IWorkout) => void;
}

export default function WorkoutItem({ item, onClick }: IWorkoutItemProps) {
  const handleClick = useCallback(() => onClick(item), [onClick, item]);
  return (
    <ListItem key={item.duration}>
      <ListItemButton onClick={handleClick}>
        <>
          <ListItemAvatar>
            <Avatar sx={{ background: colorsMapping[item.type] }}>
              {iconsMapping[item.type]}
            </Avatar>
          </ListItemAvatar>
        </>
        <ListItemText primary={item.title} secondary={item.data} />
      </ListItemButton>
    </ListItem>
  );
}
