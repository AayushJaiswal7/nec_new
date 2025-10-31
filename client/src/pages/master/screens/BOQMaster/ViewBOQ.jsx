// client/src/pages/master/screens/BOQMaster/ViewBOQ.jsx
import React, { useState, useEffect } from 'react'; // Kept React and hooks
import { useNavigate } from 'react-router-dom'; // Kept useNavigate
// Removed CustomTable import
import SecondaryButton from '../../../../components/SecondaryButton'; //Reusable Secondary Button
import { Upload, Download } from 'lucide-react'; // Icons for buttons


const ViewBOQ = () => {
  const navigate = useNavigate(); 
  const handleExport = () => {
    console.log("Export button clicked.");
    alert('Export functionality to be implemented.');
  };

  const handleImport = () => {
    console.log("Import button clicked.");
    alert('Import functionality to be implemented.');
  };

  
  return (
   <div className="pt-0 px-4 pb-4 ">

      {/* --- Section for Title and Buttons (On the same line) --- */}
      <div className="flex justify-between items-center mt-4 mb-4 flex-wrap gap-2">
        {/* Title: Allows shrinking */}
        <h2 className="text-xl font-semibold text-gray-800 min-w-0">
           Master BOQ - Residential Apartment Construction
        </h2>
        {/* Action Buttons Container: Does not shrink */}
        <div className="flex gap-2 flex-shrink-0">
           <SecondaryButton
             text="Import as CSV"
             icon={Upload}
             onClick={handleImport}
             className="border-gray-300 hover:bg-gray-50" // Basic styling
           />
           <SecondaryButton
             text="Export to CSV"
             icon={Download}
             onClick={handleExport}
             className="border-gray-300 hover:bg-gray-50" // Basic styling
           />
        </div>
      </div>
      
      <div
        className="dragscroll mt-6 overflow-auto border border-gray-200 rounded-md max-h-[calc(100vh-280px)] cursor-grab
        " 
      >
        <table className="w-full min-w-[1900px] border-collapse text-sm"> 
          <thead className="sticky top-0 bg-[#FFF9F6] z-10"> 
            <tr className="border-b border-gray-300">
              <th rowSpan={2} className="p-2 border-r border-l border-gray-300 text-left font-semibold text-sm w-16">S NO</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm w-32">Item Code</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm min-w-[250px]">Item Description</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm min-w-[200px]">Item Specification</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-left font-semibold text-sm w-20">UOM</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">Factory</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">Office</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">Other/Utilities</th>
              <th colSpan={2} className="p-2 border-r border-gray-300 text-center font-semibold text-sm">External</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Total QTY</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-28">Rate (Rs)</th>
              <th rowSpan={2} className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-32">Total Amount (Rs)</th>
            </tr>
            {/* Bottom Header Row (Sub-headers) */}
            <tr className="border-b-2 border-gray-400"> {/* Thicker bottom border */}
              {/* Under Factory */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
              {/* Under Office */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
              {/* Under Other/Utilities */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
              {/* Under External */}
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-20">QTY</th>
              <th className="p-2 border-r border-gray-300 text-right font-semibold text-sm w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows (<tr>) with data cells (<td>) will go here later */}
             <tr>
                <td colSpan={19} className="text-center p-10 text-gray-500"> {/* Updated colSpan to 19 */}
                  BOQ data rows will be added here.
                </td>
             </tr>
          </tbody>
        </table>
      </div>
      

        </div>
   
  );
};

export default ViewBOQ;

