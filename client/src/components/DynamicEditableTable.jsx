import React, { useState } from "react";
import Select from "react-select";

/**
 * Reusable Dynamic Editable Table Component
 *
 * Props:
 *  - columns: [{ key, label, editable, type, options, placeholder }]
 *  - initialRows: array of row objects
 *  - onChange: callback(rows)
 */
const DynamicEditableTable = ({ columns, initialRows = [], onChange }) => {
  const [rows, setRows] = useState(initialRows.length ? initialRows : [{}]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChange = (rowIndex, key, value) => {
    const updated = rows.map((row, i) =>
      i === rowIndex ? { ...row, [key]: value } : row
    );
    setRows(updated);
    onChange?.(updated);
  };

  const handleAdd = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.key] = "";
      return acc;
    }, {});
    const updated = [...rows, newRow];
    setRows(updated);
    onChange?.(updated);
  };

  const handleDelete = () => {
    const updated = rows.filter((_, i) => !selectedRows.includes(i));
    setRows(updated);
    setSelectedRows([]);
    onChange?.(updated);
  };

  const handleSelectRow = (index) => {
    const updatedSelection = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(updatedSelection);
  };

  const handleSelectAll = (checked) => {
    if (checked) setSelectedRows(rows.map((_, i) => i));
    else setSelectedRows([]);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border text-sm text-gray-800">
        <thead className="bg-orange-100 text-left">
          <tr>
            <th className="border p-2 text-center w-10">
              <input
                type="checkbox"
                className="accent-orange-500 w-4 h-4 cursor-pointer"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={selectedRows.length === rows.length && rows.length > 0}
              />
            </th>
            <th className="border p-2 w-12 text-center">S.No</th>
            {columns.map((col) => (
              <th key={col.key} className="border p-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  className="accent-orange-500 w-4 h-4 cursor-pointer"
                  checked={selectedRows.includes(rowIndex)}
                  onChange={() => handleSelectRow(rowIndex)}
                />
              </td>
              <td className="border p-2 text-center">{rowIndex + 1}</td>

              {columns.map((col) => (
                <td key={col.key} className="border p-2">
                  {col.type === "select" ? (
                    <Select
                      menuPortalTarget={document.body} 
                      menuPosition="fixed"
                      menuShouldScrollIntoView={false}
                      value={
                        col.options.find((opt) => opt.value === row[col.key]) ||
                        null
                      }
                      options={col.options}
                      onChange={(opt) =>
                        handleChange(rowIndex, col.key, opt?.value || "")
                      }
                      placeholder={col.placeholder || "Select..."}
                      classNamePrefix="react-select"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: "32px",
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "transparent",
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: "0 6px",
                        }),
                        indicatorsContainer: (base) => ({
                          ...base,
                          padding: "0",
                        }),
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 9999, 
                        }),
                        
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={row[col.key] || ""}
                      placeholder={col.placeholder || ""}
                      onChange={(e) =>
                        handleChange(rowIndex, col.key, e.target.value)
                      }
                      className="w-full border-none focus:ring-0 focus:outline-none bg-transparent"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-start items-center gap-4 mt-2">
        <button
          onClick={handleAdd}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          + Add
        </button>

        <button
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
          className={`text-sm font-semibold ${
            selectedRows.length > 0
              ? "text-red-500 hover:underline"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DynamicEditableTable;
