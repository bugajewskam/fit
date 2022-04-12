import { Box, Tabs, Tab } from "@mui/material";
import { useCallback } from "react";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export type IWorkoutsType = "Cardio" | "Cycling" | "Running" | "General";

interface IFilterProps {
  value: IWorkoutsType;
  onTabChange: (value: IWorkoutsType) => void;
}

export default function Filter({ value, onTabChange }: IFilterProps) {
  const handleChange = useCallback(
    (e: any, value: IWorkoutsType) => onTabChange(value),
    [onTabChange]
  );
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", align: "center" }}>
      <Tabs variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab icon={<DirectionsBikeIcon />} label="Cycling" value="Cycling" />
        <Tab icon={<DirectionsRunIcon />} label="Running" value="Running"/>
        <Tab icon={< FitnessCenterIcon/>} label="Cardio" value="Cardio" />
        {/* <Tab icon={<DirectionsBikeIcon/>} label="Cycling" value="Cycling"/> */}

      </Tabs>
    </Box>
  );
}
