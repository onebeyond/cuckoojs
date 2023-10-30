import { Expose, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EEnvironment } from './env.dto';

// class DatabaseConfigDto {
//   @Expose()
//   @IsString()
//   host: string;
//
//   @Expose()
//   @IsNumber()
//   port: number;
// }

export default class ConfigDto {
  @Expose()
  @IsEnum(EEnvironment)
  environment: EEnvironment;

  @Expose()
  @IsNumber()
  port: number;

  @Expose()
  @IsString()
  foo: string;
  // @Expose()
  // @ValidateNested()
  // @Type(() => DatabaseConfigDto)
  // database: DatabaseConfigDto;
  //
  // @Expose()
  // @IsString()
  // myRequiredVar: string;
  //
  // @Expose()
  // @IsOptional()
  // @IsString()
  // myOptionalVar: string;
}
