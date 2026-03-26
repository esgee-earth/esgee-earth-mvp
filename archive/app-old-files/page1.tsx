"use client";

import "../lib/amplifyClient"; // ✅ MUST BE FIRST IMPORT

import { useEffect, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { configureAmplify } from "../lib/amplifyClient";

import {
  addElectricityRecord,
  fetchElectricityRecords,
  removeElectricityRecord,
} from "../lib/api";

function Page() {
  const [records, setRecords] = useState<any[]>([]);
  const [kwh, setKwh] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ INITIAL LOAD
  useEffect(() => {
    loadData();
  }, []);

  // 📥 FETCH DATA
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchElectricityRecords();
      setRecords(data || []);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ ADD RECORD
  const handleAdd = async () => {
    if (!kwh) return;

    try {
      setLoading(true);

      await addElectricityRecord({
        year: new Date().getFullYear(),
        month: new Date().toLocaleString("default", { month: "long" }),
        kwh: Number(kwh),
        emissionsT: Number(kwh) * 0.000525, // simple SESB factor (placeholder)
        provider: "SESB",
      });

      setKwh("");
      await loadData();
    } catch (err) {
      console.error("Error adding record:", err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ DELETE RECORD
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this record?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await removeElectricityRecord(id);
      await loadData();
    } catch (err) {
      console.error("Error deleting record:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-black">
      <div className="max-w-xl mx-auto">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-6">
          Electricity Emissions (MVP)
        </h1>

        {/* INPUT */}
        <div className="flex gap-2 mb-6">
          <input
            value={kwh}
            onChange={(e) => setKwh(e.target.value)}
            placeholder="Enter kWh"
            className="flex-1 border rounded px-3 py-2"
          />

          <button
            onClick={handleAdd}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-sm text-gray-500 mb-4">Loading...</p>
        )}

        {/* RECORD LIST */}
        <div className="space-y-3">
          {records.length === 0 && !loading && (
            <p className="text-gray-500">No records yet</p>
          )}

          {records.map((r) => (
            <div
              key={r.id}
              className="flex justify-between items-center bg-white border p-3 rounded"
            >
              <div>
                <p className="font-medium">
                  {r.month} {r.year}
                </p>
                <p className="text-sm text-gray-500">
                  {r.kwh} kWh
                </p>
              </div>

              <button
                onClick={() => handleDelete(r.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default withAuthenticator(Page);
