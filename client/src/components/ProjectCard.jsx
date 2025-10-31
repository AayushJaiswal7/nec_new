import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const { siteName, projectType, code, title, description, startDate, endDate, resources } = project;
  const navigate = useNavigate();


  return (
    <div onClick={
      () => navigate('/project-details')} className="bg-white cursor-pointer rounded-2xl p-4 font-[Inter,'Segoe UI',Tahoma,Geneva,Verdana,sans-serif] max-w-[420px] border border-[#f5f2ee]"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 px-[19px] py-[3px] rounded-full text-[10px] font-medium bg-[#fdece8] text-[#f15b2a] before:content-['𝚃'] before:font-black before:text-[1.1em] before:text-shadow-[0_0_1px]">
            {siteName}
          </span>
          <span className="flex items-center gap-1.5 px-[19px] py-[3px] rounded-full text-[10px] font-medium bg-[#BAE7FF] text-black before:content-['𝚃'] before:font-black before:text-[1.1em] before:text-shadow-[0_0_1px]">
            {projectType}
          </span>
        </div>
        <div className="text-[22px] text-[#555] cursor-pointer select-none">⋮</div>
      </div>

      {/* Title */}
      <h2 className="text-[16px] font-semibold my-2 ">
        <span className="font-semibold mr-1">{code} :</span>
        {title}
      </h2>

      {/* Description */}
      <p className="text-[13px] leading-relaxed mb-3">{description}</p>

      {/* Divider */}
      <div className="h-px bg-[#E9E9E9] mb-3"></div>

      {/* Footer */}
      <div className="flex justify-between text-left">
        <div className="flex flex-col text-[12px] text-[#777]">
          <span className="font-normal text-[#6D6D6D] mb-[2px]">Start Date</span>
          <span className="text-[#111] font-semibold">{startDate}</span>
        </div>
        <div className="flex flex-col text-[12px] text-[#777]">
          <span className="font-normal text-[#6D6D6D] mb-[2px]">End Date</span>
          <span className="text-[#111] font-semibold">{endDate}</span>
        </div>
        <div className="flex flex-col text-[12px] text-[#777]">
          <span className="font-normal text-[#6D6D6D] mb-[2px]">Resources</span>
          <span className="text-[#111] font-semibold">{resources}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;