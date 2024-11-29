// app/api/js/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const CACHE_DURATION = 24 * 60 * 60 * 10; // 10 days in seconds

const url = process.env.API_URL || "https://bsz.iirose.cn";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string; file: string } }
) {
  // 尝试从 KV 中获取缓存的数据
  const path = params.path;
  const file = params.file;
  console.log(path, file);
  const CACHE_KEY = `js_data_${path}_${file}`;

  const cachedData = await kv.get(CACHE_KEY);

  // 返回 javascript
  if (cachedData)
    return new Response(cachedData as BodyInit, {
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=2592000",
        "X-Cache": "HIT",
      },
    });

  try {
    const f_url = `${url}/js/${path}/${file}`;
    console.log(f_url);
    const response = await fetch(f_url);
    if (!response.ok) throw new Error("Network response was not ok");

    // check is javascript
    if (
      response.headers.get("Content-Type")?.includes("text/javascript") ===
      false
    ) {
      console.log(response.headers.get("Content-Type"));
      return NextResponse.redirect(new URL("/", req.url));
    }

    const data = await response.text();

    // 将获取的数据存储到 Vercel KV 中，并设置过期时间
    await kv.set(CACHE_KEY, data, { ex: CACHE_DURATION });

    return new Response(data, {
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
