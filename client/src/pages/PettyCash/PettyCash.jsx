
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import CardComponent from "../../components/CardComponent"; 
import CashEntryIcon from "../../assets/PettyCash/CashEntryIcon.svg?react";
import CashRegisterIcon from "../../assets/PettyCash/CashRegisterIcon.svg?react";


export default function PettyCash() {
  const navigate = useNavigate();
  const items = [
    { label: "Petty Cash", href: "/petty-cash" },
  ];
  const handleBackRoute = () => {
     navigate(-1);
  };


  const cards = [
    {
      icon: CashEntryIcon,
      title: "Petty Cash Entry",
      path: "/petty-cash-entry", 
    },
    {
      icon: CashRegisterIcon,
      title: "Petty Cash Register",
      path: "/petty-cash-register", 
    },
  ];

  return (
    <>
      <Breadcrumb items={items} onBackRoute={handleBackRoute} />
       <div className="bg-primaryBackground min-h-screen p-2 max-w-[80%]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          {cards.map((card, i) => (
            <CardComponent
              key={i}
              title={card.title}
              icon={card.icon}
              onClick={() => navigate(card.path)}
              className="w-[90%] h-[160px] !mx-auto cursor-pointer"
            />
          ))}
        </div>
      </div>
    </>
  );
}
