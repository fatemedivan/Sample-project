import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  Alert,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
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
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "success" });

  const showAlert = (message, severity = "success") => {
    setAlert({ message, severity });
    setTimeout(() => setAlert({ message: "" }), 3000);
  };

  const params = {
    PageNumber: currentPage,
    PageSize: 2,
    TransferType: filters.transferType,
    Status: filters.transferStatus,
    CarGroupId: filters.carGroupId,
    FromDate: filters.fromDate,
    ToDate: filters.toDate,
  };

  useEffect(() => {
    getCarGroups((msg) => showAlert(msg, "error")).then(setCarGroups);
  }, []);

  useEffect(() => {
    setLoading(true);
    setPaginationInfo(null); 

    getInventoryTransfer(
      params,
      (msg) => {
        showAlert(msg, "error");
        setLoading(false);
      },
      (msg) => {
        showAlert(msg, "success");
        setLoading(false);
      },
      setPaginationInfo,
      paginationInfo
    );
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [filters]);

  return (
    <Box sx={{ direction: "rtl", p: 4 }}>
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
                  InputLabelProps: { shrink: true },
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

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentPage(1);
              setLoading(true);
              setPaginationInfo(null);
              getInventoryTransfer(
                { ...params, PageNumber: 1 },
                (msg) => {
                  showAlert(msg, "error");
                  setLoading(false);
                },
                (msg) => {
                  showAlert(msg, "success");
                  setLoading(false);
                },
                setPaginationInfo,
                paginationInfo
              );
            }}
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

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && paginationInfo && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell>شماره پذیرش</TableCell>
                  <TableCell>نام انباردار</TableCell>
                  <TableCell>نوع خودرو</TableCell>
                  <TableCell>تاریخ ایجاد</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginationInfo.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {paginationInfo.rowIndexStart + index}
                    </TableCell>
                    <TableCell>{item.acceptanceNumber}</TableCell>
                    <TableCell>{item.warehouseKeeperName}</TableCell>
                    <TableCell>{item.carName || "-"}</TableCell>
                    <TableCell>
                      {dayjs(item.creationDate)
                        .calendar("jalali")
                        .format("YYYY/MM/DD HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={paginationInfo.totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Box>
  );
}
