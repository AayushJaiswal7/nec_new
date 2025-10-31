import { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Reusable Tailwind-based Tabs component
const TabsContext = createContext(null);
//Tabs
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className = "",
}) {
  const [internal, setInternal] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const setValue = (v) => {
    if (!isControlled) setInternal(v);
    if (onValueChange) onValueChange(v);
  };

  const ctx = useMemo(() => ({ value: current, setValue }), [current]);

  return (
    <TabsContext.Provider value={ctx}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

//TabList Management

export function TabsList({ children }) {
  return (
    <div
      className="
        flex items-end bg-secondaryColor border-b border-orange-100
        px-3 pt-2 space-x-2"
    >
      {children}
    </div>
  );
}


export function Tab({ value, children, onClick }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab must be inside Tabs");
  const active = ctx.value === value;

  const handleClick = (e) => {
    ctx.setValue(value); // keep tab state working
    if (onClick) onClick(e); 
  };

  return (
    <button
      onClick={handleClick}
      className={`relative px-4 py-2 text-sm font-medium rounded-t-xl transition-all duration-200 border border-transparent border-b-0 focus:outline-none whitespace-nowrap
      ${
        active
          ? [
              "bg-white text-gray-800 shadow-sm",
              "border-x border-t border-orange-200",
              'after:content-[""] after:absolute after:left-0 after:right-0 after:top-0 after:h-2.5',
              "after:border-t-2 after:border-x-2 after:border-primaryColor after:rounded-t-xl",
              "-mb-px",
            ].join(" ")
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {children}
    </button>
  );
}


//Tab Content
export function TabsContent({ children }) {
  return (
    <div className="bg-white border border-orange-200 border-t-0 rounded-b-md">
      {children}
    </div>
  );
}

export function TabPanel({ value, children }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabPanel must be inside Tabs");
  if (ctx.value !== value) return null;
  return <div>{children}</div>;
}

//Pill Tabs Overall

export function PillTabs({ items, defaultValue, basePath = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Automatically detect base path (everything before last segment)
  const segments = location.pathname.split("/").filter(Boolean);
  const currentPathSegment = segments[segments.length - 1] || "";

  const activeTab =
    items.find((it) => it.path === currentPathSegment)?.value ||
    defaultValue ||
    items[0]?.value;

  const currentBasePath = basePath || `/${segments.slice(0, -1).join("/")}`;

  return (
    <Tabs value={activeTab}>
      <TabsList className="flex space-x-2 bg-gray-50 rounded-md p-1">
        {items.map((it) => (
          <Tab
            key={it.value}
            value={it.value}
            onClick={() => {
              if (it.path) navigate(`${currentBasePath}/${it.path}`);
            }}
          >
            {it.label}
          </Tab>
        ))}
      </TabsList>
    </Tabs>
  );
}