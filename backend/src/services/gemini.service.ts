import { GoogleGenerativeAI } from '@google/generative-ai'

import type { GeminiAnalysis } from '../types'

const FALLBACK: GeminiAnalysis = {
  risk_level: 'MEDIUM',
  summary: 'Automated analysis unavailable — manual review required.',
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function analyseMessage(text: string): Promise<GeminiAnalysis> {
  try {
    const prompt = `You are a trauma-informed analyst for a survivor support organisation.
A person sent this SMS: "${text}"
Return a JSON object with:
- risk_level: "HIGH" (immediate danger/coercion), "MEDIUM" (distress/vulnerability), or "LOW" (general enquiry)
- summary: 1-2 sentences for a caseworker describing the situation.
Return only valid JSON. No markdown, no backticks, no explanation.`

    const result = await model.generateContent(prompt)
    const raw = result.response.text().replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(raw) as GeminiAnalysis
    return parsed
  } catch {
    return FALLBACK
  }
}
