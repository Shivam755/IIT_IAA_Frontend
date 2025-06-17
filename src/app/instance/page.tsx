import React from "react";
import InstanceTable from "@/app/components/InstanceTable";
import CreateInstanceForm from "@/app/components/CreateInstanceForm";
import GetInstanceForm from "@/app/components/GetInstanceForm";

const InstancesPage = () => {
  return (
    <div className="max-w-5xl mx-auto mt-4 space-y-6">
      <CreateInstanceForm />
      <GetInstanceForm />
      <InstanceTable />
    </div>
  );
};

export default InstancesPage;
