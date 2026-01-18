import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
    }

    // Get all subscriptions for user
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('amount', { ascending: false })

    if (error) {
      console.error('Export error:', error)
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ error: 'No subscriptions found' }, { status: 404 })
    }

    // Generate CSV
    const headers = [
      'Merchant',
      'Amount',
      'Frequency',
      'Category',
      'Status',
      'Usage Score',
      'Last Charge',
      'Next Charge',
      'Annual Cost'
    ]

    const rows = subscriptions.map(sub => [
      sub.merchant,
      sub.amount,
      sub.frequency,
      sub.category,
      sub.status,
      sub.usage_score,
      sub.last_charge,
      sub.next_charge || 'N/A',
      (sub.amount * 12).toFixed(2)
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="subscriptions-${Date.now()}.csv"`,
      },
    })

  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}