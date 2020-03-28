import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import profilesController from '../app/controllers/profiles.controller';

class ProfilesRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/profiles').get(
      celebrate({
        [Segments.HEADERS]: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      }),
      profilesController.index
    );
  }
}

export default new ProfilesRouter().router;
