import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

export class Vehicle {
  readonly _id!: ObjectId

  @prop({ 
    type: String, 
    required: true,
    unique: true,
    match: [/^[A-Za-z]{3}\d{1}[A-Za-z]{1}\d{2}$/, 'Invalid plate. Expected format: ABC1D23']
  })
  public plate!: string

  @prop({
    type: String,
    required: true,
    unique: true,
    match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Invalid CHASSI. Must contain 17 alphanumeric characters']
  })
  public chassi!: string

  @prop({
    type: String,
    required: true,
    unique: true,
    match: [/^\d{11}$/, 'Invalid RENAVAM. Must contain exactly 11 digits']
  })
  public renavam!: string

  @prop({
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  })
  public model!: string

  @prop({
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  })
  public brand!: string

  @prop({ type: Number, required: true })
  public year!: number

  @prop({ type: Boolean, default: true })
  public active!: boolean

  @prop({ type: Date, default: Date.now })
  public createdAt!: Date
}

export const VehicleModel = getModelForClass(Vehicle)