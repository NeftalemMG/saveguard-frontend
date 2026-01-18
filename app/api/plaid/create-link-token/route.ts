import { NextResponse } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid'

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

export async function POST() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'demo-user-' + Date.now(),
        phone_number_verified_time: new Date().toISOString(), // BYPASS PHONE VERIFICATION
      },
      client_name: 'SaveGuard',
      products: [Products.Transactions],
      country_codes: [CountryCode.Ca],
      language: 'en',
      redirect_uri: process.env.PLAID_REDIRECT_URI,
      webhook: process.env.PLAID_WEBHOOK_URL,
    })

    return NextResponse.json({ link_token: response.data.link_token })
  } catch (error: any) {
    console.error('Plaid link token error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}