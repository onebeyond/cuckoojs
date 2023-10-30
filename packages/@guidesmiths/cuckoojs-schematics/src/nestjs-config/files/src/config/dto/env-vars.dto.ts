import { Expose } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

import { EEnvironment } from './env.dto';

export default class EnvironmentVariablesDto {
  @Expose()
  @IsEnum(EEnvironment)
  NODE_ENV: EEnvironment;

  @Expose()
  @IsNumber()
  PORT: number;
}
