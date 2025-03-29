import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

export const validateRequest = (Class: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(Class, req.body, {
      excludeExtraneousValues: true,
    })

    const errors = await validate(instance)

    if (errors.length > 0) {
      res.status(400).json({ errors })
      return
    }

    req.body = instance
    next()
  }
}
