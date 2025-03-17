"use client";

import { useState } from "react";

export default function AddRecordModal({ isOpen, onClose, onAddRecord }: { isOpen: boolean, onClose: () => void, onAddRecord: (record: any) => void }) {
  const [formData, setFormData] = useState({
    artist: "",
    album: "",
    price: "",
    qty: "",
    format: "",
    category: "",
    mbid: "",
  });

  const formats = ["Vinyl", "CD", "Cassette", "Digital"];
  const categories = ["Rock", "Jazz", "Hip-Hop", "Classical", "Pop", "Alternative", "Indie"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      ...formData,
      price: Number(formData.price),
      qty: Number(formData.qty),
    };

    try {
      const response = await fetch("http://localhost:3000/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) throw new Error("Failed to add record");

      onAddRecord(newRecord);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error adding record");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="artist" 
            value={formData.artist} 
            onChange={handleChange} 
            placeholder="Artist" 
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-3 w-full text-gray-700 shadow-sm" 
            required 
          />
          <input 
            type="text" 
            name="album" 
            value={formData.album} 
            onChange={handleChange} 
            placeholder="Album" 
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-3 w-full text-gray-700 shadow-sm" 
            required 
          />
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            placeholder="Price" 
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-3 w-full text-gray-700 shadow-sm" 
            required 
          />
          <input 
            type="number" 
            name="qty" 
            value={formData.qty} 
            onChange={handleChange} 
            placeholder="Quantity" 
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-3 w-full text-gray-700 shadow-sm" 
            required 
          />
          <select 
            name="format" 
            value={formData.format} 
            onChange={handleChange} 
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-3 w-full text-gray-700 shadow-sm" 
            required
          >
            <option value="">Select Format</option>
            {formats.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-3 w-full text-gray-700 shadow-sm" 
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input 
            type="text" 
            name="mbid" 
            value={formData.mbid} 
            onChange={handleChange} 
            placeholder="MBID (optional)" 
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-md p-3 w-full text-gray-700 shadow-sm" 
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">Add Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}
