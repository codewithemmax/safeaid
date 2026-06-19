import { Router } from 'express'

import { listCenters, nearbyCenters } from '../controllers/centers.controller'

const router = Router()

router.get('/nearby', nearbyCenters)
router.get('/', listCenters)

export default router
