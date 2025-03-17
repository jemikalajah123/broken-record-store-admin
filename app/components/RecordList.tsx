"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddRecordModal from "./AddRecordModal";  // Import the modal

export default function RecordList({ filters }: { filters: any }) {
  type RecordType = {
    _id: string; 
    artist: string;
    album: string;
    price: number;
    qty: number;
    format: string;
    category: string;
    mbid?: string;
  };
  

  const [records, setRecords] = useState<RecordType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({ ...filters, page: page.toString() }).toString();
        console.log("Fetching records with params:", params);

        const response = await fetch(`http://localhost:3000/records?${params}`);
        const data = await response.json();
        console.log("API Response:", data);

        if (!response.ok) throw new Error(data.message || "Failed to fetch records");

        setRecords(data.data.records || []);
        setTotalPages(data.data.pagination.totalPages || 1);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching records.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters, page]);

  const handleAddRecord = (newRecord: RecordType) => {
    setRecords((prev) => [{ ...newRecord, _id: newRecord._id || uuidv4() }, ...prev]);
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Records</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">
          + Add Record
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading records...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">No records found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {records.map((record: { _id: string; price: number; artist: string; album: string,  qty: number }) => (
            <div key={record._id} className="p-4 border rounded shadow">
              <p className="text-sm">Artist: {record.artist}</p>
              <p className="text-sm">Album: {record.album}</p>
            </div>
          ))}
        </div>
      )}

      {totalPages && totalPages > 1 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`p-2 rounded ${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`p-2 rounded ${page === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Next
          </button>
        </div>
      )}

      <AddRecordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddRecord={handleAddRecord} />
    </div>
  );
}
