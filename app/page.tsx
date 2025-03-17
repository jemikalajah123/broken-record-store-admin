"use client";

import { useState } from "react";
import FilterBar from "./components/FilterBar";
import RecordList from "./components/RecordList";

export default function AdminPage() {
  const [filters, setFilters] = useState({
    q: "",
    limit: 5,
    format: "",
    category: "",
    artist: "",
    album: "",
    sortBy: "name",
    sortOrder: "asc",
    page: 1
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <FilterBar setFilters={setFilters} />
      <RecordList filters={filters} />
    </div>
  );
}
