// app/api/js/route.ts
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const CACHE_KEY = 'js_data';
const CACHE_DURATION = 24 * 60 * 60 * 10; // 10 days in seconds

const url = process.env.API_URL || 'https://bsz.iirose.cn';

export async function GET() {
    // 尝试从 KV 中获取缓存的数据
    const cachedData = await kv.get(CACHE_KEY);

    // 返回 javascript
    if (cachedData) return new Response(cachedData as BodyInit, { headers: { 'Content-Type': 'text/javascript; charset=utf-8', "cache": "true" } });

    try {
        const response = await fetch(`${url}/js`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.text();

        // 将获取的数据存储到 Vercel KV 中，并设置过期时间
        await kv.set(CACHE_KEY, data, { ex: CACHE_DURATION });

        return new Response(data, { headers: { 'Content-Type': 'text/javascript; charset=utf-8', "cache": "false" } });

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
