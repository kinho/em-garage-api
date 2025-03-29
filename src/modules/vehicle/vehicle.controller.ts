import express, { Request, Response } from 'express'
import { createVehicle, listVehicles } from './vehicle.service'
import { validateRequest } from '@modules/middleware/validate.middleware'
import { CreateVehicleArgs } from './vehicle.type'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { data, total } = await listVehicles(req.body)
  res.json({ data, total, success: true }).status(200)
})

router.post('/', validateRequest(CreateVehicleArgs), async (req: Request, res: Response) => {
  try {
    const vehicle = await createVehicle(req.body)
    res.json(vehicle).status(200)
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default router
