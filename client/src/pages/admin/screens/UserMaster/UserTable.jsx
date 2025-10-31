import { useState, useEffect } from "react";
import CustomTable from "../../../../components/CustomTable";
import RestService from "../../../../rest-services/RestServices";
import { toast } from "react-toastify";
import { Pencil, SquarePen, Trash2 } from "lucide-react";
import ConfirmDeletePopup from "../../../../components/ConfirmDeletePopup";

const UserTable = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const rowsPerPage = 10;

  // Fetch whenever page or searchTerm changes
  useEffect(() => {
    fetchUsers(currentPage, searchTerm || "");
  }, [currentPage, searchTerm]);

  const fetchUsers = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const res = await RestService.GetAllData(
        `/users/get-all-user?page=${page}&limit=${rowsPerPage}&search=${search}`
      );

      if (res?.data.users) {
        setData(res.data.users);
        setTotalRows(res.data.totalItems); // Use totalItems from API response
      } else {
        setData([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open delete confirmation popup
   * @param {number} id - The ID of the user to delete
   * @param {string} userName - The name of the user to delete
   */
  const openDeleteConfirm = (id, userName) => {
    setUserToDelete({ id, userName });
    setShowDeletePopup(true);
  };

  /**
   * Confirm and execute user deletion
   * @async
   */
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      // Call API
      const response = await RestService.DeleteData(
        "/users/delete-user",
        userToDelete.id
      );

      if (response?.success) {
        toast.success(response.message || "User deleted successfully!");
        fetchUsers(currentPage, searchTerm || ""); // Refresh table
      } else {
        // Backend returned success: false
        toast.error(response.message || "Unable to delete user");
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error deleting user:", error);

      // Try to extract backend error message if available
      const msg =
        error?.response?.data?.message || // Axios style
        error?.message || // generic JS error
        "An error occurred while deleting the user";

      toast.error(msg);
    } finally {
      setShowDeletePopup(false);
      setUserToDelete(null);
    }
  };

  /**
   * Cancel user deletion
   */
  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  // Fetch Users

  const columns = [
    { name: "S.No", selector: (row, index) => index + 1, sortable: true },
    { name: "User ID", selector: (row) => row.user_id, sortable: true },
    { name: "User Name", selector: (row) => row.user_name, sortable: true },
    { name: "Role", selector: (row) => row.role.role_name, sortable: true },
    { name: "Branch", selector: (row) => row.branch, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    { name: "Mail ID", selector: (row) => row.email, sortable: true },
    { name: "Contact No.", selector: (row) => row.phone, sortable: true },
    { name: "Valid From", selector: (row) => row.valid_from, sortable: true },
    { name: "Valid To", selector: (row) => row.valid_to, sortable: true },
    {
      name: "Status",
      selector: (row) => (row.is_active === "1" ? "Active" : "Inactive"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-3">
          <button className="text-orange-600 hover:text-orange-800">
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => openDeleteConfirm(row.id, row.user_name)}
            className="text-red-500 hover:text-red-700"
            title="Delete User"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <div className="m-2 mt-5">
      <CustomTable
        data={data}
        columns={columns}
        progressPending={loading}
        paginationTotalRows={totalRows}
        paginationPerPage={rowsPerPage}
        paginationDefaultPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {/* Delete Confirmation Popup */}
      <ConfirmDeletePopup
        title="Delete User"
        message={`Are you sure you want to delete the user "${userToDelete?.userName}"?`}
        isOpen={showDeletePopup}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      />
    </div>
  );
};

export default UserTable;
