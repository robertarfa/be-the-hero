import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ongsController from '../app/controllers/ongs.controller';

class OngsRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/ongs')
      .get(ongsController.index)
      .post(
        celebrate({
          [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string()
              .required()
              .email(),
            whatsapp: Joi.string()
              .required()
              .min(13)
              .max(13),
            city: Joi.string().required(),
            uf: Joi.string()
              .required()
              .length(2),
          }),
        }),
        ongsController.store
      );
  }
}

export default new OngsRouter().router;
