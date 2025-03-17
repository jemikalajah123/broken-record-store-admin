import { NextResponse } from "next/server";

const records = [
  { id: 1, name: "Tech Book", format: "pdf", category: "tech" },
  { id: 2, name: "Business Video", format: "video", category: "business" },
  { id: 3, name: "Education Audio", format: "audio", category: "education" },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 5;
  const search = searchParams.get("search") || "";
  const format = searchParams.get("format") || "";
  const category = searchParams.get("category") || "";

  const filteredRecords = records
    .filter(
      (r) =>
        (!search || r.name.toLowerCase().includes(search.toLowerCase())) &&
        (!format || r.format === format) &&
        (!category || r.category === category)
    )
    .slice(0, limit);

  return NextResponse.json(filteredRecords);
}
