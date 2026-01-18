import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    console.log('Fetching analytics for user:', user_id)

    // Get all subscriptions
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id)

    if (error) {
      console.error('Analytics error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({
        analytics: {
          totalMonthly: '0.00',
          potentialSavings: '0.00',
          totalSaved: '0.00',
          activeCount: 0,
          cancelledCount: 0,
          unusedCount: 0,
        }
      })
    }

    const active = subscriptions.filter(s => s.status === 'active')
    const cancelled = subscriptions.filter(s => s.status === 'cancelled')
    const unused = subscriptions.filter(s => s.usage_score < 30)

    const totalMonthly = active.reduce((sum, s) => {
      if (s.frequency === 'monthly') return sum + parseFloat(s.amount)
      if (s.frequency === 'annual') return sum + (parseFloat(s.amount) / 12)
      if (s.frequency === 'weekly') return sum + (parseFloat(s.amount) * 4)
      return sum
    }, 0)

    const potentialSavings = unused.reduce((sum, s) => {
      if (s.frequency === 'monthly') return sum + parseFloat(s.amount)
      if (s.frequency === 'annual') return sum + (parseFloat(s.amount) / 12)
      if (s.frequency === 'weekly') return sum + (parseFloat(s.amount) * 4)
      return sum
    }, 0)

    // Get negotiation logs for total saved
    const { data: logs } = await supabase
      .from('negotiation_logs')
      .select('savings_amount')
      .eq('status', 'success')
      .in('subscription_id', subscriptions.map(s => s.id))

    const totalSaved = logs?.reduce((sum, log) => sum + (parseFloat(log.savings_amount) || 0), 0) || 0

    const analytics = {
      totalMonthly: totalMonthly.toFixed(2),
      potentialSavings: potentialSavings.toFixed(2),
      totalSaved: totalSaved.toFixed(2),
      activeCount: active.length,
      cancelledCount: cancelled.length,
      unusedCount: unused.length,
    }

    console.log('Analytics calculated:', analytics)

    return NextResponse.json({ analytics })
  } catch (error: any) {
    console.error('Analytics calculation error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}