import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../../src/app.module';
import { HealthController } from '../../../src/controllers/health.controller';

describe('HealthController', () => {
  let module: TestingModule;
  let controller: HealthController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('create', () => {
    it('should get response', async () => {
      // When
      const response = await controller.check();

      // Then
      expect(response).toEqual({
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
});
