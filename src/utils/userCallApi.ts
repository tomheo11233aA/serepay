import AxiosInstance from "../helper/AxiosInstance";
import { ITurnOn2FA } from "@models/USER/turnOn2FA";
import { IHistorySwap } from "@models/SWAP/historySwap";
import { ISwap } from "@models/SWAP/swap";
import { ITransferToAddress } from "@models/SWAP/transferToAddress";
import { IHistoryRecharge } from "@models/WALLET/historyRecharge";
import { IHistoryWidthdraw } from "@models/WALLET/gethHstoryWidthDraw";
import { ITransferToUserName } from "@models/TRANSFER/transferToUsername";
import { IHistoryTransfer } from "@models/TRANSFER/historyTransfer";
import { IUploadKYC } from "@models/USER/uploadKYC";
import { ITurnOff2FA } from "@models/USER/turnOff2FA";
import { IExchangeRateDisparity } from "@models/P2P/ADMIN/CONFIG/exchangeRateDisparity";
import { IUpdateExchangeRateDisparity } from "@models/P2P/ADMIN/CONFIG/updateExchangeRateDisparity";
import { IGetListAdsBuy } from "@models/P2P/USER/getListAdsBuy";
import { IGetListAdsSell } from "@models/P2P/USER/getListAdsSell";
import { ICompanyAddAds } from "@models/P2P/COMPANY/companyAddAds";
import { IGetListAdsSellToUser } from "@models/P2P/COMPANY/getListAdsSellToUser";
import { IGetListAdsBuyToUser } from "@models/P2P/COMPANY/getListAdsBuyToUser";
import { ISearchBuyQuick } from "@models/P2P/USER/searchBuyQuick";
import { ISearchSellQuick } from "@models/P2P/USER/searchSellQuick";
import { IAddListBanking } from "@models/BANKING/addListBanking";
import { IGetListBankingUser } from "@models/BANKING/getListBankingUser";
import { ICreateP2p } from "@models/P2P/USER/Operation/createP2p";
import { IGetInfoP2p } from "@models/P2P/USER/Operation/getInfoP2p";
import { IUserCancelP2pCommand } from "@models/P2P/USER/Operation/userCancelP2pCommand";
import { IUserConfirmP2pCommand } from "@models/P2P/USER/Operation/userConfirmP2pCommand";
import { ICompanyConfirmP2pCommand } from "@models/P2P/COMPANY/companyConfirmF2pCommand";
import { ICompanyCancelF2pCommand } from "@models/P2P/COMPANY/companyCancelF2pCommand";

const axiosService = AxiosInstance();
export const createWalletApi = function (coinName: string) {
  try {
    return axiosService.post("/api/user/createWallet", {
      symbol: coinName,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getWalletApi = function () {
  try {
    return axiosService.post("/api/user/getWallet");
  } catch (error) {
    console.log(error);
  }
};
export const getHistorySwapApi = function (data: IHistorySwap) {
  try {
    return axiosService.post("/api/swap/historyswap", data);
  } catch (error) {
    console.log(error);
  }
};
export const getDepositHistory = function (data : IHistoryRecharge) {
  try {
    return axiosService.post("/api/blockico/getblocks", data);
  } catch (error) {
    console.log(error);
  }
};
export const swapCoinApi = function (data: ISwap) {
  try {
    return axiosService.post("/api/swap/swap", data);
  } catch (error) {
    console.log(error);
  }
};
export const transferToAddress = function (data : ITransferToAddress) {
  try {
    return axiosService.post("/api/user/transferToAddress", data);
  } catch (error) {
    console.log(error);
  }
};
export const getHistoryWidthdraw = function (data: IHistoryWidthdraw) {
  try {
    return axiosService.post("/api/user/gethistorywidthdraw", data);
  } catch (error) {
    console.log(error);
  }
};
export const transferToUsername = function (data: ITransferToUserName) {
  try {
    return axiosService.post("/api/user/transferToUsername", data);
  } catch (error) {
    console.log(error);
  }
};
export const historytransfer = function (data : IHistoryTransfer) {
  try {
    return axiosService.post("/api/user/historytransfer", data);
  } catch (error) {
    console.log(error);
  }
};
export const getExchange = function () {
  try {
    return axiosService.post("/api/exchange/getExchange");
  } catch (error) {
    console.log(error);
  }
};
export const uploadKyc = function (data: IUploadKYC | any) {
  try {
    return axiosService.post("/api/uploadKyc", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = function () {
  try {
    return axiosService.post("/api/user/getProfile");
  } catch (error) {
    console.log(error);
  }
};
export const generateOTPToken = function () {
  try {
    return axiosService.post("/api/user/generateOTPToken");
  } catch (error) {
    console.log(error);
  }
};
export const turnOn2FA = function (data: ITurnOn2FA) {
  try {
    return axiosService.post("/api/user/turnOn2FA", data);
  } catch (error) {
    console.log(error);
  }
};
export const turnOff2FA = function (data : ITurnOff2FA) {
  try {
    return axiosService.post("/api/user/turnOff2FA", data);
  } catch (error) {
    console.log(error);
  }
};
export const exchangeRateDisparity = function (data : IExchangeRateDisparity) {
  try {
    return axiosService.post("/api/p2pBank/getConfig", data);
  } catch (error) {
    console.log(error);
  }
};
export const updateExchangeRateDisparity = function (data : IUpdateExchangeRateDisparity) {
  try {
    return axiosService.post("/api/p2pBank/updateConfig", data);
  } catch (error) {
    console.log(error);
  }
};
export const getListAdsBuy = function (data : IGetListAdsBuy) {
  try {
    return axiosService.post("/api/p2pBank/getListAdsBuy", data);
  } catch (error) {
    console.log(error);
  }
};
export const getListAdsSell = function (data : IGetListAdsSell) {
  try {
    return axiosService.post("/api/p2pBank/getListAdsSell", data);
  } catch (error) {
    console.log(error);
  }
};
export const companyAddAds = function (data : ICompanyAddAds) {
  try {
    return axiosService.post("/api/p2pBank/companyAddAds", data);
  } catch (error) {
    console.log(error);
  }
};
export const getListAdsSellToUser = function (data : IGetListAdsSellToUser) {
  try {
    return axiosService.post("/api/p2pBank/getListAdsSellToUser", data);
  } catch (error) {
    console.log(error);
  }
};
export const getListAdsBuyToUser = function (data : IGetListAdsBuyToUser) {
  try {
    return axiosService.post("/api/p2pBank/getListAdsBuyToUser", data);
  } catch (error) {
    console.log(error);
  }
};
export const getListAdsBuyPenddingToUser = function (data : IGetListAdsBuyToUser) {
  try {
    return axiosService.post("/api/p2pBank/getListAdsBuyPenddingToUser", data);
  } catch (error) {
    console.log(error);
  }
};
export const getListAdsSellPenddingToUser = function (data : IGetListAdsSellToUser) {
  try {
    return axiosService.post("/api/p2pBank/getListAdsSellPenddingToUser", data);
  } catch (error) {
    console.log(error);
  }
};
export const searchBuyQuick = function (data : ISearchBuyQuick) {
  try {
    return axiosService.post("/api/p2pBank/sreachBuyQuick", data);
  } catch (error) {
    console.log(error);
  }
};
export const searchSellQuick = function (data : ISearchSellQuick) {
  try {
    return axiosService.post("/api/p2pBank/sreachSellQuick", data);
  } catch (error) {
    console.log(error);
  }
};
export const addListBanking = function (data : IAddListBanking) {
  try {
    return axiosService.post("/api/user/addListBanking", data);
  } catch (error) {
    console.log(error);
  }
};
export const getListBanking = function (data : IGetListBankingUser) {
  try {
    return axiosService.post("/api/user/getListBankingUser", data);
  } catch (error) {
    console.log(error);
  }
};
export const createP2p = function (data : ICreateP2p) {
  try {
    return axiosService.post("/api/p2pBank/createP2p", data);
  } catch (error) {
    console.log(error);
  }
};
export const getInfoP2p = function (data : IGetInfoP2p) {
  try {
    return axiosService.post("/api/p2pBank/getInfoP2p", data);
  } catch (error) {
    console.log(error);
  }
};
export const userCancelP2pCommand = function (data : IUserCancelP2pCommand) {
  try {
    return axiosService.post("/api/p2pBank/userCancelP2pCommand", data);
  } catch (error) {
    console.log(error);
  }
};
export const userConfirmP2pCommand = function (data : IUserConfirmP2pCommand) {
  try {
    return axiosService.post("/api/p2pBank/userConfirmP2pCommand", data);
  } catch (error) {
    console.log(error);
  }
};
export const companyConfirmP2pCommand = function (data : ICompanyConfirmP2pCommand) {
  try {
    console.log(data);
    return axiosService.post("/api/p2pBank/CompanyConfirmP2pCommand", data);
  } catch (error) {
    console.log(error);
  }
};

export const companyCancelP2pCommand = function (data : ICompanyCancelF2pCommand) {
  try {
    return axiosService.post("/api/p2pBank/CompanyCancelP2pCommand", data);
  } catch (error) {
    console.log(error);
  }
};
