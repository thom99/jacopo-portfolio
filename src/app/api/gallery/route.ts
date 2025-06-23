import { NextRequest,NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const resourceType = searchParams.get('resource_type') ?? 'image';
  const cursor = searchParams.get('cursor') ?? undefined;

  try {
    const result = await cloudinary.search
      .expression(`resource_type:${resourceType}`)
      .sort_by('created_at', 'desc')
      .max_results(30)
      .next_cursor(cursor)
      .execute();

    return NextResponse.json({
        success: true,
        resources: result.resources.map((r: any) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        resource_type: r.resource_type,
      })),
      nextCursor: result.next_cursor ?? null,
    });
  } catch (error: unknown) {
    let message = 'Unknown error';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}