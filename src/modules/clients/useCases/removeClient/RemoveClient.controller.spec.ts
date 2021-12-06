import * as faker from 'faker';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

describe('Remove Client Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able remove a client', async () => {
    const {
      body: { id: city_id },
    } = await request(app).post('/api/v1/cities').send({
      name: faker.address.cityName(),
      state: faker.address.state(),
    });

    const {
      body: { id: client_id },
    } = await request(app)
      .post('/api/v1/clients')
      .send({
        full_name: faker.name.findName(),
        gender: 'F',
        born_date: new Date(2000, 1, 1),
        city_living_id: city_id,
      });

    const response = await request(app).delete(`/api/v1/clients/${client_id}`);

    expect(response.status).toBe(HttpCodes.OK);
    expect(response.body.deleted).toBe(true);
  });

  it('should not be able to delete a client who dont exists', async () => {
    const randomClientId = uuid();

    const response = await request(app).delete(
      `/api/v1/clients/${randomClientId}`,
    );

    expect(response.status).toBe(HttpCodes.NOT_FOUND);
  });
});
