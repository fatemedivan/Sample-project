import React, { useState, useEffect } from "react";
import { Button, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getUploadUrl, uploadFileToMinio } from "../services/upload/upload";

export default function Upload() {
  const [uploadFileInfo, setUploadFileInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showAlert = (message, severity = "success") => {
    setAlertInfo({ open: true, message, severity });
  };

  const handleGetUploadUrl = async () => {
    const result = await getUploadUrl();
    if (result.success) {
      setUploadFileInfo(result.data);
    }
    showAlert(result.message, result.severity);
  };

  const handleUploadFile = async () => {
    const result = await uploadFileToMinio(uploadFileInfo, selectedFile);
    showAlert(result.message, result.severity);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>آپلود فایل به MinIO</h1>

      <Button variant="contained" onClick={handleGetUploadUrl}>
        دریافت لینک آپلود
      </Button>

      <br />
      <br />

      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />

      <br />
      <br />

      <Button
        variant="contained"
        color="success"
        disabled={!uploadFileInfo || !selectedFile}
        onClick={handleUploadFile}
      >
        ارسال فایل به MinIO
      </Button>

      <Collapse in={alertInfo.open} sx={{ mt: 2 }}>
        <Alert
          severity={alertInfo.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setAlertInfo((prev) => ({ ...prev, open: false }))}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertInfo.message}
        </Alert>
      </Collapse>
    </div>
  );
}
