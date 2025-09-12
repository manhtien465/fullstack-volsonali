// app/api/proxy/route.ts

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing "url" query parameter.', { status: 400 });
  }

  try {
    // gd_sdk_referrer_url=https://html5funzone.com/blog/h5-game/fireboy-and-watergirl-4-crystal-temple
    const response = await fetch(`${targetUrl}`);
    let html = await response.text();
    // console.log('html',html)
    // Remove the "blocked" script that prevents iframe embedding
    html = html.replace(
      /<script[^>]*src="https:\/\/html5\.api\.gamedistribution\.com\/blocked\.min\.js"[^>]*><\/script>/gi,
      ''
    );
    html.replace(/gd_sdk_referrer_url=[^&'"]+/g, '');
    html = html.replace(/<div[^>]*class="gdsdk-blocked__"[^>]*>[\s\S]*?<\/div>/gi, '');

    // Optional: Remove or hide the fallback div that appears when blocked
    html = html.replace(
      /<div[^>]+id="gdsdk-blocked__"[^>]*>[\s\S]*?<\/div>/gi,
      ''
    );

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response('Failed to load target URL.', { status: 500 });
  }
}
