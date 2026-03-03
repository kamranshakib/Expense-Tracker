export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GIT_USER_INFO: "/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/income/add",
    GET_ALL_INCOME: "/income/get",
    DELETE_INCOME: (incomeid) => `/income/${incomeid}`,
    DOWNLOAD_INCOME: "/income/downloadexcel",
  },
  EXPENSE: {
    ADD_EXPENSE: "/expense/add",
    GET_ALL_EXPENSE: "/expense/get",
    DELETE_EXPENSE: (expenseid) => `/expense/${expenseid}`,
    DOWNLOAD_EXPENSE: "/expense/downloadexcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },
};
