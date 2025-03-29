import { expect } from 'chai'
import sinon from 'sinon'
import express from 'express'
import request from 'supertest'
import vehicleRouter from '../../../src/modules/vehicle/vehicle.controller'
import { VehicleModel } from '../../../src/modules/vehicle/vehicle.schema'
import { CreateVehicleArgs } from '../../../src/modules/vehicle/vehicle.type'

describe('VehicleController - Create', () => {
  let app: express.Application
  let saveStub: sinon.SinonStub

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/vehicle', vehicleRouter)
    
    saveStub = sinon.stub(VehicleModel.prototype, 'save')
  })

  afterEach(() => { sinon.restore() })

  describe('POST /vehicle', () => {
    it('should create a vehicle successfully', async () => {
      const mockVehicle = {
        _id: '507f1f77bcf86cd799439011',
        plate: 'ABC1D23',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        model: 'Gol',
        brand: 'Volkswagen',
        year: 2020,
        active: true
      }

      saveStub.resolves(mockVehicle)

      const validVehicle: CreateVehicleArgs = {
        plate: 'ABC1D23',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        model: 'Gol',
        brand: 'Volkswagen',
        year: 2020
      }

      const response = await request(app)
        .post('/vehicle')
        .send(validVehicle)
        .expect(200)

      expect(response.body).to.deep.equal(mockVehicle)
      expect(saveStub.calledOnce).to.be.true
    })

    it('should return 400 for invalid plate format', async () => {
      const invalidPlateVehicle = {
        plate: '1234ABC',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        model: 'Gol',
        brand: 'Volkswagen',
        year: 2020
      }

      const response = await request(app)
        .post('/vehicle')
        .send(invalidPlateVehicle)
        .expect(400)

      expect(response.body).to.have.property('errors')
      expect(response.body.errors[0].constraints.matches).to.include('INVALID_PLATE')
    })

    it('should return 400 for missing required fields', async () => {
      const incompleteVehicle = { plate: 'ABC1D23' }

      const response = await request(app)
        .post('/vehicle')
        .send(incompleteVehicle)
        .expect(400)

      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.be.an('array').that.is.not.empty
    })
  })
})
