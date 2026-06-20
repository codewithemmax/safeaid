import AfricasTalking from 'africastalking'
import { hashPhone } from './hash.service'

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY ?? '',
  username: process.env.AT_USERNAME ?? 'sandbox',
})

const sms = at.SMS

export async function sendSms(to: string, message: string): Promise<void> {
  // Do NOT log raw phone numbers. Log a hash so we can correlate requests safely.
  const phoneHash = hashPhone(to)
  console.error('Sending reply to (phoneHash):', phoneHash, '| AT_SHORTCODE set:', Boolean(process.env.AT_SHORTCODE))

  try {
    const result = await sms.send({
      to: [to],
      message,
      from: process.env.AT_SHORTCODE ?? 'SafeAid',
    })
    console.error('AT reply result:', JSON.stringify(result))
  } catch (err) {
    console.error('AT reply failed:', err)
    // swallow the error to avoid crashing the webhook handler; caller can decide
    // whether to surface failures. Keeping the process running is important for retries.
  }
}
