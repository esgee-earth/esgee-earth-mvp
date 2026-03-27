"use client";

import { useState, useEffect } from "react";
import "../lib/amplifyClient";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import * as XLSX from "xlsx";

import {
  addElectricityRecord,
  fetchElectricityRecords,
  deleteElectricityRecord,
  addWaterRecord,
  fetchWaterRecords,
  deleteWaterRecord,
} from "../lib/api";

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

  const [receipt, setReceipt] = useState<string | null>(null);

  const [electricityRecords, setElectricityRecords] = useState<any[]>([]);
  const [waterRecords, setWaterRecords] = useState<any[]>([]);

  const [showDropdown, setShowDropdown] = useState(false);

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

  // ========================
  // FILE
  // ========================
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setReceipt(reader.result as string);
    reader.readAsDataURL(file);
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
  // ADD ELECTRICITY
  // ========================
  const addElectricity = async () => {
    if (!kwh || !provider || !year || !month) return;

    const factor = emissionFactors[provider];
    const emissionsKg = Number(kwh) * factor;

    try {
      await addElectricityRecord({
        year,
        month,
        kwh: Number(kwh),
        emissionsT: emissionsKg / 1000,
        provider,
      });

      setKwh("");
      setReceipt(null);

      await loadData();

    } catch (err) {
      console.error("ADD ELECTRICITY ERROR:", err);
    }
  };

  // ========================
  // ADD WATER
  // ========================
  const addWater = async () => {
    if (!waterUsage || !year || !month) return;

    try {
      await addWaterRecord({
        year,
        month,
        volume: Number(waterUsage),
        provider: waterProvider || "N/A",
      });

      setWaterUsage("");

      await loadData();

    } catch (err) {
      console.error("ADD WATER ERROR:", err);
    }
  };

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

    const prefix = activeTab === "electricity" ? "esgee-elec" : "esgee-water";

    return `${prefix}-${datePart}-${String(count).padStart(5, "0")}`;
  };

  const exportExcel = () => {
    const fileId = generateFileId();

    const isElectricity = activeTab === "electricity";

    const dataSheet = isElectricity
      ? electricityRecords.map((r) => ({
          Year: r.year,
          Month: r.month,
          "Electricity (kWh)": r.kwh,
          "Emissions (tCO2e)": r.emissionsT,
        }))
      : waterRecords.map((r) => ({
          Year: r.year,
          Month: r.month,
          "Water (m³)": r.volume,
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
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dataSheet), "Data");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(metadataSheet), "Metadata");

    XLSX.writeFile(wb, `${fileId}.xlsx`);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6]">

    {/* Navbar */}
    <div className="border-b bg-white px-4 sm:px-6 py-3">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">

          {/* Brand */}
          <a
            href="https://esgee.earth"
            className="text-[#145c4a] font-medium text-sm sm:text-base whitespace-nowrap"
          >
            ESGee Earth
          </a>

          {/* Tracker + mobile email row */}
          <div className="flex justify-between items-center w-full sm:w-auto sm:gap-3">

            <div className="text-[10px] sm:text-xs tracking-[0.2em] px-3 py-1.5 rounded-full border border-[#145c4a]/30 bg-[#145c4a]/10 text-[#145c4a] whitespace-nowrap">
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
                    className="w-full p-3 border rounded-lg text-sm"
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
                      className="w-full p-3 border rounded-lg text-sm"
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
                      className="w-full p-3 border rounded-lg text-sm"
                      value={kwh} onChange={(e) => setKwh(e.target.value)} />

                    <div className="border border-dashed rounded-lg p-4 text-center text-sm text-gray-500 cursor-not-allowed">
                      Upload bill (coming soon)
                      <input type="file" onChange={handleFile} className="hidden" disabled />
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
                    className="w-full p-3 border rounded-lg text-sm"
                      value={waterUsage} onChange={(e) => setWaterUsage(e.target.value)} />

                      <div className="border border-dashed rounded-lg p-4 text-center text-sm text-gray-500 cursor-not-allowed">
                        Upload bill (coming soon)
                        <input type="file" onChange={handleFile} className="hidden" disabled />
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

              {activeTab === "electricity" && (
                <>
                  {electricityRecords.length === 0 ? (
                    <div className="text-center text-gray-400 py-6">
                      No electricity records yet
                    </div>
                  ) : (
                    <table className="w-full text-sm text-center">
                      <thead className="text-gray-400 border-b">
                        <tr>
                          <th className="py-2">Year</th>
                          <th>Month</th>
                          <th>Usage (kWh)</th>
                          <th>Emissions (tCO₂e)</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricityRecords.map((r) => (
                          <tr key={r.id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{r.year}</td>
                            <td>{r.month}</td>
                            <td>{r.kwh}</td>
                            <td>{Number(r.emissionsT).toFixed(4)}</td>
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
                    <table className="w-full text-sm text-center">
                      <thead className="text-gray-400 border-b">
                        <tr>
                          <th className="py-2">Year</th>
                          <th>Month</th>
                          <th>Water (m³)</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waterRecords.map((r) => (
                          <tr key={r.id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{r.year}</td>
                            <td>{r.month}</td>
                            <td>{r.volume}</td>
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
    <Authenticator>
      {({ signOut, user }) => (
        <Home user={user} signOut={signOut} />
      )}
    </Authenticator>
  );
}
