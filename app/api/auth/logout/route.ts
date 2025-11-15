import { NextResponse } from 'next/server'
import { clearUserCookie } from '@/src/lib/auth'

export async function POST(){
  clearUserCookie()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
}
