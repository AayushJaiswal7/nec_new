import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { SquarePen, Trash2 } from 'lucide-react';
import ButtonComponent from '../../../../components/ButtonComponent';
import CustomTable from '../../../../components/CustomTable';
import InputField from '../../../../components/InputField';
import CustomModal from '../../../../components/CustomModal';
// import { SortAsc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const checkboxCategories = {
   Factory: ['Factory 1', 'Factory 2', 'Factory 3', 'Factory 4'],
   Office: ['Office 1', 'Office 2', 'Office 3', 'Office 4'],
   External: ['External 1', 'External 2', 'External 3', 'External 4'],
   Other: ['Other 1', 'Other 2', 'Other 3', 'Other 4'],
};
const BoqMaster = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [boqName, setBoqName] = useState('');
   const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
   const navigate = useNavigate();
   const [data, setData] = useState([

      {
         id: 1,
         sNo: 1,
         boqName: 'GMR',
         createdBy: 'User002, 12.12.2024 10:00PM',
         updatedBy: 'User002, 12.12.2024 10:00PM',
      },

      {
         id: 2,
         sNo: 2,
         boqName: 'BOQ - Commercial Apartment Construction',
         createdBy: 'User002, 12.12.2024 10:00PM',
         updatedBy: 'User002, 12.12.2024 10:00PM',
      },
      {
         id: 3,
         sNo: 7,
         boqName: 'Master BOQ - Residential Apartment Construction',
         createdBy: 'User002, 12.12.2024 10:00PM',
         updatedBy: 'User002, 12.12.2024 10:00PM',
      },

   ]);
   const handleCreateBoq = () => {
      //  alert('Create BOQ Master button clicked!'); 

      setBoqName('');
      setSelectedCheckboxes({});
      setIsModalOpen(true);
   };
   const handleCheckboxChange = (event) => {
      const { name, checked } = event.target; // Get the name and checked status from the checkbox that triggered the event
      setSelectedCheckboxes(prevState => ({ // Update the selectedCheckboxes state
         ...prevState, // Keep all existing checked statuses
         [name]: checked, // Update the status for the specific checkbox 
      }));
   };
   const handleGenerateBoq = () => {
      setIsModalOpen(false); // Close the modal
      console.log("Selected Checkboxes for filtering:", selectedCheckboxes);
      console.log("BOQ Name:", boqName);
      navigate('/master/boq-master/view');
   };
  


   const columns = [
      {
         name: 'S No',
         selector: row => row.sNo,
         sortable: true,
         width: '100px',
      },
      {
         name: 'Master BOQ Name',
         selector: row => row.boqName,
         sortable: false,
      },
      {
         name: 'Created By',
         selector: row => row.createdBy,
         sortable: true,

      },
      {
         name: 'Updated By',
         selector: row => row.updatedBy,
         sortable: true,

      },

      {
         name: 'Actions',
         cell: (row) => (
            <div className="flex gap-4">

               <button className="text-black-600 hover:text-black-800">
                  <SquarePen size={18} />
               </button>
               <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
               </button>

            </div>
         ),
         width: '100px',
      },

   ];

   return (

      <div className="p-4">
         <div className='flex justify-end mb-4'>
            {/* create boq master */}
            <ButtonComponent
               title="Create BOQ Master"
               icon={IoMdAdd}
               iconPosition={0}
               onClick={handleCreateBoq}
            ></ButtonComponent>
         </div>
         {/* table component */}
         <CustomTable
            columns={columns}
            data={data}
         />

         <CustomModal
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
            size="lg" // <-- Add this prop to control width ('md', 'lg', 'xl')
            footer
         >
            <div className="space-y-6">
               {/* BOQ Name Input */}
               <InputField
                  label="BOQ Name"
                  placeholder="Enter master BOQ name"
                  name="boqName"
                  className="rounded border-gray-300 accent-primaryColor focus:ring-primaryColor"
                  value={boqName} // Control the input
                  onChange={(e) => setBoqName(e.target.value)}
               />

               <div className="grid grid-cols-4 gap-x-4 gap-y-3 pt-2">

                  {/* Map over categories, then items, rendering each directly into the grid */}
                  {Object.entries(checkboxCategories).flatMap(([category, items]) => (
                     items.map((item) => (
                        <label key={`${category}-${item}`} className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors duration-150">
                           <input
                              type="checkbox"
                              name={`${category}-${item}`} // Unique name for state
                              checked={!!selectedCheckboxes[`${category}-${item}`]} // Control based on state
                              onChange={handleCheckboxChange} // Handler to update state
                              className="
                      h-4 w-4 rounded border-gray-300
                      text-primaryColor focus:ring-primaryColor focus:ring-offset-0
                      checked:border-primaryColor
                    "
                           />
                           <span>{item}</span> {/* e.g., "Factory 1" */}
                        </label>
                     ))
                  ))}

               </div>

               {/* Generate Button */}
               <div className="flex justify-center pt-4">
                  <ButtonComponent
                     title="Generate BOQ Sheet"
                      onClick={handleGenerateBoq} 
                  // Add onClick later
                  />
               </div>
            </div>
         </CustomModal>
      </div>
   );
};

export default BoqMaster; 