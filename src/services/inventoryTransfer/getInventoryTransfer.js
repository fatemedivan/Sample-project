import api from "../../api/api";

export default async function getInventoryTransfer(params, onError, onSuccess) {
  try {
    const res = await api("/InventoryTransfer", { params });
    const msg = res?.data?.reasons?.[0] || "درخواست با موفقیت انجام شد";
    onSuccess?.(msg);
  } catch (err) {
    console.error("getInventoryTransfer error:", err);
    onError?.("خطا در دریافت اطلاعات");
  }
}
