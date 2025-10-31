import { useEffect, useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";

import CustomTable from "../../../../components/CustomTable";
import RestService from "../../../../rest-services/RestServices";
import { useNavigate } from "react-router-dom";

const SiteTable = ({ seacrchParam = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchSites();
  }, [seacrchParam, currentPage]);

  const fetchSites = async () => {
    try {
      const response = await RestService.GetAllData(
        `/sites/all-sites?siteName=${seacrchParam}&limit=${rowsPerPage}&page=${currentPage}`
      );

      if (response.status === 200) {
        setSites(response.data.data.rows);
        setTotalRows(response.data.data.count);
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const handleDelete = (id) => {
    RestService.DeleteData("/sites/delete-site", id).then(() => {
      fetchSites();
    });
  };
  const handleEdit = (id) => {
    navigate(`/admin/site/add-site`, { state: { id } });
  };

  const columns = [
    {
      name: "S.No",
      // selector: (row, index) => index + 1,
      cell: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      width: "80px",
    },
    {
      name: "Site Code",
      selector: (row) => row.siteCode,
      sortable: true,
    },
    {
      name: "Site Name",
      selector: (row) => row.siteName,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Site Manager",
      selector: (row) => row.siteManager,
      sortable: true,
    },
    {
      name: "Street Name",
      selector: (row) => row.street,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Postal Code",
      selector: (row) => row.postalCode,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "GPS Location",
      selector: (row) => row.latLong,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-3">
          <button
            className="text-orange-600 hover:text-orange-800"
            onClick={() => handleEdit(row.id)}
          >
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <>
      <div>
        <div className="m-2 mt-5">
          <CustomTable
            data={sites}
            columns={columns}
            paginationTotalRows={totalRows}
            paginationPerPage={rowsPerPage}
            paginationDefaultPage={currentPage}
            paginationServer={true}
            onChangePage={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};
export default SiteTable;
