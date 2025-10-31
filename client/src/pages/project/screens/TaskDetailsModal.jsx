import React from "react";
import ReactModal from "react-modal";

const TaskDetailsModal = ({ isOpen, onClose, task }) => {
    if (!task) return null;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            className="bg-white rounded-2xl shadow-xl w-[968px] h-[520px] flex relative overflow-hidden outline-none"
            closeTimeoutMS={200} // smooth fade animation
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
                ✕
            </button>

            {/* ===== Left Content ===== */}
            <div className="flex-1 p-8 overflow-y-auto">
                <p className="text-[13px] text-gray-500 mb-2">
                    {task.project} &gt; {task.milestone} &gt; {task.activity}
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {task.name}
                </h2>

                <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet   {task.description}
                </p>

                {task.attachmentName && (
                    <a
                        href={task.attachmentUrl}
                        className="text-orange-600 underline text-[14px] mb-6 inline-block"
                    >
                        {task.attachmentName}
                    </a>
                )}

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium">
                        <span>★</span> {task.status}
                    </button>
                </div>
            </div>

            {/* ===== Right Sidebar (Activity & Comments) ===== */}
            <div className="w-[280px] border-l border-gray-200 p-5 flex flex-col justify-between bg-white">
                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-3">
                        <div className="text-xs text-gray-500">
                            <p>
                                <span className="text-orange-500 font-medium">
                                    Task has been Created
                                </span>{" "}
                                — {task.createdAt}
                            </p>
                        </div>

                        <div className="text-xs text-gray-500">
                            <p>
                                Status changed to{" "}
                                <span className="text-orange-500 font-medium">
                                    {task.status.toLowerCase()}
                                </span>{" "}
                                — {task.updatedAt}
                            </p>
                        </div>

                        {task.attachmentName && (
                            <div className="text-xs text-gray-500">
                                <p>
                                    Attachment{" "}
                                    <a
                                        href={task.attachmentUrl}
                                        className="text-orange-600 underline"
                                    >
                                        {task.attachmentName}
                                    </a>{" "}
                                    has been added — {task.updatedAt}
                                </p>
                            </div>
                        )}

                        {task.comments?.map((c, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-2 bg-gray-50 rounded-lg p-2"
                            >
                                <div className="w-7 h-7 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full text-xs">
                                    {c.user[0]}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 text-[13px]">{c.text}</p>
                                    <p className="text-gray-400 text-[11px] mt-1">{c.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comment Input */}
                <div className="mt-4 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Enter comments"
                        className="flex-1 border border-gray-200 rounded-lg p-2 text-sm"
                    />
                    <button className="bg-gray-100 p-2 rounded-lg text-gray-600 hover:bg-gray-200">
                        📎
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};

export default TaskDetailsModal;
