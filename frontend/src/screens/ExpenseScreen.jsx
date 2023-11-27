import React, { useEffect } from "react";
import AddExpense from "../components/AddExpense";
import SidebarWithHeader from "../components/Sidebar";
import Analysis from "../components/Analysis";
import Expense from "../components/Expense";
import { useGetDataQuery } from "../slices/userAdminApiSlice";
const ExpenseScreen = () => {
  const { data, isLoading } = useGetDataQuery();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await useGetDataQuery();
        console.log(response);
      };
      fetchData()
    } catch (err) {
      console.log(err);
    }
  },[useGetDataQuery]);

  return (
    <div style={{ display: "flex" }}>
      <Expense data={data} />
      <Analysis />
    </div>
  );
};

export default ExpenseScreen;
