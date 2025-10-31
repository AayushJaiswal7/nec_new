// client/src/pages/inventory/StockTake.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";

// This is the new page for "Stock Take"

export default function StockTake() {
  const navigate = useNavigate();

  const items = [
    { label: "Inventory Management", href: "/inventory" },
    { label: "Stock Take", href: "/inventory/stock-take" },
  ];

  const handleBackRoute = () => {
    navigate("/inventory"); // Go back to Inventory main page
  };

  return (
    <>
      <Breadcrumb items={items} onBackRoute={handleBackRoute} />
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Stock Take</h1>
        {/* Content for the Stock Take page goes here */}
      </div>
    </>
  );
}