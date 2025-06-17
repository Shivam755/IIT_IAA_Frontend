"use client";
import React from "react";
import { useInstances } from "@/app/context/InstanceContext";
import { InstanceColumns } from "@/app/instance/columns";
import DataTable from "@/app/instance/data-table";

const InstanceTable = () => {
  let { Instances } = useInstances();
  return (
    <div className="container py-10">
      <DataTable columns={InstanceColumns} data={Instances} />
    </div>
  );
};

export default InstanceTable;
