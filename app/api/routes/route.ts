import { NextResponse } from 'next/server'
import { routes } from '@/lib/data'

export async function GET() {
  return NextResponse.json({ data: routes })
}
