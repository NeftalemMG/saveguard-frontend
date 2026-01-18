import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const SEED_SUBSCRIPTIONS = [
  { merchant: 'Netflix Canada', amount: 20.99, frequency: 'monthly', category: 'Entertainment', usage_score: 15 },
  { merchant: 'Spotify Premium', amount: 10.99, frequency: 'monthly', category: 'Entertainment', usage_score: 85 },
  { merchant: 'Disney+ Canada', amount: 11.99, frequency: 'monthly', category: 'Entertainment', usage_score: 25 },
  { merchant: 'Amazon Prime CA', amount: 9.99, frequency: 'monthly', category: 'Shopping', usage_score: 70 },
  { merchant: 'GoodLife Fitness', amount: 64.99, frequency: 'monthly', category: 'Health', usage_score: 10 },
  { merchant: 'Adobe Creative Cloud', amount: 29.99, frequency: 'monthly', category: 'Software', usage_score: 90 },
  { merchant: 'Apple iCloud+', amount: 3.99, frequency: 'monthly', category: 'Storage', usage_score: 40 },
  { merchant: 'YouTube Premium', amount: 13.99, frequency: 'monthly', category: 'Entertainment', usage_score: 5 },
  { merchant: 'LinkedIn Premium', amount: 39.99, frequency: 'monthly', category: 'Professional', usage_score: 20 },
  { merchant: 'HelloFresh Canada', amount: 89.99, frequency: 'weekly', category: 'Food', usage_score: 60 },
  { merchant: 'Rogers Internet', amount: 79.99, frequency: 'monthly', category: 'Telecom', usage_score: 100 },
  { merchant: 'Bell Mobility', amount: 85.00, frequency: 'monthly', category: 'Telecom', usage_score: 100 },
  { merchant: 'Peloton Membership', amount: 49.99, frequency: 'monthly', category: 'Health', usage_score: 8 },
  { merchant: 'Audible Canada', amount: 14.95, frequency: 'monthly', category: 'Entertainment', usage_score: 35 },
  { merchant: 'Nintendo Switch Online', amount: 4.99, frequency: 'monthly', category: 'Gaming', usage_score: 45 },
]

export async function POST() {
  try {
    // First, create or get demo user with proper UUID
    const demoEmail = 'demo@saveguard.ca'
    
    // Check if demo user exists
    let { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', demoEmail)
      .single()

    let userId: string

    if (existingUser) {
      userId = existingUser.id
      console.log('Using existing demo user:', userId)
    } else {
      // Create new demo user
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: demoEmail,
          name: 'Demo User',
        })
        .select('id')
        .single()

      if (userError) throw userError
      userId = newUser.id
      console.log('Created new demo user:', userId)
    }

    // Delete existing subscriptions for this user
    await supabase
      .from('subscriptions')
      .delete()
      .eq('user_id', userId)

    // Insert seed data
    const now = new Date()
    const subscriptions = SEED_SUBSCRIPTIONS.map(sub => {
      const lastCharge = new Date(now)
      lastCharge.setDate(lastCharge.getDate() - Math.floor(Math.random() * 30))
      
      const nextCharge = new Date(lastCharge)
      if (sub.frequency === 'monthly') {
        nextCharge.setMonth(nextCharge.getMonth() + 1)
      } else if (sub.frequency === 'weekly') {
        nextCharge.setDate(nextCharge.getDate() + 7)
      }

      return {
        user_id: userId,
        merchant: sub.merchant,
        amount: sub.amount,
        frequency: sub.frequency,
        category: sub.category,
        usage_score: sub.usage_score,
        last_charge: lastCharge.toISOString(),
        next_charge: nextCharge.toISOString(),
        status: 'active',
      }
    })

    const { data, error } = await supabase
      .from('subscriptions')
      .insert(subscriptions)
      .select()

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      count: data.length,
      user_id: userId,
      message: 'Seed data created successfully'
    })
  } catch (error: any) {
    console.error('Seed data error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}