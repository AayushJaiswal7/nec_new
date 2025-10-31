import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from '../../components/BreadCrumb';
import ButtonComponent from '../../components/ButtonComponent';
import ProjectCard from '../../components/ProjectCard';

const Project = () => {
  const items = [
    { label: 'Project Management', href: '/project' },
  ];

  const projectData = [
    {
      siteName: "Site Name",
      projectType: "Project Type",
      code: "PR-001",
      title: "UrbanRise Commercial Hub",
      description:
        "A state-of-the-art commercial complex built to host offices, retail spaces, and coworking zones. UrbanRise emphasizes energy efficiency and modular design, integrating natural light, solar power, and advanced HVAC systems.",
      startDate: "08-10-2025",
      endDate: "08-10-2026",
      resources: 321,
    },
    {
      siteName: "Site Name",
      projectType: "Project Type",
      code: "PR-002",
      title: "UrbanRise Commercial Hub",
      description:
        "A state-of-the-art commercial complex built to host offices, retail spaces, and coworking zones. UrbanRise emphasizes energy efficiency and modular design, integrating natural light, solar power, and advanced HVAC systems.",
      startDate: "08-10-2025",
      endDate: "08-10-2026",
      resources: 321,
    },
    {
      siteName: "Site Name",
      projectType: "Project Type",
      code: "PR-003t",
      title: "UrbanRise Commercial Hub",
      description:
        "A state-of-the-art commercial complex built to host offices, retail spaces, and coworking zones. UrbanRise emphasizes energy efficiency and modular design, integrating natural light, solar power, and advanced HVAC systems.",
      startDate: "08-10-2025",
      endDate: "08-10-2026",
      resources: 321,
    }
  ];

  return (
    <div className="px-3 m-2 bg-[#FFF5EE] min-h-screen">
      <Breadcrumb items={items} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="relative w-full sm:w-[300px] mb-2 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-4 focus:outline-none border border-gray-300 bg-white rounded px-4 py-2 text-sm w-full h-[35px]"
          />
        </div>

        <ButtonComponent
          title="Create Project"
          className="flex items-center gap-2 py-1 sm:h-[35px]"
          iconPosition={0}
          icon={Plus}
        />
      </div>

      {/* ✅ Responsive 3 Columns fixed 30rem width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Project;
