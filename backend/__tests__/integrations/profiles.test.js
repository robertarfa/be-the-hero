import 'dotenv';
import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database';

describe('Profiles', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('Index', () => {
    it('returns all cases of the logged in user', async () => {
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

      await request(app)
        .post('/incidents')
        .set('Authorization', id)
        .send({
          title: 'Caso Teste',
          description: 'Detalhe do caso',
          value: 450,
        });

      const {
        body: [incident],
        status,
      } = await request(app)
        .get('/profiles')
        .set('Authorization', id)
        .send();

      expect(status).toBe(200);
      expect(incident).toHaveProperty('id');
    });
  });
});
