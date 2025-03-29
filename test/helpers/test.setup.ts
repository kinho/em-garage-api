import 'reflect-metadata'
import 'dotenv/config'

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

export const { expect } = chai
export { sinon }
