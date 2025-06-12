import React, { useEffect, useState } from "react";
import { Box, Typography, Button, FormControl, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

import {
  transferTypes,
  transferStatuses,
} from "../constantes/inventoryTransfer";
import getCarGroups from "../services/inventoryTransfer/getCarGroups";
import getInventoryTransfer from "../services/inventoryTransfer/getInventoryTransfer";
import downloadExcel from "../services/inventoryTransfer/downloadExcel";
import Dropdown from "../components/inventoryTransfer/DropDown";

dayjs.extend(jalaliday);
dayjs.calendar("jalali");

export default function InventoryTransfer() {
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    transferType: "",
    transferStatus: "",
    carGroupId: "",
  });

  const [carGroups, setCarGroups] = useState([]);
  const [alert, setAlert] = useState({ message: "", severity: "success" });

  const showAlert = (message, severity = "success") => {
    setAlert({ message, severity });
    setTimeout(() => setAlert({ message: "" }), 3000);
  };

  const params = {
    PageNumber: 1,
    PageSize: 60,
    // TransferType: filters.transferType,
    // Status: filters.transferStatus,
    // CarGroupId: filters.carGroupId,
    // FromDate: filters.fromDate,
    // ToDate: filters.toDate,
  };

  useEffect(() => {
    getCarGroups((msg) => showAlert(msg, "error")).then(setCarGroups);
  }, []);

  return (
    <div style={{ direction: "rtl", padding: "30px" }}>
      <Typography variant="h5" gutterBottom>
        تحویل قطعه
      </Typography>

      {alert.message && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          <FormControl sx={{ flex: 1, minWidth: 150 }}>
            <DatePicker
              label="از تاریخ"
              value={filters.fromDate}
              onChange={(value) => setFilters({ ...filters, fromDate: value })}
              format="YYYY/MM/DD"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  InputLabelProps: { shrink: true }
                },
              }}
            />
          </FormControl>

          <FormControl sx={{ flex: 1, minWidth: 150 }}>
            <DatePicker
              label="تا تاریخ"
              value={filters.toDate}
              onChange={(value) => setFilters({ ...filters, toDate: value })}
              format="YYYY/MM/DD"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  InputLabelProps: { shrink: true },
                },
              }}
            />
          </FormControl>

          <Dropdown
            label="نوع درخواست"
            value={filters.transferType}
            onChange={(e) =>
              setFilters({ ...filters, transferType: e.target.value })
            }
            labelId="transfer-type"
            options={Object.entries(transferTypes).map(([k, v]) => ({
              value: k,
              label: v,
            }))}
          />

          <Dropdown
            label="وضعیت"
            value={filters.transferStatus}
            onChange={(e) =>
              setFilters({ ...filters, transferStatus: e.target.value })
            }
            labelId="transfer-status"
            options={Object.entries(transferStatuses).map(([k, v]) => ({
              value: k,
              label: v,
            }))}
          />

          <Dropdown
            label="نوع خودرو"
            value={filters.carGroupId}
            onChange={(e) =>
              setFilters({ ...filters, carGroupId: e.target.value })
            }
            labelId="car-group"
            options={carGroups.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() =>
              getInventoryTransfer(
                params,
                (msg) => showAlert(msg, "error"),
                (msg) => showAlert(msg, "success")
              )
            }
          >
            ثبت درخواست
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              downloadExcel(
                params,
                (msg) => showAlert(msg, "error"),
                (msg) => showAlert(msg, "success")
              )
            }
          >
            دریافت فایل اکسل
          </Button>
        </Box>
      </LocalizationProvider>
    </div>
  );
}
