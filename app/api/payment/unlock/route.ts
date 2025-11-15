import { NextResponse } from 'next/server'
import { getAuthUser } from '@/src/lib/auth'
import { recordPayment, setPremiumMonths } from '@/src/lib/store'

export async function POST(){
  const user = getAuthUser()
  if(!user){
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }
  setPremiumMonths(user.email, 1)
  recordPayment(user.id, 0, 'flutterwave')
  return NextResponse.json({ ok: true })
}
