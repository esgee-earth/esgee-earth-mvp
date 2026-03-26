"use client";

import "@/lib/amplifyClient";

import { useState, useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

import {
  addElectricityRecord,
  fetchElectricityRecords,
  removeElectricityRecord,
} from "@/lib/api";

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
  const [kwh, setKwh] = useState("");

  const [records, setRecords] = useState<any[]>([]);

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const years = Array.from({ length: 15 }, (_, i) => 2015 + i);

  // LOAD FROM DB
  const loadData = async () => {
    const data = await fetchElectricityRecords();
    setRecords(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ADD
  const addRecord = async () => {
    if (!kwh || !provider || !year || !month) return;

    const factor = emissionFactors[provider];
    const emissionsKg = Number(kwh) * factor;

    await addElectricityRecord({
      year,
      month,
      kwh: Number(kwh),
      emissionsT: emissionsKg / 1000,
      provider,
    });

    setKwh("");
    loadData();
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this record?")) return;

    await removeElectricityRecord(id);
    loadData();
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6]">

      {/* Navbar */}
      <div className="border-b bg-white px-6 py-3 flex justify-between">
        <div className="text-[#1f7a63] font-medium">ESGee Earth</div>
        <div className="text-sm text-[#1f7a63] border px-3 py-1 rounded-full">
          App (beta)
        </div>
      </div>

      <div className="flex justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">

          {/* ENTRY */}
          <div className="bg-white rounded-xl border p-6 space-y-4">

            <select
              className="w-full p-3 border rounded-lg text-sm"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="">Select provider</option>
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
              <div className="grid grid-cols-4 gap-2">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      setYear(y);
                      setShowYearPicker(false);
                    }}
                    className="p-2 bg-gray-100 rounded"
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}

            {showMonthPicker && (
              <div className="grid grid-cols-3 gap-2">
                {months.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMonth(m);
                      setShowMonthPicker(false);
                    }}
                    className="p-2 bg-gray-100 rounded"
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}

            <input
              type="number"
              placeholder="Enter electricity (kWh)"
              className="w-full p-3 border rounded-lg"
              value={kwh}
              onChange={(e) => setKwh(e.target.value)}
            />

            <button
              onClick={addRecord}
              className="w-full py-3 bg-[#1f7a63] text-white rounded-lg"
            >
              Add record
            </button>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl border p-6">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b">
                <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>kWh</th>
                  <th>tCO₂e</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td>{r.year}</td>
                    <td>{r.month}</td>
                    <td>{r.kwh}</td>
                    <td>{r.emissionsT}</td>
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
          </div>

        </div>
      </div>
    </main>
  );
}

export default withAuthenticator(Home);
