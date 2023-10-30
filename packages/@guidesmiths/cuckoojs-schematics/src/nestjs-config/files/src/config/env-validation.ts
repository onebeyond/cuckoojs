import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import EnvironmentVariablesDto from './dto/env-vars.dto';

export default function (config: Record<string, unknown>) {
  Logger.log(':hourglass_flowing_sand: Validating environment variables ...');

  const parsedConfig = plainToClass(EnvironmentVariablesDto, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  Logger.debug(JSON.stringify(parsedConfig, null, 2));

  const errors = validateSync(parsedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  Logger.log(':white_check_mark: Environment variables validated!');

  return parsedConfig;
}
