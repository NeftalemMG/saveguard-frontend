// Email service using Resend for sending subscription-related emails

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev' // I might need to update this with a verified email later on

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set - email not sent')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        text,
        html: html || text.replace(/\n/g, '<br>')
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend API error:', data)
      return { success: false, error: data.message || 'Failed to send email' }
    }

    console.log('Email sent successfully:', data)
    return { success: true, id: data.id }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

// Generate negotiation email using AI
export async function generateNegotiationEmail(subscription: any): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  if (!ANTHROPIC_API_KEY) {
    // Fallback to template if no API key
    return generateTemplateNegotiationEmail(subscription)
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Write a professional negotiation email to ${subscription.merchant} requesting a lower rate or better deal. 
          
Current details:
- Service: ${subscription.merchant}
- Current price: $${subscription.amount}/${subscription.frequency}
- Usage score: ${subscription.usage_score}% (low usage)
- Been a customer for several months

The email should:
- Be professional and polite
- Mention considering cancellation due to low usage
- Ask for a better rate or promotional pricing
- Be concise (under 200 words)
- Sign off as "SaveGuard User"

Write ONLY the email body, no subject line or preamble.`
        }]
      })
    })

    const data = await response.json()
    
    if (data.content && data.content[0]?.text) {
      return data.content[0].text
    }

    return generateTemplateNegotiationEmail(subscription)
  } catch (error) {
    console.error('AI negotiation email error:', error)
    return generateTemplateNegotiationEmail(subscription)
  }
}

// Fallback template if AI fails
function generateTemplateNegotiationEmail(subscription: any): string {
  return `Dear ${subscription.merchant} Customer Service,

I am writing to discuss my ${subscription.merchant} subscription which costs $${subscription.amount} per ${subscription.frequency}.

I have been a loyal customer, but I have noticed that my usage has decreased significantly (${subscription.usage_score}% usage rate). While I value your service, I am currently evaluating my subscriptions and considering cancellation.

Before making a final decision, I wanted to reach out to see if you have any promotional rates or discounts available for long-term customers like myself. I would appreciate any options you could offer to help reduce my monthly costs.

I look forward to hearing from you soon.

Best regards,
SaveGuard User`
}

// Generate cancellation email
export function generateCancellationEmail(subscription: any): string {
  return `Dear ${subscription.merchant} Customer Service,

I am writing to request the cancellation of my ${subscription.merchant} subscription.

Subscription Details:
- Service: ${subscription.merchant}
- Current Rate: $${subscription.amount}/${subscription.frequency}
- Reason: Low usage (${subscription.usage_score}% usage rate)

Please process this cancellation immediately and confirm once completed. Please also ensure that no further charges are made to my account.

If there are any cancellation fees or final charges, please let me know in advance.

Thank you for your assistance.

Best regards,
SaveGuard User`
}

// Send alert to user
export async function sendUserAlert(type: 'low_usage' | 'price_increase', subscription: any) {
  const userEmail = 'testsontestsp6@gmail.com'

  let subject = ''
  let message = ''

  if (type === 'low_usage') {
    subject = `⚠️ Low Usage Alert: ${subscription.merchant}`
    message = `SaveGuard Alert

Your subscription to ${subscription.merchant} has been flagged for low usage.

Details:
- Service: ${subscription.merchant}
- Cost: $${subscription.amount}/${subscription.frequency}
- Usage Score: ${subscription.usage_score}%
- Potential Annual Savings: $${(subscription.amount * 12).toFixed(2)}

Recommendation: Consider cancelling or negotiating a lower rate.

You can take action at: https://your-app-url.com/dashboard

- SaveGuard AI`
  } else {
    subject = `💰 Price Increase Detected: ${subscription.merchant}`
    message = `SaveGuard Alert

We detected a potential price increase for your ${subscription.merchant} subscription.

Details:
- Service: ${subscription.merchant}
- New Cost: $${subscription.amount}/${subscription.frequency}

Recommendation: Review this subscription and consider negotiating or switching providers.

You can take action at: https://your-app-url.com/dashboard

- SaveGuard AI`
  }

  return await sendEmail({
    to: userEmail,
    subject,
    text: message
  })
}