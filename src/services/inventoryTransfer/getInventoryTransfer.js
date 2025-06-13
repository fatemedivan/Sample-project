import api from "../../api/api";

export default async function getInventoryTransfer(params, onError, onSuccess, setPaginationInfo, paginationInfo) {
  try {
    const res = await api("/InventoryTransfer", { params });
    const msg = res?.data?.reasons?.[0] || "درخواست با موفقیت انجام شد";
    onSuccess?.(msg);
    console.log(res);
    if (res.data) {
      setPaginationInfo(res.data.value)
      
    }
    
  } catch (err) {
    console.error("getInventoryTransfer error:", err);
    onError?.("خطا در دریافت اطلاعات");
  }
}
