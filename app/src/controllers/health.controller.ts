import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

/**
 * Health controller.
 */
@Controller()
export class HealthController {
  /**
   * Constructor.
   *
   * @param {HealthCheckService} health - Health check service.
   * @param {TypeOrmHealthIndicator} db - Type ORM health indicator.
   */
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  /**
   * Health check for human inspection.
   *
   * @returns {HealthCheckResult} - Health check result.
   */
  @Get('health')
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  /**
   * Liveness probe.
   *
   * @returns {HealthCheckResult} - Health check result.
   */
  @Get('live')
  @HealthCheck()
  live(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  /**
   * Readiness probe.
   *
   * @returns {HealthCheckResult} - Health check result.
   */
  @Get('ready')
  @HealthCheck()
  ready(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
