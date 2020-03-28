import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import incidentsController from '../app/controllers/incidents.controller';

class IncidentsRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/incidents')
      .get(
        celebrate({
          [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
          }),
        }),
        incidentsController.index
      )
      .post(incidentsController.store);

    this.router.route('/incidents/:id').delete(
      celebrate({
        [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().required(),
        }),
      }),
      incidentsController.destroy
    );
  }
}

export default new IncidentsRouter().router;
