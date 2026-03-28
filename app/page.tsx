"use client";

import { useState, useEffect } from "react";
import "../lib/amplifyClient";

import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { uploadData, getUrl } from "aws-amplify/storage";

import * as XLSX from "xlsx";

import {
  addElectricityRecord,
  fetchElectricityRecords,
  deleteElectricityRecord,
  addWaterRecord,
  fetchWaterRecords,
  deleteWaterRecord,
} from "../lib/api";

const theme = {
  name: "esgee-theme",
  tokens: {
    colors: {
      brand: {
        primary: {
          10: "#edf7f3",
          20: "#d6efe8",
          40: "#9ed9c8",
          60: "#5bbfa3",
          80: "#1f7a63", // main green
          100: "#145c4a", // darker green
        },
      },

      font: {
        primary: "#145c4a",
        secondary: "#4b5563",
      },

      background: {
        primary: "#ffffff",
        secondary: "#f5f7f6",
      },

      border: {
        primary: "#d1d5db",
        secondary: "#e5e7eb",
      },

      focus: {
        value: "#1f7a63", // 🔥 removes blue focus ring
      },
    },

    components: {
      button: {
        primary: {
          backgroundColor: "#1f7a63",
          color: "#ffffff",
          _hover: {
            backgroundColor: "#145c4a",
          },
        },
      },

      tabs: {
        item: {
          _active: {
            color: "#1f7a63",
            borderColor: "#1f7a63",
          },
        },
      },

      fieldcontrol: {
        _focus: {
          borderColor: "#1f7a63",
        },
      },
    },

    radii: {
      small: "10px",
      medium: "14px",
      large: "18px",
    },
  },
};

const emissionFactors: Record<string, number> = {
  TNB: 0.774,
  SESB: 0.525,
  "Sarawak Energy": 0.199,
  "NUR Power": 0.54,
};

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

type Tab = "electricity" | "water" | "fuel";

