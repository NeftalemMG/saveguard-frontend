import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    console.log('Fetching subscriptions for user:', user_id)

    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id)
      .order('amount', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Found subscriptions:', subscriptions?.length || 0)

    return NextResponse.json({ subscriptions: subscriptions || [] })
  } catch (error: any) {
    console.error('Subscriptions API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, merchant, amount, frequency, category } = body

    if (!user_id || !merchant || !amount || !frequency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id,
        merchant,
        amount,
        frequency,
        category: category || 'Other',
        status: 'active',
        usage_score: 50,
        last_charge: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ subscription: data })
  } catch (error: any) {
    console.error('POST error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}