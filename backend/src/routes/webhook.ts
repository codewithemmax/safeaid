import { Router } from 'express'

import { receiveSms } from '../controllers/sms.controller'

const router = Router()

router.post('/sms', receiveSms)

export default router