function Home({ user, signOut }: any) {

  const [activeTab, setActiveTab] = useState<Tab>("electricity");

  const [provider, setProvider] = useState("");
  const [waterProvider, setWaterProvider] = useState("");

  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState("");

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [kwh, setKwh] = useState("");
  const [waterUsage, setWaterUsage] = useState("");

  const [electricityFile, setElectricityFile] = useState<File | null>(null);
  const [waterFile, setWaterFile] = useState<File | null>(null);

  const [electricityRecords, setElectricityRecords] = useState<any[]>([]);
  const [waterRecords, setWaterRecords] = useState<any[]>([]);

  const [showDropdown, setShowDropdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // PAGINATION STATE
  const rowsPerPage = 10;

  const years = Array.from({ length: 16 }, (_, i) => 2015 + i);

  const userEmail =
    user?.signInDetails?.loginId ||
    user?.attributes?.email ||
    "User";

  // ========================
  // LOAD DATA
  // ========================
  const loadData = async () => {
    try {
      const e = await fetchElectricityRecords();
      const w = await fetchWaterRecords();

      setElectricityRecords(e || []);
      setWaterRecords(w || []);
    } catch (err) {
      console.error("LOAD ERROR:", JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ RESET PAGE WHEN SWITCH TAB
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // ========================
  // FILE
  // ========================
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    if (activeTab === "electricity") {
      setElectricityFile(file);
    } else if (activeTab === "water") {
      setWaterFile(file);
    }
  };

  // ========================
  // DELETE
  // ========================
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      if (activeTab === "electricity") {
        await deleteElectricityRecord(id);
      } else if (activeTab === "water") {
        await deleteWaterRecord(id);
      }

      await loadData();
    } catch (err) {
      console.error("DELETE ERROR:", JSON.stringify(err, null, 2));
    }
  };

  // ========================
  // VIEW FILE
  // ========================
  const handleViewFile = async (key: string) => {
    try {
      const res = await getUrl({
        key,
        options: { expiresIn: 60 }, // 1 min access
      });

      window.open(res.url.toString(), "_blank");
    } catch (err) {
      console.error("VIEW FILE ERROR:", err);
    }
  };

  // ========================
  // ADD ELECTRICITY
  // ========================
  const addElectricity = async () => {
    console.log("addElectricity triggered");

    if (!kwh || !provider || !year || !month) return;

    const factor = emissionFactors[provider];
    const emissionsT = (Number(kwh) / 1000) * factor;

    try {
      let fileKey = "";
      let uploadedAt = null;

      // 🔥 Upload file if exists
      if (electricityFile) {
        const fileExt = electricityFile.name.split(".").pop();

        const safeUser = userEmail.replace(/[^a-zA-Z0-9]/g, "_");

        const timestamp = Date.now();
        const isoDate = new Date().toISOString().split("T")[0];

        const key = `evidence/${safeUser}/electricity/${year}/${month}/${isoDate}-${timestamp}.${fileExt}`;

        await uploadData({
          key,
          data: electricityFile,
        });

        fileKey = key;
        uploadedAt = new Date().toISOString();
      }

      await addElectricityRecord({
        year,
        month,
        kwh: Number(kwh),
        emissionsT,
        provider,
        receiptKey: fileKey || null,
        receiptUploadedAt: uploadedAt,
      });

      // Reset
      setKwh("");
      setElectricityFile(null);

      await loadData();

    } catch (err) {
      console.error("ADD ELECTRICITY ERROR:", err);
    }
  };

  // ========================
  // ADD WATER
  // ========================
  console.log("WATER CLICK", {
    waterUsage,
    year,
    month
  });

  const addWater = async () => {
    if (!waterUsage || !year || !month) return;

    try {
      let fileKey = "";
      let uploadedAt = null;

      // 🔥 Upload file if exists
      if (waterFile) {
        const fileExt = waterFile.name.split(".").pop();

        const safeUser = userEmail.replace(/[^a-zA-Z0-9]/g, "_");

        const timestamp = Date.now();
        const isoDate = new Date().toISOString().split("T")[0];

        const key = `evidence/${safeUser}/water/${year}/${month}/${isoDate}-${timestamp}.${fileExt}`;

        await uploadData({
          key,
          data: waterFile,
        });

        fileKey = key;
        uploadedAt = new Date().toISOString();
      }

      await addWaterRecord({
        year,
        month,
        volume: Number(waterUsage),
        provider: waterProvider || "N/A",
        receiptKey: fileKey || null,
        receiptUploadedAt: uploadedAt,
      });

      // Reset
      setWaterUsage("");
      setWaterFile(null);

      await loadData();

    } catch (err) {
      console.error("ADD WATER ERROR:", err);
    }
  };

  // ========================
  // PAGINATION LOGIC
  // ========================
  const monthIndex = (m: string) =>
    months.indexOf(m); // uses your existing months array

  const sortedElectricity = [...electricityRecords].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return monthIndex(a.month) - monthIndex(b.month);
  });

  const paginatedElectricity = sortedElectricity.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const sortedWater = [...waterRecords].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return monthIndex(a.month) - monthIndex(b.month);
  });

  const paginatedWater = sortedWater.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  // ========================
  // EXPORT
  // ========================
  const generateFileId = () => {
    const now = new Date();

    const datePart = `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

    const count =
      activeTab === "electricity"
        ? electricityRecords.length + 1
        : waterRecords.length + 1;

    const prefix = activeTab === "electricity" ? "esgee-electricity" : "esgee-water";

    return `${prefix}-${datePart}-${String(count).padStart(5, "0")}`;
  };

  const exportExcel = () => {
    const fileId = generateFileId();

    const isElectricity = activeTab === "electricity";

    const attachmentCount = isElectricity
      ? electricityRecords.filter((r) => r.receiptKey).length
      : waterRecords.filter((r) => r.receiptKey).length;

    const dataSheet = isElectricity
      ? electricityRecords.map((r) => ({
          Year: r.year,
          Month: r.month,
          "Electricity usage (kWh)": r.kwh,
          "Emissions (tCO2e)": r.emissionsT,
          "Provider": r.provider,
          "Emission Factor (tCO2e/MWh)": emissionFactors[r.provider] ?? "",
          "Attachment Included": r.receiptKey ? "Yes" : "No",
          "Recorded At (Local)": r.createdAt
            ? new Date(r.createdAt).toLocaleString()
            : "",
          "Recorded At (UTC)": r.createdAt
            ? new Date(r.createdAt).toISOString()
              : "",
        }))
      : waterRecords.map((r) => ({
          Year: r.year,
          Month: r.month,
          "Water (m³)": r.volume,
          "Attachment Included": r.receiptKey ? "Yes" : "No",
          "Recorded At (Local)": r.createdAt
            ? new Date(r.createdAt).toLocaleString()
            : "",
          "Recorded At (UTC)": r.createdAt
            ? new Date(r.createdAt).toISOString()
              : "",
        }));

    const metadataSheet = [
      { Key: "File ID", Value: fileId },
      { Key: "Data Type", Value: activeTab },
      { Key: "Generated At", Value: new Date().toISOString() },
      {
        Key: "Total Records",
        Value: isElectricity
          ? electricityRecords.length
          : waterRecords.length,
      },
      {
        Key: "Attachments Included",
        Value: attachmentCount,
      },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dataSheet), "Data");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(metadataSheet), "Metadata");

    XLSX.writeFile(wb, `${fileId}.xlsx`);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6]">

    {/* Navbar */}
    <div className="border-b bg-white/60 backdrop-blur-lg px-4 sm:px-6 py-3">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">

          {/* Brand */}
          <a
            href="https://esgee.earth"
            className="text-[#145c4a] font-medium text-sm sm:text-xl whitespace-nowrap"
          >
            ESGee Earth
          </a>

          {/* Tracker + mobile email row */}
          <div className="flex justify-between items-center w-full sm:w-auto sm:gap-3">

            <div className="text-[10px] sm:text-xs tracking-[0.2em] px-4 py-1.5 rounded-full
              border border-[#145c4a]/20
              bg-[#1f7a63]/10
              backdrop-blur-md
              text-[#145c4a]
              whitespace-nowrap
              shadow-sm">
              ENVIRONMENTAL TRACKER (DEMO)
            </div>

            {/* Mobile email */}
            <div className="relative sm:hidden max-w-[150px] min-w-0">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-xs text-[#145c4a] border border-[#145c4a]/30 px-3 py-1.5 rounded-full flex items-center gap-2 truncate w-full"
              >
                <span className="truncate">{userEmail}</span>
                <span className="text-xs">▾</span>
              </button>
            </div>

          </div>
        </div>

        {/* Desktop email */}
        <div className="relative hidden sm:block max-w-[220px] min-w-0">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-sm text-[#145c4a] border border-[#145c4a]/30 px-3 py-1.5 rounded-full flex items-center gap-2 truncate"
          >
            <span className="truncate">{userEmail}</span>
            <span className="text-xs">▾</span>
          </button>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-4 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-md z-50">
            <button
              onClick={signOut}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        )}

      </div>
    </div>

      <div className="flex justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">

          {/* ENTER DATA */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-[#1f7a63]">
              Enter data
            </h2>

            <div className="bg-white rounded-xl border overflow-hidden">

              <div className="flex border-b bg-gray-50">
                {["electricity","water","fuel"].map((tab) => {
                  const label =
                    tab === "fuel"
                      ? "Fuel (coming soon)"
                      : tab.charAt(0).toUpperCase() + tab.slice(1);

                  return (
                    <button
                      key={tab}
                      onClick={() => tab !== "fuel" && setActiveTab(tab as Tab)}
                      className={`flex-1 py-3 text-sm ${
                        activeTab === tab
                          ? "bg-[#edf7f3] text-[#1f7a63] font-semibold"
                          : "text-gray-600"
                      } ${tab === "fuel" && "cursor-not-allowed text-gray-400"}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6 space-y-5">

                {activeTab === "electricity" ? (
                  <select
                    className={`w-full p-3 border rounded-lg text-sm ${
                      provider ? "text-black" : "text-gray-500"
                    }`}
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  >
                    <option value="">Select electricity provider</option>
                    {Object.keys(emissionFactors).map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                ) : (
                  activeTab === "water" && (
                    <input
                      type="text"
                      placeholder="Water provider (optional)"
                      className="w-full p-3 border rounded-lg text-sm placeholder:text-gray-500"
                      value={waterProvider}
                      onChange={(e) => setWaterProvider(e.target.value)}
                    />
                  )
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setShowYearPicker(!showYearPicker)} className="p-3 border rounded-lg text-sm">
                    {year || "Select year"}
                  </button>

                  <button onClick={() => setShowMonthPicker(!showMonthPicker)} className="p-3 border rounded-lg text-sm">
                    {month || "Select month"}
                  </button>
                </div>

                {showYearPicker && (
                  <div className="grid grid-cols-4 gap-2 border p-3 rounded-lg">
                    {years.map((y) => (
                      <button key={y} onClick={() => { setYear(y); setShowYearPicker(false); }} className="p-2 bg-gray-100 rounded text-sm">
                        {y}
                      </button>
                    ))}
                  </div>
                )}

                {showMonthPicker && (
                  <div className="grid grid-cols-3 gap-2 border p-3 rounded-lg">
                    {months.map((m) => (
                      <button key={m} onClick={() => { setMonth(m); setShowMonthPicker(false); }} className="p-2 bg-gray-100 rounded text-sm">
                        {m}
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === "electricity" ? (
                  <>
                    <input type="number"
                    placeholder={
                        year && month
                          ? `Electricity usage (kWh) · ${month} ${year}`
                          : "Electricity usage (kWh)"
                      }
                      className="w-full p-3 border rounded-lg text-sm placeholder:text-gray-500"
                      value={kwh} onChange={(e) => setKwh(e.target.value)} />

                    <div className="border border-dashed rounded-lg p-4 text-center text-sm text-gray-500">
                      <label
                        htmlFor="electricity-upload"
                        className="cursor-pointer text-[#1f7a63] block w-full"
                      >
                        {electricityFile ? electricityFile.name : "Upload electricity bill (PDF or image)"}
                      </label>

                      <input
                        id="electricity-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setElectricityFile(file);
                            e.target.value = ""; // 🔥 reset input
                          }
                        }}
                        className="hidden"
                      />
                    </div>

                    <button onClick={addElectricity} className="w-full py-3 bg-[#1f7a63] text-white rounded-lg">
                      Add record
                    </button>
                  </>
                ) : activeTab === "water" ? (
                  <>
                    <input type="number"
                    placeholder={
                      year && month
                        ? `Water usage (m³) · ${month} ${year}`
                        : "Water usage (m³)"
                    }
                    className="w-full p-3 border rounded-lg text-sm placeholder:text-gray-500"
                      value={waterUsage} onChange={(e) => setWaterUsage(e.target.value)} />

                    <div className="border border-dashed rounded-lg p-4 text-center text-sm text-gray-500">
                      <label
                        htmlFor="water-upload"
                        className="cursor-pointer text-[#1f7a63] block w-full"
                      >
                        {waterFile ? waterFile.name : "Upload water bill (PDF or image)"}
                      </label>

                      <input
                        id="water-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setWaterFile(file);
                            e.target.value = ""; // 🔥 reset input
                          }
                        }}
                        className="hidden"
                      />
                    </div>

                    <button onClick={addWater} className="w-full py-3 bg-[#1f7a63] text-white rounded-lg">
                      Add record
                    </button>
                  </>
                ) : (
                  <div className="text-gray-400 text-center py-6">
                    Fuel tracking coming soon
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* VIEW DATA */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-[#1f7a63]">
              View data
            </h2>

            <div className="bg-white rounded-xl border p-6">

              <div className="mb-4 text-sm tracking-wide text-[#1f7a63] font-semibold uppercase">
              {activeTab === "electricity"
                ? `Electricity · Total records: ${electricityRecords.length}`
                : activeTab === "water"
                ? `Water · Total records: ${waterRecords.length}`
                : ""}
              </div>

              {activeTab === "electricity" && (
                <>
                  {electricityRecords.length === 0 ? (
                    <div className="text-center text-gray-400 py-6">
                      No electricity records yet
                    </div>
                  ) : (
                    <>
                      <table className="w-full text-sm text-center">
                        <thead className="text-gray-400 border-b">
                          <tr>
                            <th className="py-2">Year</th>
                            <th>Month</th>
                            <th>Usage (kWh)</th>
                            <th>Emissions (tCO₂e)</th>
                            <th>Evidence</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {paginatedElectricity.map((r) => (
                            <tr key={r.id} className="border-b hover:bg-gray-50">
                              <td className="py-2">{r.year}</td>
                              <td>{r.month}</td>
                              <td>{r.kwh}</td>
                              <td>{Number(r.emissionsT).toFixed(4)}</td>
                              {/* Evidence-View */}
                              <td>
                                {r.receiptKey ? (
                                  <button
                                    onClick={() => handleViewFile(r.receiptKey)}
                                    className="text-[#1f7a63] hover:underline"
                                  >
                                    View
                                  </button>
                                ) : (
                                  "—"
                                )}
                              </td>
                              {/* Actions-Delete */}
                              <td>
                                <button
                                  onClick={() => handleDelete(r.id)}
                                  className="text-red-500"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-between items-center mt-4 text-sm">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                          Previous
                        </button>

                        <span className="text-gray-500">
                          Page {currentPage} of {Math.ceil(electricityRecords.length / rowsPerPage)} (10 per page)
                        </span>

                        <button
                          onClick={() =>
                            setCurrentPage((p) =>
                              p * rowsPerPage < electricityRecords.length ? p + 1 : p
                            )
                          }
                          disabled={currentPage * rowsPerPage >= electricityRecords.length}
                          className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {activeTab === "water" && (
                <>
                  {waterRecords.length === 0 ? (
                    <div className="text-center text-gray-400 py-6">
                      No water records yet
                    </div>
                  ) : (
                    <>
                      <table className="w-full text-sm text-center">
                        <thead className="text-gray-400 border-b">
                          <tr>
                            <th className="py-2">Year</th>
                            <th>Month</th>
                            <th>Water (m³)</th>
                            <th>Evidence</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {paginatedWater.map((r) => (
                            <tr key={r.id} className="border-b hover:bg-gray-50">
                              <td className="py-2">{r.year}</td>
                              <td>{r.month}</td>
                              <td>{r.volume}</td>
                              {/* Evidence-View */}
                              <td>
                                {r.receiptKey ? (
                                  <button
                                    onClick={() => handleViewFile(r.receiptKey)}
                                    className="text-[#1f7a63] hover:underline"
                                  >
                                    View
                                  </button>
                                ) : (
                                  "—"
                                )}
                              </td>
                              {/* Actions-Delete */}
                              <td>
                                <button
                                  onClick={() => handleDelete(r.id)}
                                  className="text-red-500"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-between items-center mt-4 text-sm">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                          Previous
                        </button>

                        <span className="text-gray-500">
                          Page {currentPage} of {Math.ceil(waterRecords.length / rowsPerPage)} (10 per page)
                        </span>

                        <button
                          onClick={() =>
                            setCurrentPage((p) =>
                              p * rowsPerPage < waterRecords.length ? p + 1 : p
                            )
                          }
                          disabled={currentPage * rowsPerPage >= waterRecords.length}
                          className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {(electricityRecords.length > 0 || waterRecords.length > 0) && (
                <button onClick={exportExcel} className="w-full mt-4 py-3 bg-[#1f7a63] text-white rounded-lg">
                  Download Excel
                </button>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ✅ FOOTER (safely inserted here) */}
      <div className="border-t mt-12 px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-3">

        <div className="text-center md:text-left">
          © 2026 ESGee Earth · ESG for everyone, everywhere; with Earth in mind
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1f7a63]"
          >
            Privacy Policy
          </a>

          <a href="mailto:hello@esgee.earth" className="hover:text-[#1f7a63]">
            hello@esgee.earth
          </a>

          <a
            href="https://www.linkedin.com/company/esgee"
            target="_blank"
            className="hover:text-[#1f7a63]"
          >
            ESGee
          </a>
        </div>

      </div>

    </main>
  );
}

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator
        components={{
          Header() {
            return (
              <div
                    style={{
                      textAlign: "center",
                      marginBottom: 20,
                      marginTop: 40, // 👈 ADD THIS
                    }}
                  >
                <h2 style={{ color: "#145c4a", fontWeight: 600, fontSize: 22 }}>
                  ESGee Earth
                </h2>
                <p style={{ fontSize: 14, color: "#6b7280" }}>
                  Build your ESG records, one step at a time
                </p>
              </div>
            );
          },

          SignIn: {
            Header() {
              return (
                <h3 style={{ textAlign: "center", marginBottom: 10 }}>
                  Welcome back
                </h3>
              );
            },
          },

          SignUp: {
            Header() {
              return (
                <h3 style={{ textAlign: "center", marginBottom: 10 }}>
                  Create your account
                </h3>
              );
            },
          },
        }}
      >
        {({ signOut, user }) => (
          <Home user={user} signOut={signOut} />
        )}
      </Authenticator>
    </ThemeProvider>
  );
}
