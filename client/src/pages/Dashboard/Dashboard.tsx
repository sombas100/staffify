import React from "react";
import { CustomSidebar } from "../../components/CustomSidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <CustomSidebar />
      <div className="p-10 flex-1 bg-white">
        <h1>Dashboard Content</h1>
      </div>
    </div>
  );
};

export default Dashboard;
