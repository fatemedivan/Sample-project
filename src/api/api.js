import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

//   useEffect(() => {
//     const getInventoryTransfer = async () => {
//       try {
//         const params = {
//           AcceptanceNumber: "12345",
//           TransferType: 1,
//           Status: 2,
//           CustomerName: "ali zamani",
//           NationalCode: "0012345678",
//           WarehouseKeeperUserId: id,
//           CarGroupId: 10,
//           DestinationDealershipCode: "D123",
//           DestinationDealershipName: "نمایندگی غرب",
//           LicensePlateNumber: "12الف345",
//           FromDate: "2025-06-09 00:00:00",
//           ToDate: "2025-06-09 23:59:59",
//           PageNumber: 1,
//           PageSize: 60,
//         };

//         const response = await api.get("/InventoryTransfer", { params });
//         console.log(response.data);
//       } catch (error) {
//         console.error("خطا در دریافت اطلاعات:", error);
//       }
//     };

//     // getInventoryTransfer();
//   }, []);
