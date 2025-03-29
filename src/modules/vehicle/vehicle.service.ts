import { Vehicle, VehicleModel  } from "./vehicle.schema"
import { CreateVehicleArgs, ListVehicleArgs, ListVehicleResponse } from "./vehicle.type"

export const createVehicle = async (args: CreateVehicleArgs): Promise<Vehicle> => {
  try {
    const vehicle = new VehicleModel({ ...args } as Vehicle)

    const saved = await vehicle.save()
    return saved

  } catch (error) {
    throw error
  }
}

export const listVehicles = async (args: ListVehicleArgs): Promise<ListVehicleResponse> => {
  const { offset, limit } = args

  const total = await VehicleModel.countDocuments({})
  const data = await VehicleModel.find({}).skip(offset).limit(limit)

  return { data, total }
}
