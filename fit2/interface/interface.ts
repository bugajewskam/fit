export interface IWorkout {
    id: number;
    title: string;
    description: string;
    type: IWorkoutsType; // tutaj możemy się różnic, ale lepiej nie :)
    duration: number;
    data: string;
  }
  
  export interface IUser {
    id: number;
    name: string;
    email: string;
    weight: number;
    heigh?: number;
  }
  
  export interface ICreateWorkout {
      title: string,
      description: string,
      type: string,
      duration: number,
      data: string,
  }
  
  export interface IUpdatedWorkout {
      title?: string,
      description?: string,
      type?: string,
      duration?: number,
      data?: string,
  }
  
  export type IWorkoutsType = 'Cardio' | 'Cycling' | 'Running' | 'General';