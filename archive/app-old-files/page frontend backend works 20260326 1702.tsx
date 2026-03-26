"use client";

import { useState, useEffect } from "react";
import "../lib/amplifyClient";

import {
  Authenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import * as XLSX from "xlsx";

import {
  addElectricityRecord,
  fetchElectricityRecords,
  deleteElectricityRecord,
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

function Home() {

  const [provider, setProvider] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState("");

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [kwh, setKwh] = useState("");
  const [receipt, setReceipt] = useState<string | null>(null);

  const [electricityRecords, setElectricityRecords] = useState<any[]>([]);

  const years = Array.from({ length: 15 }, (_, i) => 2015 + i);

  // 🔥 LOAD DATA
  const loadData = async () => {
    try {
      const data = await fetchElectricityRecords();
      setElectricityRecords(data || []);
    } catch (err) {
      console.error("Error loading data:", JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setReceipt(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      await deleteElectricityRecord(id);
      await loadData();
    } catch (err) {
      console.error("FULL ERROR:", JSON.stringify(err, null, 2));
      console.error("GraphQL errors:", err?.errors);
      console.error("Message:", err?.message);
    }
  };

  const addElectricity = async () => {
    if (!kwh || !provider || !year || !month) return;

    console.log("FORM DATA BEFORE SUBMIT:", {
      provider,
      month,
      year,
      kwh,
    });

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
      console.error("Error adding record:", err);
    }
  };

  const generateFileId = () => {
    const now = new Date();

    const datePart = `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

    const counter = String(electricityRecords.length + 1).padStart(5, "0");

    return `esgee-elec-${datePart}-${counter}`;
  };

  const exportExcel = () => {

    const fileId = generateFileId();

    const dataSheet = electricityRecords.map((r) => ({
      Year: r.year,
      Month: r.month,
      "Electricity usage (kWh)": r.kwh,
      "Emissions (tCO2e)": r.emissionsT,
    }));

    const metadataSheet = [
      { Key: "File ID", Value: fileId },
      { Key: "Data Type", Value: "electricity" },
      { Key: "Provider", Value: provider || "N/A" },
      {
        Key: "Emission Factor",
        Value: provider ? emissionFactors[provider] : "N/A",
      },
      { Key: "Generated At", Value: new Date().toISOString() },
      { Key: "Total Records", Value: electricityRecords.length },
    ];

    const ws1 = XLSX.utils.json_to_sheet(dataSheet);
    const ws2 = XLSX.utils.json_to_sheet(metadataSheet);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Data");
    XLSX.utils.book_append_sheet(wb, ws2, "Metadata");

    XLSX.writeFile(wb, `${fileId}.xlsx`);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6]">

      {/* Navbar */}
      <div className="border-b bg-white px-6 py-3 flex justify-between">
        <a href="https://esgee.earth" className="text-[#1f7a63] font-medium">
          ESGee Earth
        </a>
        <div className="text-sm text-[#1f7a63] border px-3 py-1 rounded-full">
          App (beta)
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

              <div className="p-6 space-y-5">

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

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowYearPicker(!showYearPicker)}
                    className="p-3 border rounded-lg text-left text-sm"
                  >
                    {year || "Select year"}
                  </button>

                  <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    className="p-3 border rounded-lg text-left text-sm"
                  >
                    {month || "Select month"}
                  </button>
                </div>

                {showYearPicker && (
                  <div className="grid grid-cols-4 gap-2 border p-3 rounded-lg">
                    {years.map((y) => (
                      <button
                        key={y}
                        onClick={() => {
                          setYear(y);
                          setShowYearPicker(false);
                        }}
                        className="p-2 bg-gray-100 rounded text-sm"
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}

                {showMonthPicker && (
                  <div className="grid grid-cols-3 gap-2 border p-3 rounded-lg">
                    {months.map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setMonth(m);
                          setShowMonthPicker(false);
                        }}
                        className="p-2 bg-gray-100 rounded text-sm"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}

                <input
                  type="number"
                  placeholder="Enter electricity usage (kWh)"
                  className="w-full p-3 border rounded-lg text-sm"
                  value={kwh}
                  onChange={(e) => setKwh(e.target.value)}
                />

                <button
                  onClick={addElectricity}
                  className="w-full py-3 bg-[#1f7a63] text-white rounded-lg"
                >
                  Add record
                </button>

              </div>
            </div>
          </div>

          {/* VIEW DATA */}
          <div className="bg-white rounded-xl border p-6">

            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b">
                <tr>
                  <th className="text-left py-2">Year</th>
                  <th className="text-left">Month</th>
                  <th className="text-center">kWh</th>
                  <th className="text-center">tCO₂e</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {electricityRecords.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="py-2">{r.year}</td>
                    <td>{r.month}</td>
                    <td className="text-center">{r.kwh}</td>
                    <td className="text-center">{r.emissionsT}</td>
                    <td className="text-center">
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

            {electricityRecords.length > 0 && (
              <button
                onClick={exportExcel}
                className="w-full mt-4 py-3 bg-[#1f7a63] text-white rounded-lg"
              >
                Download Excel
              </button>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}

// ✅ AUTH WRAPPER (THIS FIXES YOUR ISSUE)
export default function Page() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <button onClick={signOut}>Sign out</button>
          <Home />
        </>
      )}
    </Authenticator>
  );
}
