// app/api/js/route.ts
import { NextResponse } from "next/server";

const url = process.env.API_URL || "https://bsz.iirose.cn";

export async function GET() {
  try {
    const response = await fetch(`${url}/js`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.text();

    // check is javascript
    if (
      response.headers.get("Content-Type")?.includes("text/javascript") ===
      false
    ) {
      console.log(response.headers.get("Content-Type"));
      return NextResponse.redirect("/");
    }

    return new Response(data, {
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=2592000",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
