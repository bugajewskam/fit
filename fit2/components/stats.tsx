import { useMemo } from "react";
import { IWorkout } from "../interface/interface";
import SwipeableViews from "react-swipeable-views";
import {autoPlay} from "react-swipeable-views-utils";
import { Box } from "@mui/material";
import PieGraph from "./pie-chart";
import moment from "moment";
import BarGraph from "./bar-chart";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface IStatsProps {
    workouts: IWorkout[];
}
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export default function Stats({ workouts }: IStatsProps) {
  const graphData = useMemo(() => {
    const countByType = workouts.reduce(
      (dict: { [k: string]: number }, workout) => {
        dict[workout.type] = (dict[workout.type] || 0) + 1;
        return dict;
      },
      {}
    );
    // {"Cycling":5, "Running": 3}
    // workouts.reduce((sum: number, workout)=> sum + workout.duration, 0);
    // [["Cycling", 5], ["Running", "3"]] => [{"name": "Cycling", "value": 5, ...}]
    return Object.entries(countByType).map(([name, value]) => ({
      name,
      value,
    }));
  }, [workouts]);

  const barData = useMemo(() => {
    const now = moment();
    const sumByDate = workouts.reduce((acc: { [key: string]: number }, item) => {
      acc[item.data] = (acc[item.data] || 0) + item.duration;
      return acc;
    }, {});
    const weeklyStats = [];
    for (let i = 0; i <= 6; i++) {
      const day = now.clone();
      // Od 1 dnia tygodnia do 7
      day.isoWeekday(i + 1);
      const dayLastWeek = day.clone();
      dayLastWeek.subtract(1, "weeks");
      const dayKey = day.format("YYYY-MM-DD");
      const dayLastWeekKey = dayLastWeek.format("YYYY-MM-DD");
      weeklyStats[i] = {
        totalDuration: sumByDate[dayKey] || 0,
        totalDurationLastWeek: sumByDate[dayLastWeekKey] || 0,
        day: days[i],
      };
    }
    return weeklyStats;
  }, [workouts]);
  const bars = [
    { key: "totalDurationLastWeek", fill: "#00C49F", name: "Last week" },
    { key: "totalDuration", fill: "#FFBB28", name: "This week" },
  ];


  return (
    <AutoPlaySwipeableViews enableMouseEvents>
      <Box sx={{ width: "100%", height: 280 }}>
        <PieGraph data={graphData} />
      </Box>
      <Box sx={{ width: "100%", height: 280 }}>
        <BarGraph data={barData} bars={bars}/>
      </Box>
    </AutoPlaySwipeableViews>
  );
}

