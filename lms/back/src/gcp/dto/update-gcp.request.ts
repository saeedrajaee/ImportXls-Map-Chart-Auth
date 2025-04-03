import { PartialType } from '@nestjs/mapped-types';
import { CreateGcpRequest } from './create-gcp.request';

export class UpdateGcpDto extends PartialType(CreateGcpRequest) {}