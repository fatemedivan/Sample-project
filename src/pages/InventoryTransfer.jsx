import React, { useState } from "react";
import {
  Box,
  FormControl,
  Typography
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);
dayjs.calendar("jalali");

export default function InventoryTransfer() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  return (
    <div style={{ direction: "rtl", padding: "30px" }}>
      <Typography variant="h5" gutterBottom>تحویل قطعه</Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <DatePicker
              label="از تاریخ"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              format="YYYY/MM/DD"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <DatePicker
              label="تا تاریخ"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              format="YYYY/MM/DD"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
            />
          </FormControl>
        </Box>
      </LocalizationProvider>
    </div>
  );
}
