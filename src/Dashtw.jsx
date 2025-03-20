import React, { useContext, useState } from "react";
import { AppContext } from "./contextprovider";
import { FaHome, FaChartBar, FaCog, FaMoon, FaSun, FaFileCsv, FaFilePdf, FaUpload } from "react-icons/fa";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTranslation } from "react-i18next";

const Dashtw = () => {
  const { darkMode, setDarkMode, selectedModule, setSelectedModule, data, setData } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState(null);

  const menuItems = [
    { name: t("Home"), icon: <FaHome />, key: "home" },
    { name: t("Analytics"), icon: <FaChartBar />, key: "analytics" },
    { name: t("Settings"), icon: <FaCog />, key: "settings" },
  ];

  // File Upload Handler
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.readAsBinaryString(uploadedFile);
  };

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Exported Data", 10, 10);
    doc.autoTable({
      head: [["ID", "Name", "Username", "Email", "Role", "Company"]],
      body: data.map((item) => [item.id, item.name, item.username, item.email, "User", item.company?.name || "N/A"]),
    });
    doc.save("exported_data.pdf");
  };

  // Table Columns
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: () => "User", sortable: true },
    { name: "Company", selector: (row) => row.company?.name || "N/A", sortable: true },
  ];

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 p-5 bg-gray-800 text-white">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">{t("Dashboard")}</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <nav>
          <ul className="text-white">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-3 p-3 hover:bg-gray-700 rounded cursor-pointer ${
                  selectedModule === item.name ? "bg-gray-700" : ""
                }`}
                onClick={() => setSelectedModule(item.name)}
              >
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="p-4 shadow-md rounded-lg mb-6 bg-gray-800 text-white flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t(selectedModule)}</h2>
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="p-2 border rounded bg-gray-800 text-white border-white"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ta">தமிழ்</option>
          </select>
        </header>

        {/* Buttons */}
        <div className="mb-4 flex gap-4">
          {/* Upload Button */}
          <label className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 cursor-pointer">
            <FaUpload /> {t("Upload CSV")}
            <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Export CSV */}
          <button onClick={exportToCSV} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
            <FaFileCsv /> {t("Export CSV")}
          </button>

          {/* Export PDF */}
          <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2">
            <FaFilePdf /> {t("Export PDF")}
          </button>
        </div>

        {/* Data Table */}
        <DataTable title={t("User Data")} columns={columns} data={data} pagination highlightOnHover responsive />
      </div>
    </div>
  );
};

export default Dashtw;
