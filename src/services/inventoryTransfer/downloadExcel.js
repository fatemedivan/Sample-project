import api from "../../api/api";

export default async function downloadExcel(params, onError, onSuccess) {
  try {
    const res = await api("/InventoryTransfer/full-details-report-excel", {
      params,
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inventory-transfer.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();

    onSuccess?.("فایل اکسل با موفقیت دریافت شد");
  } catch (err) {
    console.error("downloadExcel error:", err);
    onError?.("خطا در دریافت فایل اکسل");
  }
}
