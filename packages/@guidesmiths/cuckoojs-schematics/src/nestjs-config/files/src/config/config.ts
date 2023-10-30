import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import * as merge from 'lodash.merge';
import { readdirSync } from 'fs';
import { parse, join } from 'path';

import ConfigDto from './dto/config.dto';
import { EEnvironment } from './dto/env.dto';

async function loadConfigFiles() {
  const baseDir = join(process.cwd(), 'src', 'config', 'env');
  return readdirSync(baseDir).reduce(async (total, filename) => {
    const moduleName = parse(filename).name;
    const module = await import(join(baseDir, filename));
    return { ...(await total), [moduleName]: module };
  }, Promise.resolve({}));
}

export default async function (): Promise<ConfigDto> {
  Logger.log(':hourglass_flowing_sand: Validating app configuration...');

  const environment: EEnvironment = process.env.NODE_ENV as EEnvironment;
  const configs = await loadConfigFiles();
  console.log(configs);
  const selectedConfig = configs[environment];

  if (!selectedConfig)
    throw new Error(
      `Config file for environment ${environment} not found. Please, consider adding a ${environment}.ts file to the "env" folder.`,
    );

  const appConfig = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  merge(appConfig, configs.default, selectedConfig);

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
