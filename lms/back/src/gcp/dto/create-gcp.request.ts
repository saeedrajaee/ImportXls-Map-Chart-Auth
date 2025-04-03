import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGcpRequest {
  @IsNumber()
  @Type(() => Number)
  X: number;
  
  @IsNumber()
  @Type(() => Number)
  Y: number;
  
  @IsString()
  @IsNotEmpty()
  description: string;
}