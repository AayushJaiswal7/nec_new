import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import Breadcrumb from "../../components/BreadCrumb";
import DropDown from "../../components/Dropdown";
import TextareaField from "../../components/TextareaField";
import ButtonComponent from "../../components/ButtonComponent";
import InputField from "../../components/InputField"; // For editable cells
import CustomCheckbox from "../../components/CustomCheckBox"; // For row selection


export default function StockTake() {
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState("");
  const [notes, setNotes] = useState("");

  // State for the custom table rows
  const [rows, setRows] = useState([
    {
      id: 1, // Unique ID for key
      itemCode: "1.12.12",
      itemDescription: "Steel",
      uom: "Units",
      previouslyAvailable: "260",
      currentlyAvailable: "",
    },
    {
      id: 2,
      itemCode: "1.12.10",
      itemDescription: "Cement",
      uom: "Kg",
      previouslyAvailable: "260",
      currentlyAvailable: "",
    },
  ]);
  
  // State to track selected row IDs for deletion
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // --- Breadcrumb ---
  const breadcrumbItems = [
    { label: "Inventory Management", href: "/inventory" },
    { label: "Stock Take", href: "/inventory/stock-take" },
  ];
  const handleBackRoute = () => {
    navigate("/inventory");
  };

  // --- Dropdown Options ---
  const warehouseOptions = [
    { label: "Warehouse 1", value: "wh1" },
    { label: "Warehouse 2", value: "wh2" },
    { label: "Warehouse 3", value: "wh3" },
  ];

  // --- Custom Table Logic ---

  /**
   * Handles changes in the editable input fields of the table.
   */
  const handleRowChange = (index, field, value) => {
    // Create a new array
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        // Create a new object for the changed row
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  /**
   * Adds a new, empty row to the table.
   */
  const handleAddRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([
      ...rows,
      {
        id: newId,
        itemCode: "",
        itemDescription: "",
        uom: "",
        previouslyAvailable: "",
        currentlyAvailable: "",
      },
    ]);
  };


  const handleSelectRow = (rowId) => {
    setSelectedRowIds((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRowIds.length === rows.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(rows.map((row) => row.id)); // Store IDs
    }
  };


  const handleDeleteRows = () => {
    // This filter logic now works because selectedRowIds contains IDs
    setRows(rows.filter((row) => !selectedRowIds.includes(row.id)));
    setSelectedRowIds([]); // Clear selection
  };
  
  // --- Form Submission ---

  
  const handleAddStock = () => {
    // Logic to save the stock take data
    console.log("Saving Stock Take:", {
      warehouse: warehouse,
      items: rows,
      notes: notes,
    });
    
    toast.success("Stock take saved successfully!");
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />

      <div className="p-4">
        {/* Warehouse Dropdown */}
        <div className="mb-4">
          <DropDown
            label="Warehouses"
            placeholder="Select Warehouse"
            options={warehouseOptions}
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            width="w-full sm:w-60"
          />
        </div>

        {/* --- Custom Editable Table  --- */}
       <div className="overflow-x-auto w-full md:w-[70%] lg:w-[70%] ">
<div className="max-h-[300px] overflow-y-auto border rounded-md">
    <table className="min-w-[700px] border-collapse text-sm text-gray-800 w-full">

            <thead className="bg-secondaryColor text-left">
              <tr>
                <th className="border p-2 text-center w-10">
                  <CustomCheckbox
                    checked={
                      rows.length > 0 && selectedRowIds.length === rows.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="border p-2 w-12 text-center">S No</th>
                <th className="border p-2 w-40">Item Code</th>
                <th className="border p-2">Item Description</th>
                <th className="border p-2">UoM</th>
                <th className="border p-2">Previously Available</th>
                <th className="border p-2 w-50">Currently Available</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50">
              
                  <td className="border p-2 text-center">
                    <CustomCheckbox
                      checked={selectedRowIds.includes(row.id)} // Check by ID
                      onChange={() => handleSelectRow(row.id)} // Pass ID
                    />
                  </td>
                  
                  {/* S No Cell (Non-editable) */}
                  <td className="border p-2 text-center">{index + 1}</td>

                  {/* Editable Item Code Cell */}
                  <td className="border p-0">
                    <InputField
                      value={row.itemCode}
                      onChange={(e) =>
                        handleRowChange(index, "itemCode", e.target.value)
                      }
                      hideLabel
                      width="w-full"
                      className="space-y-0" // Removes margin from InputField
                    />
                  </td>

                  {/* Non-Editable Text Cells */}
                  <td className="border p-2">{row.itemDescription}</td>
                  <td className="border p-2">{row.uom}</td>

                  {/* Styled "Previously Available" Cell (Non-editable) */}
                  <td className="border p-2 text-primaryColor font-medium">
                    {row.previouslyAvailable}
                  </td>

                  {/* Editable "Currently Available" Cell */}
                  <td className="border p-0">
                    <InputField
                      value={row.currentlyAvailable}
                      onChange={(e) =>
                        handleRowChange(index, "currentlyAvailable", e.target.value)
                      }
                      hideLabel
                      width="w-full"
                      className="space-y-0" // Removes margin from InputField
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {/* Add/Delete buttons (mimicking DynamicEditableTable) */}
          <div className="flex justify-start items-center gap-4 mt-2">
            <button
              onClick={handleAddRow}
              className="text-blue-600 text-sm font-semibold hover:none"
            >
              + Add
            </button>
            <button
              onClick={handleDeleteRows}
              disabled={selectedRowIds.length === 0}
              className={`text-sm font-semibold ${
                selectedRowIds.length > 0
                  ? "text-red-500 hover:none"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Delete
            </button>
          </div>
        </div>
        {/* --- End Custom Table --- */}

        {/* Notes Section */}
        <div className="mt-6">
          <TextareaField
            label="Notes"
            placeholder="Enter Notes here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            width="w-full md:w-3/4 lg:w-1/2"
            rows={5} // Makes the textarea taller
          />
        </div>

        {/* Add Stock Button */}
        <div className="mt-6 flex justify-start ml-0">
          <ButtonComponent
            title="Add Stock"
            onClick={handleAddStock}
          />
        </div>
      </div>
    </>
  );
}