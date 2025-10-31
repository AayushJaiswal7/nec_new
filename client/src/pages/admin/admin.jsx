import Breadcrumb from "../../components/BreadCrumb";

import { PillTabs } from "../../components/Tab";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const items = [
    { label: "Admin", href: "/admin" },
    { label: "User Master", href: "/admin/user-master" },
    // { label: "Add User", href: "/admin/user-master/add" },
  ];
  const handleBackRoute = () => {
    navigate('/dashboard')
  };
  const location = useLocation();

  const hidePillTabsRoutes = [
    "/site/add-site",
    "/admin/add-user"
  ];
  const hideTabs = hidePillTabsRoutes.some((route) =>
    location.pathname.includes(route)
  );

  return (
    <>
      {!hideTabs && <Breadcrumb items={items} onBackRoute={handleBackRoute} />}
      <div className="max-w-full ">
        {!hideTabs && (
          <PillTabs
            basePath="/admin"
            items={[
              { label: "Approvals", value: "approvals", path: "approvals" },
              {
                label: "User Master",
                value: "Users Master",
                path: "user-master",
              },
              { label: "Roles", value: "roles", path: "roles" },
              {
                label: "Authorizations",
                value: "Authorizations",
                path: "authorizations",
              },
              { label: "Site", value: "site", path: "site" },
            ]}
          />
        )}
        <Outlet />
      </div>
    </>
  );
}

export default Admin;
