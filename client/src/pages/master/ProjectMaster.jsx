import Breadcrumb from "../../components/BreadCrumb";
import { PillTabs } from "../../components/Tab";
import CardComponent from "../../components/CardComponent";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import ProjectTypeIcon from "../../assets/master/ProjectType.svg?react";
import ProjectStatusIcon from "../../assets/master/ProjectStatus.svg?react";
import TaskStatusIcon from "../../assets/master/TaskStatus.svg?react";
import TaskTypeIcon from "../../assets/master/TaskType.svg?react";
import BranchMasterIcon from "../../assets/master/BranchMaster.svg?react";
import SiteMasterIcon from "../../assets/master/SiteMaster.svg?react";
import UserMasterIcon from "../../assets/master/UserMaster.svg?react";
import DocumentTypeIcon from "../../assets/master/DocumentType.svg?react";
import DelayReasonIcon from "../../assets/master/DelayReason.svg?react";
import ChecklistTemplateIcon from "../../assets/master/ChecklistTemplate.svg?react";
import CompanyMasterIcon from "../../assets/master/CompanyMaster.svg?react";
import CustomerMasterIcon from "../../assets/master/CustomerMaster.svg?react";
import DocumentNumSeriesIcon from "../../assets/master/DocumentNumSeries.svg?react";
import LabourMasterIcon from "../../assets/master/LabourMaster.svg?react";

const ProjectMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbItems = [
    { label: "Master Data", href: "/master" },
    { label: "Project Master", href: "/master" },
  ];

  const handleCardClick = (cardTitle) => {
    const routeMap = {
      "Customer Master": "/master/customer-master",
      "Project Status": "/master/project-status",
      "Task Status": "/master/task-status",
      "Task Type": "/master/task-type",
      "Project Type": "/master/project-type",
      "Branch Master": "/master/branch-master",
      "Site Master": "/admin/site?source=project-master", // ✅ Use URL parameter
      "User Master": "/admin/user-master?source=project-master", // ✅ Use URL parameter
      "Document Type": "/master/document-type",
      "Delay Reason": "/master/delay-reason",
      "Checklist Template": "/master/checklist-template",
      "Company Master": "/master/company-master",
      "Document Num. Series": "/master/document-num-series",
      "Labour Master": "/master/labour-master",
    };
    const route = routeMap[cardTitle];
    if (route) {
      navigate(route);
    }
  };

  const handleBackRoute = () => navigate("/dashboard");

  const cards = [
    { title: "Project Type", icon: ProjectTypeIcon },
    { title: "Project Status", icon: ProjectStatusIcon },
    { title: "Task Status", icon: TaskStatusIcon },
    { title: "Task Type", icon: TaskTypeIcon },
    { title: "Branch Master", icon: BranchMasterIcon },
    { title: "Site Master", icon: SiteMasterIcon },
    { title: "User Master", icon: UserMasterIcon },
    { title: "Document Type", icon: DocumentTypeIcon },
    { title: "Delay Reason", icon: DelayReasonIcon },
    { title: "Checklist Template", icon: ChecklistTemplateIcon },
    { title: "Company Master", icon: CompanyMasterIcon },
    { title: "Customer Master", icon: CustomerMasterIcon },
    { title: "Document Num. Series", icon: DocumentNumSeriesIcon },
    { title: "Labour Master", icon: LabourMasterIcon },
  ];

  // Check if we're on the main ProjectMaster page (no nested routes)
  const isMainProjectMasterPage = location.pathname === "/master";

  return (
    <>
      {/* Show Project Master breadcrumbs ONLY on main page */}
      {isMainProjectMasterPage && (
        <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />
      )}

      <div className="max-w-full">
        {/* Show Project Master pill tabs ONLY on main page */}
        {isMainProjectMasterPage && (
          <PillTabs
            basePath="/master"
            items={[
              {
                label: "Project Master",
                value: "project-master",
                path: "",
              },
              { label: "BOQ Master", value: "boq-master", path: "boq-master" },
              {
                label: "Purchase Master",
                value: "purchase-master",
                path: "purchase-master",
              },
              {
                label: "Petty Cash Master",
                value: "petty-cash-master",
                path: "petty-cash-master",
              },
            ]}
          />
        )}

        {/* Show cards ONLY when on the main ProjectMaster page */}
        {isMainProjectMasterPage && (
          <div className="max-w-[1050px] grid grid-cols-4 gap-4 mt-4 px-2">
            {cards.map((card, index) => (
              <CardComponent
                key={index}
                {...card}
                className="w-[185px] h-[160px] !mx-auto"
                onClick={() => handleCardClick(card.title)}
              />
            ))}
          </div>
        )}

        {/* Always render nested routes (CustomerMaster, ProjectStatus, etc.) */}
        <Outlet />
      </div>
    </>
  );
};

export default ProjectMaster;
