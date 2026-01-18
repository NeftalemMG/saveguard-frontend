import { NextResponse } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'
import { supabase } from '@/lib/supabase'

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
})

const plaidClient = new PlaidApi(configuration)

export async function POST(request: Request) {
  try {
    const { public_token } = await request.json()

    // Exchange public token for access token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    })

    const access_token = response.data.access_token
    const item_id = response.data.item_id

    // Create or update user in database
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: 'demo@saveguard.ca',
        name: 'Demo User',
        plaid_access_token: access_token,
        plaid_item_id: item_id,
      })
      .select()
      .single()

    if (error) {
      // If user exists, update
      const { data: existingUser } = await supabase
        .from('users')
        .update({
          plaid_access_token: access_token,
          plaid_item_id: item_id,
        })
        .eq('email', 'demo@saveguard.ca')
        .select()
        .single()

      return NextResponse.json({
        success: true,
        user_id: existingUser?.id,
      })
    }

    return NextResponse.json({
      success: true,
      user_id: user.id,
    })
  } catch (error: any) {
    console.error('Token exchange error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}