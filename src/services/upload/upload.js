import api from "../../api/api";

export async function getUploadUrl() {
  try {
    const formData = new FormData();
    formData.append("OriginalFileName", "test.png");

    const response = await api.post("/File/generate-upload-url", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    return {
      success: true,
      data: response.data.value,
      message: "لینک آپلود دریافت شد.",
      severity: "success",
    };
  } catch (error) {
    console.error("Failed to get upload URL:", error);
    return {
      success: false,
      message: "دریافت لینک آپلود شکست خورد.",
      severity: "error",
    };
  }
}


export async function uploadFileToMinio(uploadFileInfo, selectedFile) {
  if (!uploadFileInfo || !selectedFile) {
    return {
      success: false,
      message: "فایل انتخاب نشده یا لینک آپلود موجود نیست.",
      severity: "error",
    };
  }

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
      return {
        success: true,
        message: "فایل با موفقیت آپلود شد.",
        severity: "success",
      };
    } else {
      console.error("Upload error:", response.statusText);
      return {
        success: false,
        message: `خطا در آپلود فایل: ${response.statusText}`,
        severity: "error",
      };
    }
  } catch (error) {
    console.error("Upload failed:", error);
    return {
      success: false,
      message: "خطا در ارسال فایل به سرور.",
      severity: "error",
    };
  }
}
