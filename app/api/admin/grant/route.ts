import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdmin } from '@/src/lib/auth'
import { getUserByEmail, recordPayment, setPremiumMonths } from '@/src/lib/store'

const schema = z.object({ email: z.string().email(), months: z.number().int().positive().optional() })

export async function POST(req: Request){
  if(!isAdmin()){
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try{
    const body = await req.json()
    const { email, months = 1 } = schema.parse(body)
    setPremiumMonths(email, months)
    const u = getUserByEmail(email)
    if(u){
      recordPayment(u.id, 0, 'admin')
    }
    return NextResponse.json({ ok: true })
  }catch(err:any){
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
}
