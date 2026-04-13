import { NextResponse } from 'next/server'
import { terminals } from '@/lib/data'

export async function GET() {
  return NextResponse.json({ data: terminals })
}
