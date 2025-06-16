import React from 'react'
import InstanceTable from '@/app/components/InstanceTable';
import CreateInstanceForm from '@/app/components/CreateInstanceForm';
import GetInstanceForm from '@/app/components/GetInstanceForm';

const InstancesPage = () => {
  return (
    <div>
        <CreateInstanceForm />
        <GetInstanceForm />
        <InstanceTable />
    </div>
  )
}

export default InstancesPage;