import { Request, Response } from 'express'

import { getMessages } from '../services/cases.service'

export async function listMessages(req: Request, res: Response): Promise<void> {
  try {
    const messages = await getMessages(req.params['id'] as string)
    res.json(messages)
  } catch (error) {
    console.error('listMessages error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
