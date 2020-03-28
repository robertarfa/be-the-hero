import { Router } from 'express';

import sessionsController from '../app/controllers/sessions.controller';

class SessionsRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/sessions').post(sessionsController.store);
  }
}

export default new SessionsRouter().router;
