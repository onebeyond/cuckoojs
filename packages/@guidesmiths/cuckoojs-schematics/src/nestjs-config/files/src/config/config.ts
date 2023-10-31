import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import * as merge from 'lodash.merge';
import { readdirSync } from 'fs';
import { parse, join } from 'path';

import ConfigDto from './dto/config.dto';
import { EEnvironment } from './dto/env.dto';

async function loadConfigFiles(envName) {
  const envFile = join(process.cwd(), 'src', 'config', 'env', `${envName}.ts`);
  const defaultFile = join(process.cwd(), 'src', 'config', 'env', 'default.ts');
  try {
    return {
      default: await import(defaultFile),
      [envName]: await import(envFile),
    };
  } catch (error) {
    throw new Error(
      `Config file for environment ${envName} not found. Please, consider adding a ${envName}.ts file to the "env" folder.`,
    );
  }
}

export default async function (): Promise<ConfigDto> {
  Logger.log(':hourglass_flowing_sand: Validating app configuration...');

  const environment: EEnvironment = process.env.<%=envVar%> as EEnvironment;
  const configs = await loadConfigFiles(environment)
    

  const appConfig = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
