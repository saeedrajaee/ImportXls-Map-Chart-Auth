import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRequest } from './create-product.request';

export class UpdateProductDto extends PartialType(CreateProductRequest) {}