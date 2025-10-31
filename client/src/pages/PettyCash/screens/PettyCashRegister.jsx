import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/BreadCrumb";
import CustomTable from "../../../components/CustomTable";

export default function PettyCashRegister() {
  const navigate = useNavigate();

  const items = [
    { label: "Petty Cash", href: "/petty-cash" },
    { label: "Petty Cash Register", href: "/petty-cash-register" },
  ];

  const handleBackRoute = () => {
    navigate(-1); 
  };

  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [register, setRegister] = useState([
    {
      Date: "29/10/2025",
      CostCode: "0001",
      CostCodeName: "Opening Balance",
      Description: "Long Description",
      PayeeOrPayer: "Amazon",
      GSTNo: "GSTINO2567628",
      BillNo: "4",
      GrossValue: "1,23,344",
      Amount: "1,23,345",
      SGST: "2345",
      CGST: "2346",
      IGST: "2345",
      Balance: "32,234,234",
      Remarks: "-",
    },
  ]);

  const columns = [
    { name: "Date",
     selector: (row) => row.Date,
     sortable: true, 
     width: "100px" },
    { name: "Cost Code", 
      selector: (row) => row.CostCode, 
      sortable: true },
    { name: "Cost Code Name", 
      selector: (row) => row.CostCodeName, 
      wrap: true },
    { name: "Description", 
      selector: (row) => row.Description, 
      wrap: true },
    { name: "Payee Or Payer", 
      selector: (row) => row.PayeeOrPayer, 
      wrap: true },
    { name: "GST No", 
      selector: (row) => row.GSTNo, 
      wrap: true },
    { name: "Bill No",
      selector: (row) => row.BillNo, 
      sortable: true },
    { name: "Gross Value", 
      selector: (row) => row.GrossValue, 
      sortable: true },
    { name: "Amount", 
      selector: (row) => row.Amount, 
      sortable: true },
    { name: "SGST", 
      selector: (row) => row.SGST, 
      sortable: true },
    { name: "CGST", 
      selector: (row) => row.CGST, 
      sortable: true },
    { name: "IGST", 
      selector: (row) => row.IGST, 
      sortable: true },
    { name: "Balance", 
      selector: (row) => row.Balance, 
      sortable: true },
    { name: "Remarks", 
      selector: (row) => row.Remarks, 
      wrap: true },
  ];

 
  const paginatedData = register.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <Breadcrumb items={items} onBackRoute={handleBackRoute} />

      <div className="overflow-x-auto">
        <div className="m-2 mt-5">
          <CustomTable
            data={paginatedData}
            columns={columns}
            paginationTotalRows={register.length}
            paginationPerPage={rowsPerPage}
            paginationDefaultPage={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}
