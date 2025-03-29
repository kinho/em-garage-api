import { IsNumber, IsOptional, Matches, MaxLength, MinLength } from 'class-validator'
import { Expose, Transform } from 'class-transformer'

import { Vehicle } from './vehicle.schema'

export class CreateVehicleArgs {
  @Expose()
  @Matches(/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/, { message: 'INVALID_PLATE' })
  plate!: string

  @Expose()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'INVALID_CHASSI' })
  chassi!: string

  @Expose()
  @Matches(/^\d{11}$/, { message: 'INVALID_RENAVAM' })
  renavam!: string

  @Expose()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  model!: string

  @Expose()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  brand!: string

  @Expose()
  @IsNumber()
  year!: number
}

export class ListVehicleArgs {
  @Expose()
  @IsOptional()
  plate?: string

  @Expose()
  @IsOptional()
  offset: number = 0

  @Expose()
  @IsOptional()
  limit: number = 10
}

export class ListVehicleResponse {
  @Expose()
  total!: number

  @Expose()
  data!: Vehicle[]
}
