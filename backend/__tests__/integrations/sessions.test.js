import 'dotenv';
import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database';

describe('Sessions', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('Store', () => {
    it('passing the correct data, allow to login', async () => {
      const json = {
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '5515981270952',
        city: 'Sorocaba',
        uf: 'SP',
      };

      const {
        body: { id },
      } = await request(app)
        .post('/ongs')
        .send(json);

      const { body, status } = await request(app)
        .post('/sessions')
        .send({ id });

      expect(status).toBe(200);
      expect(body).toHaveProperty('name');
    });

    it('non-existent user, do not allow login', async () => {
      const { body, status } = await request(app)
        .post('/sessions')
        .send({ id: 'bshjuj' });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });
});
