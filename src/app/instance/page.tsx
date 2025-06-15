import React from 'react'
import InstanceTable from '@/app/components/InstanceTable';
import CreateInstanceForm from '@/app/components/CreateInstanceForm';

const InstancesPage = () => {
  return (
    <div>
        <CreateInstanceForm />
        <InstanceTable />
    </div>
  )
}

export default InstancesPage;