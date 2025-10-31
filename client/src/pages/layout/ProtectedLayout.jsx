import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/logo/NEC.png';

// ✅ Import SVGs as React components
import DashboardIcon from '../../assets/icons/dashboard.svg?react';
import PurchaseIcon from '../../assets/icons/purchase.svg?react';
import ProjectIcon from '../../assets/icons/project.svg?react';
import MasterIcon from '../../assets/icons/master.svg?react';
import LabourIcon from '../../assets/icons/labour.svg?react';
import InventoryIcon from '../../assets/icons/inventory.svg?react';
import AdminIcon from '../../assets/icons/admin.svg?react';

// ✅ Import icons from react-icons
import { FiUser, FiSettings } from 'react-icons/fi';
import { HiOutlineCash } from 'react-icons/hi';

// ✅ Sidebar items (excluding Settings)
const sidebarItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { name: 'Purchase', icon: PurchaseIcon, path: '/purchase' },
    { name: 'Project', icon: ProjectIcon, path: '/project' },
    { name: 'Master', icon: MasterIcon, path: '/master' },
    { name: 'Petty Cash', icon: HiOutlineCash, path: '/petty-cash', isIcon: true },
    { name: 'Labour', icon: LabourIcon, path: '/labour' },
    { name: 'Inventory', icon: InventoryIcon, path: '/inventory' },
    { name: 'Admin', icon: AdminIcon, path: '/admin' },
];

// ✅ Bottom sidebar items (Settings and Profile)
const bottomSidebarItems = [
    { name: 'Settings', icon: FiSettings, path: '/settings', isIcon: true },
    { name: 'Profile', icon: FiUser, path: '/profile', isIcon: true },
];

// ✅ Admin tabs (if needed)
const adminTabs = [
    { name: 'Approvals', path: '/admin/approvals' },
    { name: 'User Master', path: '/admin/user-master' },
    { name: 'Roles', path: '/admin/roles' },
    { name: 'Authorizations', path: '/admin/authorizations' },
    { name: 'Site', path: '/admin/site' },
];

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ✅ Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        navigate('/client-login');
    };

    const hideNavbarRoutes = [
        '/add-user',
        '/user-details',
        '/add-support-team',
        '/add-country',
        '/add-client',
        '/sla-management',
        '/create-ticket',
        '/create-problem',
        '/create-change-request',
    ];

    const hideNavbar = hideNavbarRoutes.some(route => location.pathname.includes(route));

    // ✅ Check if current route matches sidebar item or its sub-routes
    const isItemActive = (itemPath) => {
        // Exact match for dashboard
        if (itemPath === '/dashboard') {
            return location.pathname === '/dashboard';
        }

        // For other items, check if current path starts with item path
        // This makes /project active for /project, /project-details, /project/anything, etc.
        return location.pathname.startsWith(itemPath) && itemPath !== '/dashboard';
    };

    // ✅ Render sidebar icon with dynamic colors - handles both SVG and React Icons
    const renderSidebarIcon = (IconComponent, isActive, isIcon = false) => {
        if (isIcon) {
            // React Icon component
            return (
                <IconComponent
                    className={`w-5 h-5 icon--outline transition-colors duration-200 ${isActive ? 'text-[#FF6600]' : 'text-gray-300 hover:text-white'
                        }`}
                />
            );
        } else {
            // SVG component
            return (
                <IconComponent
                    className={`w-5 h-5 icon--fill transition-colors duration-200 ${isActive ? 'text-[#FF6600]' : 'text-gray-300 hover:text-white'
                        }`}
                />
            );
        }
    };

    return (
        <div className="flex min-h-screen bg-[#FFF9F6] font-inter overflow-hidden">
            {/* Fixed Sidebar */}
            <aside className="w-20 bg-[#1C1C1C] flex flex-col fixed left-0 top-0 h-screen z-50">
                {/* Logo */}
                <div className="h-14 flex items-center justify-center border-b border-gray-800 shrink-0">
                    <img src={Logo} alt="Logo" className="w-8 h-8" />
                </div>

                {/* Main Sidebar Items */}
                <nav className="flex-1 mt-3 overflow-y-auto">
                    {sidebarItems.map(item => {
                        const IconComponent = item.icon;
                        const isActive = isItemActive(item.path);

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={false}
                                className={({ isActive: navLinkActive }) =>
                                    `flex flex-col items-center justify-center gap-1 py-[9px] text-xs font-medium transition-all relative ${isActive
                                        ? 'text-[#FF6600]'
                                        : 'text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive: navLinkActive }) => (
                                    <>
                                        {renderSidebarIcon(IconComponent, isActive, item.isIcon)}
                                        <span>{item.name}</span>

                                        {/* Active indicator dot for sub-routes */}
                                        {/* {isActive && location.pathname !== item.path && (
                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6600] rounded-full"></div>
                                        )} */}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Bottom Section - Settings and Profile */}
                <div className="mt-auto border-t border-gray-800 shrink-0">
                    {bottomSidebarItems.map(item => {
                        const IconComponent = item.icon;
                        const isActive = isItemActive(item.path);

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={false}
                                className={({ isActive: navLinkActive }) =>
                                    `flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-all relative ${isActive
                                        ? 'bg-[#FFB680]/20 text-[#FF6600]'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive: navLinkActive }) => (
                                    <>
                                        {renderSidebarIcon(IconComponent, isActive, item.isIcon)}
                                        <span>{item.name}</span>

                                        {/* Active indicator dot for sub-routes */}
                                        {isActive && location.pathname !== item.path && (
                                            <div className="absolute top-1 right-1 w-2 h-2 bg-[#FF6600] rounded-full"></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-20 min-h-screen">
                {/* Scrollable Content Area */}
                <main className="flex-1 bg-[#FFF9F6] overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProtectedLayout;