import { Router } from 'express'

import { listMessages } from '../controllers/messages.controller'

const router = Router({ mergeParams: true })

router.get('/', listMessages)

export default router
