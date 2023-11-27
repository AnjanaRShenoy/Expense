import React from "react";
import AddExpense from "../components/AddExpense";
import SidebarWithHeader from "../components/Sidebar";
import Analysis from "../components/Analysis";
import { useGetDataQuery } from "../slices/userAdminApiSlice";

const AddExpenseScreen = () => {
  const { data, isLoading } = useGetDataQuery({ user: 111 });
  return (
    <div style={{ display: "flex" }}>
      <AddExpense data={data} />
      <Analysis data={data} />
    </div>
  );
};

export default AddExpenseScreen;
