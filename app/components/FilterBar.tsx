"use client";

import { useState } from "react";

export default function FilterBar({ setFilters }: { setFilters: (filters: any) => void }) {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [format, setFormat] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  const handleFilterChange = () => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      q: search,
      limit,
      format,
      category,
      artist,
      album,
      page: 1, // Reset to first page when filters change
    }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Artist..."
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Album..."
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border p-2 rounded">
        {[5, 10, 20, 50].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <select value={format} onChange={(e) => setFormat(e.target.value)} className="border p-2 rounded">
        <option value="">All Formats</option>
        <option value="Vinyl">Vinyl</option>
        <option value="CD">CD</option>
        <option value="Cassette">Cassette</option>
        <option value="Digital">Digital</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
        <option value="">All Categories</option>
        <option value="Rock">Rock</option>
        <option value="Jazz">Jazz</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Classical">Classical</option>
        <option value="Pop">Pop</option>
        <option value="Alternative">Alternative</option>
        <option value="Indie">Indie</option>
      </select>
      <button onClick={handleFilterChange} className="bg-blue-500 text-white p-2 rounded">
        Apply Filters
      </button>
    </div>
  );
}
