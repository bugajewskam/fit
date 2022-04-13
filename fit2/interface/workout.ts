import { IsInt, isNumber, IsString, MaxLength, MinLength } from "class-validator";
import { IWorkout } from "../pages";
import { IWorkoutsType } from "./interface";

export class Workout implements IWorkout {
//   @IsInt()
//   id?

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title

  @MinLength(1)
  description

  type: IWorkoutsType;

  @IsInt()
  duration

  @IsString()
  data
  constructor(
    //id: number,
    title: string,
    description: string,
    type: IWorkoutsType,
    duration: number,
    data: string
  ) {
      //this.id = id;
      this.title =title;
      this.description = description;
      this.data= data;
      this.type = type;
      this.duration = duration;
  }
 }
