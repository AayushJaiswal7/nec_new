import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/dashboard";
import ProtectedLayout from "../pages/layout/ProtectedLayout";
import NotFound from "../components/NotFound";
import Admin from "../pages/admin/admin";
import Login from "../pages/login/login";
import AddUser from "../pages/admin/screens/UserMaster/UserAdd";
import AddSite from "../pages/admin/screens/Sites/addSite";
import ProjectDetails from "../pages/project/screens/ProjectDetails";
import Roles from "../pages/admin/screens/Roles/roles";
import Authorization from "../pages/admin/screens/Authorization/Authorization";
import UserMaster from "../pages/admin/screens/UserMaster/UserMaster";
import Project from "../pages/project/project";
import SiteMaster from "../pages/admin/screens/Sites/siteMaster";
import ProtectedRoute from "../routes/ProtectedRoute";
import Purchase from "../pages/purchase/purchase";
import CreateProjectScreen from "../pages/project/screens/CreateProject";
import ProjectMaster from "../pages/master/ProjectMaster";
import BoqMaster from "../pages/master/screens/BOQMaster/BoqMaster";
import CustomerMaster from "../pages/master/screens/customerMaster/CustomerMaster.jsx";
import AddCustomerMaster from "../pages/master/screens/customerMaster/AddCustomerMaster.jsx";
import ProjectStatus from "../pages/master/screens/projectStatus/ProjectStatus.jsx";
import TaskStatus from "../pages/master/screens/taskStatus/TaskStatus.jsx";
import TaskType from "../pages/master/screens/taskType/TaskTypeMaster.jsx";
import AddTaskType from "../pages/master/screens/taskType/AddTaskType.jsx";
import ProjectType from "../pages/master/screens/projectType/ProjectTypeMaster.jsx";
import AddProjectType from "../pages/master/screens/projectType/MasterAddProjectType.jsx";
import AddDocumentType from "../pages/master/screens/documentType/AddDocumentType.jsx";
import DocumentType from "../pages/master/screens/documentType/DocumentTypeMaster.jsx";
import AddDelayReason from "../pages/master/screens/delayReason/AddDelayReason.jsx";
import DelayReason from "../pages/master/screens/delayReason/DelayReasonMaster.jsx";
import BranchMaster from "../pages/master/screens/branchMaster/BranchMaster.jsx";
import DocumentNumSeries from "../pages/master/screens/documentNum/DocumentNumberMaster.jsx";
import LabourMaster from "../pages/master/screens/labourMaster/LabourMaster.jsx";
import AddLabourMaster from "../pages/master/screens/labourMaster/AddLabourMaster.jsx";
import Labour from "../pages/labour/labour.jsx";
import LabourManagementLabourMaster from "../pages/labour/screens/labourManagementLabourMaster.jsx";
import CreateLabour from "../pages/labour/screens/createLabour.jsx";
import DailyAttendance from "../pages/labour/screens/dailyAttandance.jsx";
import PettyCash from "../pages/PettyCash/PettyCash.jsx";
import PettyCashRegister from "../pages/PettyCash/screens/PettyCashRegister.jsx";
import PettyCashEntry from "../pages/PettyCash/screens/PettyCashEntry.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="admin" element={<Admin />}>
          <Route path="approvals" element={<UserMaster />} />
          <Route path="user-master" element={<UserMaster />} />
          <Route path="roles" element={<Roles />} />
          <Route path="authorizations" element={<Authorization />} />
          <Route path="site" element={<SiteMaster />} />
          <Route path="site/add-site" element={<AddSite />} />
        </Route>
        <Route path="add-user" element={<AddUser />} />

        {/* Project Routes */}
        <Route path="project" element={<Project />}>
         
        </Route>
          <Route path="create-project" element={<CreateProjectScreen />} />
<Route path="project-details" element={<ProjectDetails />} />
        {/* Master Routes */}
         <Route path="master" element={<ProjectMaster />}>
          <Route path="boq-master" element={<BoqMaster />} />
          <Route path="customer-master" element={<CustomerMaster />} />
          <Route path="add-customer" element={<AddCustomerMaster />} />
          <Route path="project-status" element={<ProjectStatus />} />
          <Route path="task-status" element={<TaskStatus />} />
          <Route path="task-type" element={<TaskType />} />
          <Route path="add-task-type" element={<AddTaskType />} />
          <Route path="project-type" element={<ProjectType />} />
          <Route path="add-project-type" element={<AddProjectType />} />
          <Route path="add-document-type" element={<AddDocumentType />} />
          <Route path="document-type" element={<DocumentType />} />
          <Route path="add-delay-reason" element={<AddDelayReason />} />
          <Route path="delay-reason" element={<DelayReason />} />
          <Route path="branch-master" element={<BranchMaster />} />
          <Route path="document-num-series" element={<DocumentNumSeries />} />
          <Route path="add-labour-master" element={<AddLabourMaster />} />
          <Route path="labour-master" element={<LabourMaster />} />
        </Route>

        {/* Purchase Routes */}
        <Route path="purchase" element={<Purchase />}></Route>

        {/* pettycash Routes*/}
        <Route path="petty-cash" element={<PettyCash />}/>
        <Route path="petty-cash-register" element={<PettyCashRegister/>}/>
        <Route path="petty-cash-entry" element={<PettyCashEntry/>}/>

         {/* Labour Routes */}
        <Route path="labour" element={<Labour />}/>
        <Route path="labour-management-labour-master" element={<LabourManagementLabourMaster />} />
        <Route path="create-labour" element={<CreateLabour />}/>
        <Route path="daily-attandance" element={<DailyAttendance />}/>

        {/* Catch-all for logged-in users */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Catch-all for unauthenticated users */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
