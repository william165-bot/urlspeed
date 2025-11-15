import { NextResponse } from 'next/server'
import { isAdmin } from '@/src/lib/auth'
import { listUsers } from '@/src/lib/store'

export async function GET(){
  if(!isAdmin()){
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const users = listUsers()
  return NextResponse.json({ users })
}
