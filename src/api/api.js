import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
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

//   useEffect(() => {
//     if (!token) return;
//     const uploadFile = async () => {
//       const formData = new FormData();
//       formData.append("OriginalFileName", "test.png");

//       try {
//         const response = await api.post("/File/generate-upload-url", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("Response:", response);
//       } catch (error) {
//         console.error("Upload failed:", error);
//       }
//     };
//     uploadFile();
//   }, [token]);
