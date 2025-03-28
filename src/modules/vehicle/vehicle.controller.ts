import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', async (_: Request, res: Response) => {
  res.json({ success: true }).status(200)
})

export default router
