import axios from "axios";
import type { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { setToken } from "../slice/userSlice";
import {
  deleteExpense,
  deleteIncome,
  setExpense,
  setIncome,
} from "../slice/assetSlice";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

interface LoginData {
  email: string;
  password: string;
}

export function Login(
  navigate: NavigateFunction,
  data: LoginData,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  return async (dispatch: any) => {
    const id = toast.loading("...Loading");
    try {
      const loginUser = await axios.post(`${BASE_URL}/user/login`, data);
      if (loginUser.data.success) {
        toast.success("...Success", {
          id: id,
        });
      }
      dispatch(setToken(`Bearer ${loginUser.data.token}`));
      localStorage.setItem("token", `Bearer ${loginUser.data.token}`);
      setIsLoading(false);
    } catch (error) {
      const err = (error as Error).message;
      toast.error(`${err} || Something went wrong`, {
        id: id,
      });
      setIsLoading(false);
    }
  };
}

export function getAllExpense(navigate: NavigateFunction, token: string) {
  return async (dispatch: any) => {
    const id = toast.loading("Fetching Expense data");
    try {
      const getAllUserExpense = await axios.get(
        `${BASE_URL}/expense/getAllExpense`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getAllUserExpense.data.expenses.map((data: any) => {
        dispatch(setExpense(data));
      });
      toast.success("Expense fetched Successfully", {
        id: id,
      });
    } catch (error) {
      const err = (error as Error).message;
      console.log(err, error);
      toast.error("Failed to get income data", {
        id: id,
      });
    }
  };
}

export function getAllIncome(navigate: NavigateFunction, token: string) {
  return async (dispatch: any) => {
    const id = toast.loading("Fetching Income data");
    try {
      const getAllUserIncome = await axios.get(
        `${BASE_URL}/expense/getAllIncome`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getAllUserIncome.data.income.map((data: any) => {
        dispatch(setIncome(data));
      });

      toast.success("Income fetched Successfully", {
        id: id,
      });
    } catch (error) {
      toast.error("Failed to get income data", {
        id: id,
      });

      const err = (error as Error).message;
      console.log(err, error);
    }
  };
}

export function addExpense(token: string, data: any) {
  return async (dispatch: any) => {
    const id = toast.loading("...loading");
    try {
      const addExpense = await axios.post(
        `${BASE_URL}/expense/addExpense`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (addExpense.data.success) {
        toast.success("Expense Added Successfully", {
          id: id,
        });
      }
      dispatch(setExpense(addExpense.data.expense));
    } catch (error) {
      const err = error as Error;
      console.log(err);
      toast.error("Failed to add expense", {
        id: id,
      });
    }
  };
}

export function addIncome(token: string, data: any) {
  return async (dispatch: any) => {
    const id = toast.loading("...loading");
    try {
      const addIncome = await axios.post(
        `${BASE_URL}/expense/addIncome`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (addIncome.data.success) {
        toast.success("Expense Added Successfully", {
          id: id,
        });
      }
      dispatch(setIncome(addIncome.data.income));
    } catch (error) {
      const err = error as Error;
      console.log(err);
      toast.error("Failed to add Income", {
        id: id,
      });
    }
  };
}

export function deleteAsset(
  token: string,
  id: string,
  category: string
) {
  return async (dispatch: any) => {
    const toastId = toast.loading("...loading");
    try {
      const val = await axios.delete(
        `${BASE_URL}/expense/${category.toLowerCase()}/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(val,"*******")

      if (category === "income") {
        dispatch(deleteIncome(id));
      } else {
        dispatch(deleteExpense(id));
      }

      toast.success("Asset Deleted Successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.success("Asset Deleted Successfully", {
        id: toastId,
      });

      console.log(error);
    }
  };
}
