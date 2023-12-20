import { IGetKYCUserPendding } from "@models/USER/ADMIN/getKycUserPendding";
import AxiosInstance from "../helper/AxiosInstance";
import { IActiveUserKyc } from "@models/USER/ADMIN/activeUserKyc";
import { ICancelUserKyc } from "@models/USER/ADMIN/cancelUserKyc";
import { IGetAllAds } from "@models/P2P/ADMIN/getAllAds";
import { IGetAllAdsPeding } from "@models/P2P/ADMIN/getAllAdsPeding";
import { IGetAdsToWhere } from "@models/P2P/ADMIN/getAdsToWhere";
import { IConfirmAds } from "@models/P2P/ADMIN/confirmAds";
import { IAddExChange } from "@models/EXCHANGE/ADMIN/addExChange";
import { IEditExchange } from "@models/EXCHANGE/ADMIN/editExchange";
const axiosService = AxiosInstance();

export const getKycUserPendding = function (data : IGetKYCUserPendding) {
  try {
    return axiosService.post("/api/admin/getKycUserPendding", data);
  } catch (error) {
    console.log(error);
  }
};
export const activeUserKyc = function (data : IActiveUserKyc) {
  try {
    return axiosService.post("/api/admin/activeUserKyc", data);
  } catch (error) {
    console.log(error);
  }
};
export const cancelUserKyc = function (data : ICancelUserKyc) {
  try {
    return axiosService.post("/api/admin/cancelUserKyc", data);
  } catch (error) {
    console.log(error);
  }
};
export const getAllAds = function (data : IGetAllAds) {
  try {
    return axiosService.post("/api/p2pBank/getAllAds", data);
  } catch (error) {
    console.log(error);
  }
};
export const getAllAdsPending = function (data : IGetAllAdsPeding) {
  try {
    return axiosService.post("/api/p2pBank/getAllAdsPendding", data);
  } catch (error) {
    console.log(error);
  }
};
export const getAdsToWhere = function (data : IGetAdsToWhere) {
  try {
    return axiosService.post("/api/p2pBank/getAdsToWhere", data);
  } catch (error) {
    console.log(error);
  }
};
export const confirmAds = function (data : IConfirmAds) {
  try {
    return axiosService.post("/api/p2pBank/confirmAds", data);
  } catch (error) {
    console.log(error);
  }
};
export const refuseAds = function (data : IConfirmAds) {
  try {
    return axiosService.post("/api/p2pBank/refuseAds", data);
  } catch (error) {
    console.log(error);
  }
};
export const addExchange = function (data : IAddExChange) {
  try {
    return axiosService.post("/api/exchange/addExchange", data);
  } catch (error) {
    console.log(error);
  }
};
export const editExchange = function (data : IEditExchange) {
  try {
    return axiosService.post("/api/exchange/editExchange", data);
  } catch (error) {
    console.log(error);
  }
};
