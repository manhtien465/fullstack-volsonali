import fs from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category')
  const name = req.nextUrl.searchParams.get('name')
  const year = req.nextUrl.searchParams.get('year')

  // Validate query params
  if (!category || !name ||  !year) {
    return NextResponse.json({ error: 'Missing category or name' }, { status: 400 })
  }

  // Sanitize input to avoid path traversal
  const safeCategory = path.basename(category)
  const safeName = path.basename(name)
 const safeYear = path.basename(year)
  const filePath = path.join(process.cwd(), 'public', safeCategory, safeName,'gamingfun.net','code',safeYear,safeName,'game', 'index.html')

  try {
    const html = await fs.readFile(filePath, 'utf-8')

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store',
      },
    });

  } catch (err) {
    console.error('Error reading file:', err)
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }
}
