import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdmin } from '@/src/lib/auth'
import { revokePremium } from '@/src/lib/store'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request){
  if(!isAdmin()){
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try{
    const body = await req.json()
    const { email } = schema.parse(body)
    revokePremium(email)
    return NextResponse.json({ ok: true })
  }catch(err:any){
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
}
