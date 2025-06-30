// app/api/photos/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const cursor = searchParams.get("cursor") ?? undefined;

  const folder = searchParams.get("folder");

  if (!folder) {
    return NextResponse.json({ error: "Missing folder" }, { status: 400 });
  }

  const result = await cloudinary.search
    .expression(`resource_type:image AND folder=${folder}`)
    .sort_by("created_at", "desc")
    .next_cursor(cursor)
    .execute();

  return NextResponse.json(result.resources);
}
