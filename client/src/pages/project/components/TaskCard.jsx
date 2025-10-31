import React, { useState } from "react";
import TaskDetailsModal from "../screens/TaskDetailsModal";
import { FiUser } from "react-icons/fi";


const TaskCard = ({ task }) => {
    const [showModal, setShowModal] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case "Todo": return "bg-yellow-50 text-yellow-600";
            case "In Progress": return "bg-blue-50 text-blue-600";
            case "Closed": return "bg-green-50 text-green-600";
            case "On Hold": return "bg-red-50 text-red-600";
            default: return "bg-gray-50 text-gray-600";
        }
    };

    return (
        <>
            <div
                className="border border-gray-200 rounded-xl pt-4 pb-2.5 pl-4 pr-4 shadow-sm hover:shadow-md transition-all bg-white cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <p className="text-[11px] text-gray-500 mb-1">{task.type}</p>
                <h3 className="font-semibold text-gray-800 text-[14px] mb-2">{task.name}</h3>
                <p className="text-gray-500 text-[12px] leading-snug mb-1">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...
                </p>
                <div className="hidden lg:block ">
                    <div className="w-full h-px bg-gray-100"></div>
                </div>
                <div className="flex items-center mt-2 justify-between">
                    <div className="flex items-center">
                        <FiUser
                            className={`w-3 h-3 text-gray-500 icon--outline transition-colors duration-200`}
                        />
                        <p className="text-[11px] ml-1 text-gray-500">{task.user}</p>
                    </div>

                    <span
                        className={`px-3 py-0.5 text-[11px] font-medium rounded-full ${getStatusColor(task.status)}`}
                    >
                        {task.status}
                    </span>
                </div>
            </div>

            <TaskDetailsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                task={task}
            />
        </>
    );
};

export default TaskCard;
