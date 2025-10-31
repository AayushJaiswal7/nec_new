import React, { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import CustomTable from "../../../../components/CustomTable";

const CustomerMasterTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [customers, setCustomers] = useState([
    {
      customerId: 1,
      customerCode: "PTC0939",
      customerName: "Multi Level",
      description: "Customer Description",
      createdBy: "User002, 12.12.2024 10:00PM",
      updatedBy: "User002, 12.12.2024 10:00PM",
    },
  ]);

  const handleDelete = (id) => {
    setCustomers(customers.filter((r) => r.customerId !== id));
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.customerId,
      sortable: true,
      width: "100px",
      wrap: true,
    },
    {
      name: "Customer Code",
      selector: (row) => row.customerCode,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "created By",
      selector: (row) => row.createdBy,
      sortable: true,
    },
    {
      name: "Updated By",
      selector: (row) => row.updatedBy,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-3">
          <button className="text-gray-600 hover:text-gary-800">
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.customerId)}
            className="text-red-700 hover:text-red-900"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const paginatedData = customers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div className="m-2 mt-5">
          <CustomTable
            data={paginatedData}
            columns={columns}
            paginationTotalRows={customers.length}
            paginationPerPage={rowsPerPage}
            paginationDefaultPage={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerMasterTable;
