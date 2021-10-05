import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../src/app.module';

const URL = '/health';

describe('/health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    //TODO: TypeOrmHealthIndicator potentialy causing leaks, uncomment to hide errors
    // await new Promise((resolve) => setTimeout(resolve, 500));
  });

  it('should return health status', async () => {
    // When
    const response = await request(app.getHttpServer()).get(URL);

    // Then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: 'ok',
      info: {
        database: {
          status: 'up',
        },
      },
      error: {},
      details: {
        database: {
          status: 'up',
        },
      },
    });
  });
});
