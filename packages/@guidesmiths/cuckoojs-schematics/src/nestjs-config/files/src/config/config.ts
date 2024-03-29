import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import * as merge from 'lodash.merge';
import { join } from 'path';

import ConfigDto from './dto/config.dto';
import { EEnvironment } from './dto/env.dto';

async function loadConfigFiles(envName: string) {
  const envFile = join(__dirname, 'env', `${envName}.js`);
  const defaultFile = join(__dirname, 'env', 'default.js');

  let defaultConfig;
  let envConfig;
  try {
    defaultConfig = await import(defaultFile);
    envConfig = await import(envFile);
  } catch (error) {
    const missingFilename = /.*\/(?<filename>.*)\.ts'/.exec(error.message)
      ?.groups?.filename;
    throw new Error(
      `Config file for environment ${missingFilename} not found. Please, consider adding a ${missingFilename}.ts file to the "env" folder.`,
    );
  }

  if (!defaultConfig.default || !envConfig.default)
    throw new Error(
      `Please, use "export default" syntax to export the configuration object.`,
    );
  return {
    default: defaultConfig.default,
    [envName]: envConfig.default,
  };
}

export default async function (): Promise<ConfigDto> {
  Logger.log(':hourglass_flowing_sand: Validating app configuration...');

  const environment: EEnvironment = process.env.<%=envVar%> as EEnvironment;
  const configs = await loadConfigFiles(environment);
  const appConfig = {};

  merge(appConfig, configs.default, configs[environment]);

  const parsedConfig = plainToClass(ConfigDto, appConfig, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(parsedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  Logger.log(':white_check_mark: App configuration validated!');

  return parsedConfig as ConfigDto;
}
