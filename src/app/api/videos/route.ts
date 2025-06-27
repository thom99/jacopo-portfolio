import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; // la tua istanza configurata

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const cursor = searchParams.get("cursor") ?? undefined;

  //   const maxResults = searchParams.get("maxResults") ?? "30";

  const result = await cloudinary.search
    .expression("resource_type:video AND folder:jacopo-portfolio-videos")
    .sort_by("created_at", "desc")
    // .max_results(Number(maxResults))
    .next_cursor(cursor)
    .execute();

  return NextResponse.json(result.resources);
}
