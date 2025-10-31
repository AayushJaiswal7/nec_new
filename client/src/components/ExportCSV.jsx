import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

export default function ExportCSV({ tableId, filename = "export.csv" }) {
  const handleExport = () => {
    const table = document.getElementById(tableId);
    if (!table) {
      alert(`Table: ${tableId} not found`);
      return;
    }

    const rows = Array.from(table.querySelectorAll("tr"));
    const csvContent = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      return cells.map((cell) => {
        let text = cell.innerText.replace(/"/g, '""');
        if (text.includes(",") || text.includes('"') || text.includes("\n")) {
          text = `"${text}"`;
        }
        return text;
      }).join(",");
    }).join("\n");

    const blob = new Blob([csvContent],{ type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <button
      onClick={handleExport}
      className="border border border-black mt-1 ml-2 px-2 py-2 h-[36px]  flex items-center"
    ><div className="pr-2">
        <MdOutlineFileDownload className="text-xs" />
      </div>
      <span className="whitespace-nowrap text-sm ">Export to CSV</span>
      
    </button>
  );
}