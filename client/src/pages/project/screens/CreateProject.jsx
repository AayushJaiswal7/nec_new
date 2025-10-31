import React, { useState } from "react";
import ButtonComponent from "../../../components/ButtonComponent";
import FileUploadInput from "../../../components/FileUploadInput";
import DropDown from "../../../components/Dropdown";
import InputField from "../../../components/InputField";
import Breadcrumb from "../../../components/BreadCrumb";
import { useNavigate } from "react-router-dom";


const CreateProjectScreen = () => {
    const [formData, setFormData] = useState({
        siteCode: "",
        projectName: "",
        projectType: "",
        customer: "",
        projectCode: "",
        startDate: "",
        endDate: "",
        description: "",
        resources: [],
        document: null
    });

    const navigate = useNavigate();
    const [selectedResources, setSelectedResources] = useState([]);

    // Sample data for dropdowns
    const siteCodeOptions = [
        "SITE-001",
        "SITE-002",
        "SITE-003",
        "SITE-004",
        "SITE-005"
    ];

    const projectTypeOptions = [
        "Construction",
        "Renovation",
        "Maintenance",
        "Research",
        "Development",
        "Infrastructure"
    ];

    const customerOptions = [
        "ABC Corporation",
        "XYZ Enterprises",
        "Global Solutions Inc.",
        "Tech Innovations Ltd.",
        "BuildRight Constructions"
    ];

    const resourcesOptions = [
        "Project Manager",
        "Site Engineer",
        "Architect",
        "Civil Engineer",
        "Electrical Engineer",
        "Plumbing Engineer",
        "QA/QC Engineer",
        "Safety Officer",
        "Foreman",
        "Labor Supervisor"
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

    const handleResourceAdd = (resource) => {
        if (resource && !selectedResources.includes(resource)) {
            setSelectedResources(prev => [...prev, resource]);
            setFormData(prev => ({
                ...prev,
                resources: [...prev.resources, resource]
            }));
        }
    };

    const handleResourceRemove = (resourceToRemove) => {
        setSelectedResources(prev => prev.filter(resource => resource !== resourceToRemove));
        setFormData(prev => ({
            ...prev,
            resources: prev.resources.filter(resource => resource !== resourceToRemove)
        }));
    };

    const handleCreateProject = () => {
        // Validate and submit form data
        console.log("Creating project:", formData);
        // Add your API call or form submission logic here
    };

    const formatDateForInput = (dateString) => {
        if (dateString.length === 8) {
            const day = dateString.substring(0, 2);
            const month = dateString.substring(2, 4);
            const year = dateString.substring(4, 8);
            return `${year}-${month}-${day}`;
        }
        return dateString;
    };

    const formatDateForState = (dateString) => {
        if (dateString.length === 10) {
            const year = dateString.substring(0, 4);
            const month = dateString.substring(5, 7);
            const day = dateString.substring(8, 10);
            return `${day}${month}${year}`;
        }
        return dateString;
    };

    const items = [
        { label: 'Project Management', href: '/project' },
        { label: 'Add Project', href: '/create-project' },

    ];
    const handleBackRoute = () => {
        navigate('/project')
        // console.log('Going back...');
        // alert('Back button clicked!');
    };

    return (
        <div className="min-h-screen">
            <div className="px-3">

                <Breadcrumb

                    items={items}
                    onBackRoute={handleBackRoute}
                />
            </div>
            <div className="">

                {/* Project Form */}
                <div className=" p-6 ">
                    <div className="space-y-6">
                        {/* First Row - Site Code & Project Name */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            <DropDown
                                label="Site Code"
                                options={siteCodeOptions}
                                value={formData.siteCode}
                                onChange={(e) => handleInputChange("siteCode", e.target.value)}
                                placeholder="Select Site Code"
                                isRequired={true}
                            />

                            <InputField
                                label="Project Name"
                                placeholder="Enter Project Name"
                                value={formData.projectName}
                                onChange={(e) => handleInputChange("projectName", e.target.value)}
                                isRequired={true}
                            />

                            <DropDown
                                label="Project Type"
                                options={projectTypeOptions}
                                value={formData.projectType}
                                onChange={(e) => handleInputChange("projectType", e.target.value)}
                                placeholder="Select Project Type"
                                isRequired={true}
                            />

                            <DropDown
                                label="Customer"
                                options={customerOptions}
                                value={formData.customer}
                                onChange={(e) => handleInputChange("customer", e.target.value)}
                                placeholder="Select Customer Name"
                                isRequired={true}
                            />
                        </div>



                        {/* Third Row - Project Code & Duplicate Project Name */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            <InputField
                                label="Project Code (Unique)"
                                placeholder="Enter Project Code"
                                value={formData.projectCode}
                                onChange={(e) => handleInputChange("projectCode", e.target.value)}
                                isRequired={true}
                            />

                            <InputField
                                label="Project Name"
                                placeholder="Enter Project Name"
                                value={formData.projectName}
                                onChange={(e) => handleInputChange("projectName", e.target.value)}
                                isRequired={true}
                            />

                            <InputField
                                label="Start Date"
                                type="date"
                                value={formatDateForInput(formData.startDate)}
                                onChange={(e) => handleInputChange("startDate", formatDateForState(e.target.value))}
                                placeholder="Select Start Date"
                                isRequired={true}
                            />

                            <InputField
                                label="Est. End Date"
                                type="date"
                                value={formatDateForInput(formData.endDate)}
                                onChange={(e) => handleInputChange("endDate", formatDateForState(e.target.value))}
                                placeholder="Select End Date"
                                isRequired={true}
                            />
                        </div>



                        {/* Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    placeholder="Enter Description here"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none hover:border-primaryColor focus:border-primaryColor min-h-[100px] resize-vertical"
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {/* Add Resources Section */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">
                                    Add Resources
                                </label>

                                {/* Resource Selection */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <DropDown
                                            options={resourcesOptions}
                                            value=""
                                            onChange={(e) => e.target.value && handleResourceAdd(e.target.value)}
                                            placeholder="Select resource to add"
                                            hideLabel={true}
                                        />
                                    </div>
                                    {/* <ButtonComponent
                                        title="Add Resource"
                                        onClick={() => {
                                            const select = document.querySelector('select');
                                            if (select && select.value) {
                                                handleResourceAdd(select.value);
                                                select.value = "";
                                            }
                                        }}
                                        width="w-32"
                                    /> */}
                                </div>

                                {/* Selected Resources
                                {selectedResources.length > 0 && (
                                    <div className="mt-3">
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Selected Resources:
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedResources.map((resource, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-primaryColor text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                                >
                                                    {resource}
                                                    <button
                                                        onClick={() => handleResourceRemove(resource)}
                                                        className="text-white hover:text-gray-200 text-lg leading-none"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )} */}
                            </div>

                            {/* Upload Documents */}
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Upload Documents
                                </label>
                                <FileUploadInput
                                    placeholder="Choose file"
                                    onChange={handleFileUpload}
                                    accept="*"
                                />
                            </div>
                        </div>


                        {/* Create Project Button */}
                        <div className="flex  pt-6">
                            <ButtonComponent
                                title="Create Project"
                                onClick={handleCreateProject}
                                width="w-48"
                                className="text-base py-3"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectScreen;