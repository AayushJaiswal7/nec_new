import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";
import Breadcrumb from "../../../components/BreadCrumb";
import CustomCheckbox from "../../../components/CustomCheckBox";
import DropDown from "../../../components/Dropdown";
import ExportCSV from "../../../components/ExportCSV";

const DailyAttendance = () => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Labour Management", href: "/labour" },
    { label: "Daily Attendance", href: "" },
  ];

  const handleBackRoute = () => navigate(-1);

  const rightScrollRef = useRef(null);
  const headerScrollRef = useRef(null);

  // Generate sample date range
  const dates = Array.from({ length: 26 }, (_, i) => {
    const date = new Date(2024, 9, i + 1);
    return {
      full: date.toISOString().split("T")[0],
      label: `${String(i + 1).padStart(2, "0")} Oct`,
    };
  });

  // Sample data
  const initialLabourData = Array.from({ length: 25 }, (_, i) => ({
    sNo: i + 1,
    labourId: `00${i + 1}`,
    labourName: `John Peterson ${i + 1}`,
    attendance: dates.reduce((acc, d) => {
      acc[d.full] = Math.random() < 0.3;
      return acc;
    }, {}),
  }));

  const [attendance, setAttendance] = useState(
    initialLabourData.reduce((acc, labour) => {
      acc[labour.sNo] = labour.attendance;
      return acc;
    }, {})
  );

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(initialLabourData.length / rowsPerPage);
  const paginatedData = initialLabourData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ Sync horizontal scroll between header and right content
  useEffect(() => {
    const header = headerScrollRef.current;
    const rightContent = rightScrollRef.current;
    if (!header || !rightContent) return;

    const syncHorizontalScroll = (src, target) => {
      target.scrollLeft = src.scrollLeft;
    };

    const headerHandler = () => syncHorizontalScroll(header, rightContent);
    const rightHandler = () => syncHorizontalScroll(rightContent, header);

    header.addEventListener("scroll", headerHandler);
    rightContent.addEventListener("scroll", rightHandler);

    return () => {
      header.removeEventListener("scroll", headerHandler);
      rightContent.removeEventListener("scroll", rightHandler);
    };
  }, [currentPage]);

  const handleCheckboxChange = (sNo, date) => {
    setAttendance((prev) => ({
      ...prev,
      [sNo]: {
        ...prev[sNo],
        [date]: !prev[sNo][date],
      },
    }));
  };

  return (
    <div className="flex flex-col w-[700px] lg:w-[1450px] 2xl:w-[1830px]">
      <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />

      <div className="m-4">
        <div className="flex  justify-between">
        <div className="flex justify-between items-center gap-3 mb-4">
          <InputField
            placeholder="Search"
            icon={<CiSearch size={18} />}
            width="w-[250px]"
          />
        </div>
        <div className="flex justify-between">
          <DropDown
            options={["Option 1", "Option 2", "Option 3", "Option 4"]}
            placeholder={"Select Month"}
            width="w-40"
            />
          <ExportCSV
            data={initialLabourData} />
        </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          {/* Combined Header Row */}
          <div className="flex border-b bg-[#FFEFE7] sticky top-0 z-10">
            {/* Left Header (sticky) */}
            <div className="flex-shrink-0 flex sticky left-0 bg-[#FFEFE7] z-20">
              <div className="w-20 px-4 py-3 text-sm font-semibold text-gray-700">
                S No
              </div>
              <div className="w-28 px-4 py-3 text-sm font-semibold text-gray-700">
                Labour ID
              </div>
              <div className="w-40 px-4 py-3 text-sm font-semibold text-gray-700">
                Labour Name
              </div>
            </div>

            {/* Right Header (scrollable but no visible scrollbar) */}
            <div
              ref={headerScrollRef}
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex min-w-max">
                {dates.map((date) => (
                  <div
                    key={date.full}
                    className="w-24 px-4 py-3 text-sm font-semibold text-center text-gray-400"
                  >
                    {date.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body Wrapper - Single scroll container */}
          <div
            ref={rightScrollRef}
            className="flex overflow-auto relative"
            style={{ height: "65vh" }}
          >
            {/* Left Labour Table (sticky) */}
            <div className="flex-shrink-0 sticky left-0 bg-white z-10">
              {paginatedData.map((labour) => (
                <div
                  key={labour.sNo}
                  className="flex border-b last:border-b-0 hover:bg-gray-50 bg-white"
                  style={{ minHeight: "50px" }}
                >
                  <div className="w-20 px-4 py-3 text-sm flex items-center">
                    {labour.sNo}
                  </div>
                  <div className="w-28 px-4 py-3 text-sm flex items-center">
                    {labour.labourId}
                  </div>
                  <div className="w-40 px-4 py-3 text-sm flex items-center">
                    {labour.labourName}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Attendance Table (scrolls horizontally) */}
            <div className="flex-1 min-w-max">
              {paginatedData.map((labour) => (
                <div
                  key={labour.sNo}
                  className="flex border-b last:border-b-0 hover:bg-gray-50"
                  style={{ minHeight: "50px" }}
                >
                  {dates.map((date) => (
                    <div
                      key={date.full}
                      className="w-24 flex items-center justify-center"
                    >
                      <CustomCheckbox
                        checked={attendance[labour.sNo]?.[date.full] || false}
                        onChange={() =>
                          handleCheckboxChange(labour.sNo, date.full)
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-300 p-3 bg-white">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }`}
              >
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DailyAttendance;