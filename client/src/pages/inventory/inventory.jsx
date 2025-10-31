// client/src/pages/inventory/Inventory.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import DropDown from "../../components/Dropdown";
import ButtonComponent from "../../components/ButtonComponent";


export default function Inventory() {
  const navigate = useNavigate();

  const items = [
    { label: "Inventory Management", href: "/inventory" },
  ];

  const handleBackRoute = () => {
    navigate("/dashboard"); // Or navigate(-1)
  };

  const handleStockTake = () => {
    navigate("/inventory/stock-take");
  };

  return (
    <>
      <Breadcrumb items={items} onBackRoute={handleBackRoute} />
      <div className="p-4">
        {/* Header section with dropdown and new button */}
        <div className="flex justify-between items-center mb-4">
          {/* <DropDown
            label="Select item code"
            placeholder="Select item code"
            options={[]} // Add options here if available
            width="w-60"
            hideLabel={true}
          /> */}
          
          {/* This is the new button you requested */}
          <ButtonComponent
            title="Stock Take"
            onClick={handleStockTake}
            className="bg-orange-500 text-white"
          />
        </div>

        
      </div>
    </>
  );
}