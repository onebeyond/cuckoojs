import { Logger } from '@nestjs/common';
import { Expose, Type, plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  validateSync,
} from 'class-validator';
import _merge from 'lodash/merge';

import defaultConfig from './default';
import localConfig from './local';

enum EEnvironment {
  Local = 'local',
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesDto {
  @Expose()
  @IsEnum(EEnvironment)
  NODE_ENV: EEnvironment;

  // @Expose()
  // @IsNumber()
  PORT: number;

  @Expose()
  @IsString()
  DATABASE_HOST: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  DATABASE_PORT: number;
}

// This method validates the environment variables according to the EnvironmentVariablesDto class.
export const validate = (config: Record<string, unknown>) => {
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
};

class DatabaseConfigDto {
  @Expose()
  @IsString()
  host: string;

  @Expose()
  @IsNumber()
  port: number;
}

export class ConfigDto {
  @Expose()
  @IsEnum(EEnvironment)
  environment: EEnvironment;

  @Expose()
  @IsNumber()
  port: number;

  @Expose()
  @ValidateNested()
  @Type(() => DatabaseConfigDto)
  database: DatabaseConfigDto;

  @Expose()
  @IsString()
  myRequiredVar: string;

  @Expose()
  @IsOptional()
  @IsString()
  myOptionalVar: string;
}

export default (): ConfigDto => {
  Logger.log(':hourglass_flowing_sand: Validating app configuration...');

  Logger.debug('defaultConfig :>> ', defaultConfig());
  Logger.debug('localConfig :>> ', localConfig());

  const appConfig = {};
  _merge(appConfig, defaultConfig(), localConfig());

  Logger.debug('appConfig :>> ', appConfig);

  const parsedConfig = plainToClass(ConfigDto, appConfig, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  Logger.debug('validated appConfig :>> ', parsedConfig);

  const errors = validateSync(parsedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  Logger.log(':white_check_mark: App configuration validated!');

  return parsedConfig as ConfigDto;
};