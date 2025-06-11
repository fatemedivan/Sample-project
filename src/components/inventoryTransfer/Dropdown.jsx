import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function Dropdown({ label, value, onChange, options, labelId }) {
  return (
    <FormControl sx={{ flex: 1, minWidth: 150 }} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} value={value} label={label} onChange={onChange}>
        <MenuItem value="">
          <em>همه</em>
        </MenuItem>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
