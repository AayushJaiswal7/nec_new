import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import { CheckCircle, CheckCircle2, ChevronRight, CircleCheckBig, Divide } from "lucide-react";
import Breadcrumb from "../../../components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { BiCheckCircle, BiRightArrow, BiRightArrowAlt, BiRightIndent, BiSolidCheckCircle } from "react-icons/bi";
import { MdMenuOpen, MdOutlineMenuOpen } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { LuCircleCheckBig } from "react-icons/lu";
import TaskCheck from '../../../assets/icons/task_check.svg?react';
import CreateTaskModal from "./CreateTaskModal";



const ProjectDetails = () => {
    const milestones = ["Milestone 1", "Milestone 2", "Milestone 3", "Milestone 4", "Milestone 5"];
    const [activeMilestone, setActiveMilestone] = useState("Milestone 2");

    const navigate = useNavigate();

    const activities = ["Activity 1", "Activity 2", "Activity 3", "Activity 4", "Activity 5", "Other"];
    const [activeActivity, setActiveActivity] = useState("Activity 2");

    const tasks = [
        { id: 1, type: "Material Procurement", name: "Task Name", status: "Todo", user: "user001" },
        { id: 2, type: "Task Type", name: "Task Name", status: "In Progress", user: "user001" },
        { id: 3, type: "Task Type", name: "Task Name", status: "Closed", user: "user001" },
        { id: 4, type: "Task Type", name: "Task Name", status: "On Hold", user: "user001" },
        { id: 5, type: "Task Type", name: "Task Name", status: "Closed", user: "user001" },
        { id: 6, type: "Task Type", name: "Task Name", status: "On Hold", user: "user001" },
    ];

    const items = [
        { label: 'Project Management', href: '/project' },
        { label: 'PR-001 : UrbanRise Commercial Hub', href: '/project/project-details' },

    ];
    const handleBackRoute = () => {
        navigate('/project')
        // console.log('Going back...');
        // alert('Back button clicked!');
    };
    const [isActivitiesCollapsed, setIsActivitiesCollapsed] = useState(false);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const handleTaskCreate = (taskData) => {
        // Handle the created task data
        console.log("Task created:", taskData);
        // You can make API calls here to save the task
    };

    return (
        <>
            <div className="px-3">

                <Breadcrumb

                    items={items}
                    onBackRoute={handleBackRoute}
                />
            </div>


            <div className="px-4 pt-1 pb-3 bg-[#FAFAFA] min-h-screen text-[13px] text-gray-700">

                {/* Header */}
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                    {/* Project Tags */}
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1 rounded-full border border-orange-100">
                                    Two Storey - Bangalore
                                </span>
                                <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full border border-blue-100">
                                    Project Type
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-[20px] font-semibold text-gray-900 mb-2">
                                PR-001 : UrbanRise Commercial Hub
                            </h1>

                            {/* Description */}
                            <p className="text-gray-600 text-[13px] leading-relaxed mb-4 max-w-5xl">
                                A state-of-the-art commercial complex built to host offices, retail spaces, and coworking zones.
                                UrbanRise emphasizes energy efficiency and modular design, integrating natural light, solar power,
                                and advanced HVAC systems. The project aims to become a landmark for sustainable business infrastructure.
                            </p>

                            {/* Files */}
                            <div className="flex items-center gap-5 mb-2">
                                <a href="#" className="text-orange-600 underline text-sm font-medium">
                                    Floor mapping.pdf
                                </a>
                                <a href="#" className="text-orange-600 underline text-sm font-medium">
                                    Floor mapping2.pdf
                                </a>
                            </div>
                        </div>

                        {/* Vertical Divider - Hidden on mobile */}
                        <div className="hidden lg:block mx-6">
                            <div className="w-px h-full bg-gray-200"></div>
                        </div>

                        {/* Right Meta Info */}
                        <div className="lg:w-64">
                            <div className="flex flex-col justify-between h-full gap-3 text-gray-700">
                                <div className="space-y-3">
                                    <p className="flex justify-between">
                                        <span>Start Date:</span>
                                        <span className="font-medium">DDMMYYYY</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>End Date:</span>
                                        <span className="font-medium">DDMMYYYY</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Resources:</span>
                                        <span className="font-medium">
                                            121 <a href="#" className="text-blue-600 font-medium hover:underline ml-1">+ Add</a>
                                        </span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Attachments:</span>
                                        <span className="font-medium">
                                            2 <a href="#" className="text-blue-600 font-medium hover:underline ml-1">+ Add</a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="">
                    <div className="
                    mt-1.5 bg-[#FFF8F5] border border-orange-100 rounded-lg overflow-hidden shadow-sm
                    flex items-center justify-between border-b border-orange-100 text-[13px] font-medium">
                        <div>
                            {milestones.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setActiveMilestone(m)}
                                    // className={`flex-1 py-3 text-center transition-all ${activeMilestone === m
                                    //     ? "bg-white text-orange-600 border-b-2 border-orange-400"
                                    //     : "text-gray-600 hover:text-orange-600"
                                    //     }`}

                                    className={`relative px-4 pt-2 pb-3 text-sm font-medium rounded-t-xl transition-all duration-200 border border-transparent border-b-0 focus:outline-none whitespace-nowrap
                                             ${activeMilestone === m
                                            ? [
                                                "bg-white text-gray-800 shadow-sm",
                                                "border-x border-t border-orange-200",
                                                'after:content-[""] after:absolute after:left-0 after:right-0 after:top-0 after:h-2.5',
                                                "after:border-t-2 after:border-x-2 after:border-primaryColor after:rounded-t-xl",

                                                "-mb-px",
                                            ].join(" ")
                                            : "text-gray-600 hover:text-gray-800"
                                        }
`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div>
                            <button className="px-5 py-3 text-gray-600 hover:text-orange-600">Resources</button>
                            <button className="px-5 py-3 text-gray-600 hover:text-orange-600">BOQs</button>
                        </div>

                    </div>

                    <div className=" mt-0 bg-[#FFF8F5] border border-gray-300 rounded-lg min-h-[68vh] overflow-hidden shadow-sm flex">

                        {/* Left Activities */}
                        {/* Left Activities */}
                        <div className="border-r border-gray-300 bg-white pt-1 transition-all duration-300 ease-in-out" style={{ width: isActivitiesCollapsed ? '60px' : '240px' }}>
                            <div className="items-center justify-between mb-3">
                                <div
                                    className="font-semibold text-gray-700 px-4 pb-2 text-[13px] flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md py-1"
                                    onClick={() => setIsActivitiesCollapsed(!isActivitiesCollapsed)}
                                >
                                    <MdOutlineMenuOpen
                                        size={18}
                                        className={`transition-transform duration-300 ${isActivitiesCollapsed ? 'rotate-180' : ''}`}
                                    />
                                    {!isActivitiesCollapsed && "Activities"}
                                </div>

                                {!isActivitiesCollapsed && (
                                    <>
                                        <div className="hidden lg:block">
                                            <div className="w-full h-px bg-gray-200"></div>
                                        </div>

                                        <button className="flex text-blue-600 px-4 text-xs mt-2 gap-1 font-medium hover:underline">
                                            <GrAddCircle size={16} />
                                            Add Activities
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Activities List - Always rendered but with different layout based on collapsed state */}
                            <div className="space-y-1 px-2">
                                {activities.map((activity) => (
                                    <button
                                        key={activity}
                                        onClick={() => setActiveActivity(activity)}
                                        className={`w-full text-left rounded-md text-sm font-medium transition-all flex items-center ${isActivitiesCollapsed
                                            ? "justify-center p-2"
                                            : "px-3 py-2"
                                            } ${activeActivity === activity
                                                ? "bg-orange-100 text-orange-700"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                        title={activity} // Show full name on hover
                                    >
                                        {isActivitiesCollapsed ? (
                                            // Collapsed view - show first letter with ellipsis
                                            <div className="relative group">
                                                <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-xs font-semibold text-gray-700">
                                                    {activity.charAt(0).toUpperCase()}
                                                </div>

                                                {/* Tooltip on hover */}
                                                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                                    {activity}
                                                </div>
                                            </div>
                                        ) : (
                                            // Expanded view - show full name with chevron
                                            <div className="flex items-center justify-between w-full">
                                                <div className="truncate">{activity}</div>
                                                <ChevronRight
                                                    size={16}
                                                    className={`flex-shrink-0 transition-colors ${activeActivity === activity ? "text-orange-600" : "text-gray-400"
                                                        }`}
                                                />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* <div className="w-60 border-r border-gray-300 bg-white  pt-2">
                            <div className=" items-center justify-between  mb-3">
                                <h2 className="font-semibold text-gray-700 px-4 pb-2 text-[13px] flex items-center gap-2">
                                    <MdOutlineMenuOpen size={18} />  Activities
                                </h2>


                                <div className="hidden lg:block ">
                                    <div className="w-full h-px bg-gray-200"></div>
                                </div>


                                <button className=" flex text-blue-600 px-4 text-xs mt-2 gap-1 font-medium hover:underline">
                                    <GrAddCircle size={16} />Add Activities
                                </button>
                            </div>

                            <div className="space-y-1 px-4">
                                {activities.map((a) => (
                                    <button
                                        key={a}
                                        onClick={() => setActiveActivity(a)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${activeActivity === a
                                            ? "bg-orange-100 text-orange-700"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                {a}
                                            </div>
                                            <ChevronRight
                                                size={16}
                                                className={`transition-colors ${activeActivity === a ? "text-orange-600" : "text-gray-400"
                                                    }`}
                                            />
                                        </div>

                                    </button>
                                ))}
                            </div>
                        </div> */}

                        {/* Right Content */}
                        <div className="flex-1 bg-white  pt-2">
                            <div className=" items-center justify-between mb-4">
                                <h2 className="font-semibold px-4 pb-2 text-gray-700 text-[13px] flex items-center gap-2">
                                    <TaskCheck /> Tasks
                                </h2>
                                <div className="hidden lg:block ">
                                    <div className="w-full h-px bg-gray-200"></div>
                                </div>

                                <button className="flex text-blue-600 mt-2   px-4 gap-1 text-xs font-medium hover:underline" onClick={() => setShowCreateTaskModal(true)}
                                >
                                    <GrAddCircle size={16} />  Add Tasks
                                </button>
                            </div>

                            {/* Task Cards */}
                            <div className="grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                                {tasks.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateTaskModal
                show={showCreateTaskModal}
                onHide={() => setShowCreateTaskModal(false)}
                onTaskCreate={handleTaskCreate}
            />
        </>
    );
};

export default ProjectDetails;