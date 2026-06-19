import { Request, Response } from 'express'

import { getCenters, getCentersNearby } from '../services/centers.service'
import type { ResourceType } from '../types'

export async function listCenters(req: Request, res: Response): Promise<void> {
  try {
    const state = req.query['state'] as string | undefined
    const type = req.query['type'] as ResourceType | undefined
    const centers = await getCenters(state, type)
    res.json(centers)
  } catch (error) {
    console.error('listCenters error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function nearbyCenters(req: Request, res: Response): Promise<void> {
  try {
    const lat = parseFloat(req.query['lat'] as string)
    const lng = parseFloat(req.query['lng'] as string)
    const type = req.query['type'] as ResourceType | undefined

    if (isNaN(lat) || isNaN(lng)) {
      res.status(400).json({ error: 'lat and lng are required numeric query params' })
      return
    }

    const centers = await getCentersNearby(lat, lng, type)
    res.json(centers)
  } catch (error) {
    console.error('nearbyCenters error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
