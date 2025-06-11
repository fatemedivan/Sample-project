import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

import api from "../api/api";
import Dropdown from "../components/inventoryTransfer/DropDown";

dayjs.extend(jalaliday);
dayjs.calendar("jalali");

export default function InventoryTransfer() {
  const user = JSON.parse(localStorage.getItem("user") || {});

  const [uuid, setUuid] = useState(user?.id || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedTransferType, setSelectedTransferType] = useState("");
  const [selectedTransferStatus, setSelectedTransferStatus] = useState("");
  const [selectedCarGroup, setSelectedCarGroup] = useState("");
  const [carGroup, setCarGroup] = useState([]);

  const inventoryTransferType = {
    0: "Service",
    1: "FreeSale",
    2: "TransferBetweenWarehouses",
    3: "Other",
  };

  const inventoryTransferStatus = {
    0: "Draft",
    1: "Finalized",
    2: "Canceled",
    3: "Deleted",
  };

  const params = {
    AcceptanceNumber: "12345",
    TransferType: selectedTransferType,
    Status: selectedTransferStatus,
    CustomerName: `${firstName} ${lastName}`,
    NationalCode: "0012345678",
    WarehouseKeeperUserId: uuid,
    CarGroupId: selectedCarGroup,
    DestinationDealershipCode: "D123",
    DestinationDealershipName: "نمایندگی غرب",
    LicensePlateNumber: "12الف345",
    FromDate: fromDate,
    ToDate: toDate,
    PageNumber: 1,
    PageSize: 60,
  };

  useEffect(() => {
    const getCarGroup = async () => {
      try {
        const response = await api.get("/CarGroup");
        if (response && response.data) {
          setCarGroup(response.data.value);
        }
      } catch (error) {
        console.error("خطا در دریافت CarGroup:", error);
      }
    };
    getCarGroup();
  }, []);

  const getInventoryTransfer = async () => {
    try {
      const response = await api.get("/InventoryTransfer", { params });
      if (response && response.data) {
        setSnackbar({
          open: true,
          message: response.data.reasons[0],
          severity: "success",
        });
      }
    } catch (error) {
      console.error("خطا در دریافت اطلاعات InventoryTransfer:", error);
      setSnackbar({
        open: true,
        message: "خطا در دریافت اطلاعات",
        severity: "error",
      });
    }
  };

  const getExcel = async () => {
    try {
      const response = await api.get(
        "/InventoryTransfer/full-details-report-excel",
        {
          params,
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory-transfer.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("خطا در دریافت فایل اکسل:", error);
      setSnackbar({
        open: true,
        message: "خطا در دریافت فایل اکسل",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div style={{ direction: "rtl", padding: "30px" }}>
      <Typography variant="h5" gutterBottom>
        تحویل قطعه
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <FormControl sx={{ flex: 1, minWidth: 150 }}>
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

          <FormControl sx={{ flex: 1, minWidth: 150 }}>
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

          <Dropdown
            label="نوع درخواست"
            value={selectedTransferType}
            onChange={(e) => setSelectedTransferType(e.target.value)}
            labelId="transfer-type"
            options={Object.entries(inventoryTransferType).map(([k, v]) => ({
              value: v,
              label: v,
            }))}
          />

          <Dropdown
            label="وضعیت"
            value={selectedTransferStatus}
            onChange={(e) => setSelectedTransferStatus(e.target.value)}
            labelId="transfer-status"
            options={Object.entries(inventoryTransferStatus).map(([k, v]) => ({
              value: v,
              label: v,
            }))}
          />

          <Dropdown
            label="نوع خودرو"
            value={selectedCarGroup}
            onChange={(e) => setSelectedCarGroup(e.target.value)}
            labelId="car-group"
            options={carGroup.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={getInventoryTransfer} variant="contained">
            ثبت درخواست
          </Button>
          <Button onClick={getExcel} variant="outlined">
            دریافت فایل اکسل
          </Button>
        </Box>
      </LocalizationProvider>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
