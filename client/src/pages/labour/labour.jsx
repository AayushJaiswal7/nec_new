import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import CardComponent from "../../components/CardComponent";
import DailyAttendanceIcon from "../../assets/labour/ChecklistTemplate.svg?react";
import LabourMasterIcon from "../../assets/labour/labour_master.svg?react"; 

export default function Labour() {
    const navigate = useNavigate();
  const items = [
    { label: "Labour Management", href: "/labour" },
  ];
  const handleBackRoute = () => {
    navigate("/dashboard");
  };
  
   const cards = [
    {
      icon: LabourMasterIcon,
      title: "Labour Master",
      path: "/labour-management-labour-master",
    },
    {
      icon: DailyAttendanceIcon,
      title: "Daily Attandance",
      path: "/daily-attandance",
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
