import { NextResponse } from 'next/server'
import { schedules } from '@/lib/data'

export async function GET() {
  return NextResponse.json({ data: schedules })
}
