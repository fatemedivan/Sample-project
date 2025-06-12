import api from "../../api/api";

export default async function getCarGroups(onError) {
  try {
    const res = await api("/CarGroup");
    return res?.data?.value || [];
  } catch (err) {
    console.error("getCarGroups error:", err);
    onError?.("خطا در دریافت نوع خودرو");
    return [];
  }
}
