import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import { AppError } from '../../../../shared/errors/AppError';
import { errorMessages } from '../../../../shared/errors/ErrorMessages';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { UpdateClientUseCase } from './UpdateClient.useCase';

export class UpdateClientController {
  public static async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    try {
      const schema = yup.object().shape({
        name: yup
          .string()
          .required(errorMessages('name').required)
          .matches(/[A-Z]/g, 'Must be only letters'),
      });

      await schema.validate(request.body);
    } catch (error: any) {
      throw new AppError(error.message, HttpCodes.UNPROCESSABLE_ENTITY);
    }

    const updatedClient = await updateClientUseCase.execute(id, { name });

    return response.status(HttpCodes.OK).json(updatedClient);
  }
}
