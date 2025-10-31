import { useState } from "react";
import DynamicEditableTable from "../../components/DynamicEditableTable";
import ForceReset from "../login/ForceReset";

function Dashboard() {
  const [vendorData, setVendorData] = useState([
    {
      name: "Vendor 1",
      site: "Site 1",
      ccc: "CCC 1",
      description: "Description 1",
      remarks: "00",
    }
  ]);

  const columns = [
    {
      key: "name",
      label: "Name of Contractor",
      editable: true,
      type: "select",
      options: [
        { value: "vendor1", label: "Select Vendor 1" },
        { value: "vendor2", label: "Select Vendor 2" },
        { value: "vendor3", label: "Select Vendor 3" },
      ],
      placeholder: "Select Vendor",
    },
    {
      key: "site",
      label: "Site",
      editable: true,
      type: "select",
      options: [
        { value: "site1", label: "Site 1" },
        { value: "site2", label: "Site 2" },
      ],
    },
    { key: "ccc", label: "CCC", editable: true, placeholder: "Enter CCC" },
    {
      key: "description",
      label: "Respective Description",
      editable: true,
      placeholder: "Enter Description",
    },
    { key: "remarks", label: "Remarks", editable: true, placeholder: "00" },
  ];

  return (
    <>
      <div className="flex items-center justify-center">
        <p className="text-6xl font-bold text-gray-600">Dashboard</p>
      </div>

      <div className="p-4">
        <h6 className="font-semibold mb-2">Vendor Table</h6>
        <DynamicEditableTable
          columns={columns}
          initialRows={vendorData}
          onChange={(data) => setVendorData(data)}
        />
      </div>
      
      <pre className="bg-gray-100 mt-4 p-2 text-xs rounded">
        {JSON.stringify(vendorData, null, 2)}
      </pre>

      <ForceReset />
    </>
  );
}

export default Dashboard;
