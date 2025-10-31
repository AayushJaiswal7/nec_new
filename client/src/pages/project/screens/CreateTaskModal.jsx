import React, { useState } from "react";
import ButtonComponent from "../../../components/ButtonComponent";
import CommonModal from "../../../components/CustomModal";
import DropDown from "../../../components/Dropdown";
import InputField from "../../../components/InputField";
import FileUploadInput from "../../../components/FileUploadInput";


const CreateTaskModal = ({ show, onHide, onTaskCreate }) => {
    const [formData, setFormData] = useState({
        taskType: "",
        taskName: "",
        description: "",
        startDate: "",
        endDate: "",
        resources: "",
        document: null
    });

    const taskTypeOptions = [
        "Development",
        "Design",
        "Testing",
        "Documentation",
        "Meeting",
        "Research"
    ];

    const resourcesOptions = [
        "Frontend Team",
        "Backend Team",
        "Design Team",
        "QA Team",
        "Marketing Team",
        "All Teams"
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileUpload = (file) => {
        setFormData(prev => ({
            ...prev,
            document: file
        }));
    };

    const handleCreateTask = () => {
        // Validate form data here if needed
        console.log("Creating task:", formData);

        // Call the callback function to handle task creation
        if (onTaskCreate) {
            onTaskCreate(formData);
        }

        // Reset form and close modal
        setFormData({
            taskType: "",
            taskName: "",
            description: "",
            startDate: "",
            endDate: "",
            resources: "",
            document: null
        });

        onHide();
    };

    const formatDateForInput = (dateString) => {
        // Convert DDMMYYYY to YYYY-MM-DD for input[type="date"]
        if (dateString.length === 8) {
            const day = dateString.substring(0, 2);
            const month = dateString.substring(2, 4);
            const year = dateString.substring(4, 8);
            return `${year}-${month}-${day}`;
        }
        return dateString;
    };

    const formatDateForState = (dateString) => {
        // Convert YYYY-MM-DD to DDMMYYYY for state
        if (dateString.length === 10) {
            const year = dateString.substring(0, 4);
            const month = dateString.substring(5, 7);
            const day = dateString.substring(8, 10);
            return `${day}${month}${year}`;
        }
        return dateString;
    };

    const footer = (
        <>
            {/* <ButtonComponent
                title="Cancel"
                onClick={onHide}
                width="w-24"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            /> */}
            <div className="item-center">
                <ButtonComponent
                    title="Create Task"
                    onClick={handleCreateTask}
                    width="w-32"
                />
            </div>

        </>
    );

    return (
        <CommonModal
            show={show}
            onHide={onHide}
            title="Create New Task"
            size="xl"
            footer={footer}
            centered={true}
            className=""
        >
            <div className="space-y-4">
                {/* Task Type Dropdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <DropDown
                        label="Task Type"
                        options={taskTypeOptions}
                        value={formData.taskType}
                        onChange={(e) => handleInputChange("taskType", e.target.value)}
                        placeholder="Select Task Type"
                        isRequired={true}
                    />

                    {/* Task Name Input */}
                    <InputField
                        label="Task Name"
                        placeholder="Enter Task Name"
                        value={formData.taskName}
                        onChange={(e) => handleInputChange("taskName", e.target.value)}
                        isRequired={true}
                    />

                </div>

                {/* Description Textarea */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        placeholder="Enter Description here"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none hover:border-primaryColor focus:border-primaryColor min-h-[80px] resize-vertical"
                        rows={3}
                    />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                        label="Start Date"
                        type="date"
                        value={formatDateForInput(formData.startDate)}
                        onChange={(e) => handleInputChange("startDate", formatDateForState(e.target.value))}
                        placeholder="DDMMYYYY"
                        isRequired={true}
                    />

                    <InputField
                        label="End Date"
                        type="date"
                        value={formatDateForInput(formData.endDate)}
                        onChange={(e) => handleInputChange("endDate", formatDateForState(e.target.value))}
                        placeholder="DDMMYYYY"
                        isRequired={true}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    {/* Resources Dropdown */}
                    <DropDown
                        label="Resources"
                        options={resourcesOptions}
                        value={formData.resources}
                        onChange={(e) => handleInputChange("resources", e.target.value)}
                        placeholder="Select Resources"
                        isRequired={true}
                    />

                    {/* File Upload */}
                    <div className="mt-4">
                        <FileUploadInput
                            placeholder="Choose file"
                            onChange={handleFileUpload}
                            accept="*"
                        />

                    </div>

                </div>

            </div>
        </CommonModal>
    );
};

export default CreateTaskModal;