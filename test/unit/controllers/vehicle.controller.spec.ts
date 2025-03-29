import request from 'supertest'
import express from 'express'

import { expect } from '../../helpers/test.setup'
import vehicleController from '../../../src/modules/vehicle/vehicle.controller'

describe('VehicleController', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/vehicle', vehicleController)
  })

  describe('GET /vehicle', () => {
    it('should return success true with status 200', async () => {
      const res = await request(app).get('/vehicle')
      
      expect(res.status).to.equal(200)
      expect(res.body).to.deep.equal({ success: true })
    })
  })
})
