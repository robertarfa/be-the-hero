import 'dotenv';
import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database';

let userid;
let indicentId;

describe('Incidents', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('Store', () => {
    it('need to successfully create a case and return the id', async () => {
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
        .post('/incidents')
        .set('Authorization', id)
        .send({
          title: 'Caso Teste',
          description: 'Detalhe do caso',
          value: 450,
        });

      userid = id;
      indicentId = body.id;

      expect(status).toBe(200);
      expect(body).toHaveProperty('id');
    });
  });

  describe('Index', () => {
    it('returns all registered cases', async () => {
      const {
        body: [incident],
        status,
      } = await request(app)
        .get('/incidents')
        .send();

      expect(status).toBe(200);
      expect(incident).toHaveProperty('id');
    });
  });

  describe('Destroy', () => {
    it('passes the wrong user id, do not let it be deleted', async () => {
      const { body, status } = await request(app)
        .delete(`/incidents/${indicentId}`)
        .set('Authorization', 'asdfghjk')
        .send();

      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('delete a specific case', async () => {
      const { status } = await request(app)
        .delete(`/incidents/${indicentId}`)
        .set('Authorization', userid)
        .send();

      expect(status).toBe(204);
    });
  });
});
