import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import CardComponent from "../../components/CardComponent";
import VendorIcon from "../../assets/purchase/vendor.svg?react";
import VendorQuoationIcon from "../../assets/purchase/vendorQuo.svg?react";
import QuoatationComparIcon from "../../assets/purchase/quoatCom.svg?react";
import PurchaseIcon from "../../assets/purchase/purchase.svg?react";
import PurchaseOrderIcon from "../../assets/purchase/po.svg?react";
import GoodsIcon from "../../assets/purchase/goods.svg?react";
import MeasurmentIcon from "../../assets/purchase/measurment.svg?react";
import AbstractIcon from "../../assets/purchase/abstract.svg?react";
import BVSIcon from "../../assets/purchase/bvs.svg?react";
export default function Purchase() {
    const navigate = useNavigate();
  const items = [
    { label: "Purchase", href: "/purchase" },
  ];
  const handleBackRoute = () => {
    navigate("/dashboard");
  };
  
   const cards = [
    {
      icon: VendorIcon,
      title: "Vendor Selection (F-01_QSP-13)",
      path: "/purchase/vendor-selection",
    },
    {
      icon: VendorQuoationIcon,
      title: "Vendor Quotation Entry",
      path: "/purchase/vendor-quotation",
    },
    {
      icon: QuoatationComparIcon,
      title: "Quote Comparison (F-02_QSP-13)",
      path: "/purchase/quote-comparison",
    },
    {
      icon: PurchaseIcon,
      title: "Purchase Request (F-03_QSP-13) Creation",
      path: "/purchase/purchase-request",
    },
    {
      icon: PurchaseOrderIcon,
      title: "Purchase Order Creation",
      path: "/purchase/order-creation",
    },
    {
      icon: GoodsIcon,
      title: "Good Receipt (GRN)/Gate In/Out",
      path: "/purchase/grn",
    },
    {
      icon: MeasurmentIcon,
      title: "Measurement",
      path: "/purchase/measurement",
    },
    {
      icon: AbstractIcon,
      title: "Abstract",
      path: "/purchase/abstract",
    },
    {
      icon: BVSIcon,
      title: "Bill Verification (BVS)",
      path: "/purchase/bill-verification",
    },
  ];
  return (
    <>
      <Breadcrumb  items={items} onBackRoute={handleBackRoute}/>
       <div className="bg-primaryBackground min-h-screen p-2 max-w-[80%]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          {cards.map((card, i) => (
            <CardComponent
              key={i}
              title={card.title}
              icon={card.icon}
              onClick={() => navigate(card.path)}
                 className="w-[90%] h-[160px] !mx-auto"
            />
          ))}
        </div>
      </div>
    </>
  );
}
