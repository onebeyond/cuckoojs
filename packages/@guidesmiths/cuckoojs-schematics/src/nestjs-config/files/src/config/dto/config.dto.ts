import { Expose } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { EEnvironment } from './env.dto';

export default class ConfigDto {
  @Expose()
  @IsEnum(EEnvironment)
  environment: EEnvironment;

  @Expose()
  @IsNumber()
  port: number;
}