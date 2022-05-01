import { experimental_extendTheme } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { IWorkout } from "../interface/interface";
import Menu from "./app-bar";
import user from "@testing-library/user-event";
import WorkoutDialog from "./workout-dialog";
let save, close, workout, remove;
beforeEach(() => {
  save = jest.fn();
  close = jest.fn();
  remove = jest.fn();
  workout = {
    id: 234,
    title: "helps",
    duration: 34,
    data: "2022-04-11",
    description: "jnei fu udwqwubcubuqud",
    type: "Cardio",
  } as IWorkout;
});
describe("Test Workout dialog", () => {
  test("Clicking delete and confirming calls remove", () => {
    render(
      <WorkoutDialog
        workout={workout}
      />
    );
    screen.getByText("delete").click();
    screen.getByText("YES").click();
    expect(remove).toBeCalledWith(workout);
  });
  test("Clicking delete and confirming doesn't remove", () => {
    render(
      <WorkoutDialog
        workout={workout}
      />
    );
    screen.getByText("delete").click();
    screen.getByText("NO").click();
    expect(remove).toBeCalledTimes(0);
  });
});
