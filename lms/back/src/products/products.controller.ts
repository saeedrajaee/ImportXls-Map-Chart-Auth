import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductRequest } from './dto/create-product.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.request';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() body: CreateProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productsService.createProduct(body, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':productId')
  @UseGuards(JwtAuthGuard)
  async getProductType(@Param('productId') productId: string) {
    return this.productsService.getProduct(+productId);
  }

  @Patch(':productId')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(+productId, updateProductDto);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('productId') productId: string) {
    return this.productsService.deleteProduct(+productId);
  }
}
