import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
interface IDataInputProps {
  date: string;
  handleChange: (date: moment.Moment) => void;
}
export default function DateInput({ date, handleChange }: IDataInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={date}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Date" fullWidth />
        )}
      />
    </LocalizationProvider>
  );
}
