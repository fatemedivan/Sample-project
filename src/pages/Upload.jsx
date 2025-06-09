import React, { useState } from "react";
import api from "../api/api";
import { Button, Snackbar, Alert } from "@mui/material";

export default function Upload() {
  const [uploadFileInfo, setUploadFileInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("OriginalFileName", "test.png");

    try {
      const response = await api.post("/File/generate-upload-url", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadFileInfo(response.data.value);
      setSnackbar({
        open: true,
        message: "لینک آپلود دریافت شد.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "دریافت لینک آپلود شکست خورد.",
        severity: "error",
      });
      console.error("Failed to get upload URL:", error);
    }
  };

  const handleUploadToMinio = async () => {
    if (!uploadFileInfo || !selectedFile) return;

    const formData = new FormData();
    Object.entries(uploadFileInfo.keyValues).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", selectedFile);

    try {
      const response = await fetch(uploadFileInfo.url, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "فایل با موفقیت آپلود شد.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "خطا در آپلود فایل.",
          severity: "error",
        });
        console.error("Upload error:", response.statusText);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "خطا در ارسال فایل.",
        severity: "error",
      });
      console.error("Upload failed:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>آپلود فایل به MinIO</h1>

      <Button variant="contained" onClick={uploadFile}>
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
        onClick={handleUploadToMinio}
      >
        ارسال فایل به MinIO
      </Button>

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
