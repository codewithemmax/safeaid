import { Router } from 'express'

import { listCases, resolveCaseHandler } from '../controllers/cases.controller'

const router = Router()

router.get('/', listCases)
router.post('/:id/resolve', resolveCaseHandler)

export default router
