import { Request, Response } from 'express'

import { getCases, resolveCase } from '../services/cases.service'

export async function listCases(_req: Request, res: Response): Promise<void> {
  try {
    const cases = await getCases()
    res.json(cases)
  } catch (error) {
    console.error('listCases error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function resolveCaseHandler(req: Request, res: Response): Promise<void> {
  try {
    await resolveCase(req.params['id'] as string)
    res.json({ success: true })
  } catch (error) {
    console.error('resolveCase error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
