import { NextResponse } from 'next/server'
import { getAuthUser } from '@/src/lib/auth'
import { isPremiumActive } from '@/src/lib/store'

export async function GET(){
  const user = getAuthUser()
  if(!user){
    return NextResponse.json({ user: null })
  }
  return NextResponse.json({ user: { email: user.email, trialExpiresAt: user.trialExpiresAt, premiumExpiresAt: user.premiumExpiresAt || null, access: isPremiumActive(user) } })
}
