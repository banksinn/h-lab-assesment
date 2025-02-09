import { PageDto, PageOptionsDto } from '@/common/dto/pagination.dto';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@/modules/product/application/dto/product.dto';
import { Product } from '@/modules/product/domain/entities/product.entity';
import { ProductService } from '@/modules/product/domain/service/product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProductWithPagination(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    return this.productService.findWithPagination(pageOptionsDto);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async find(): Promise<Product[]> {
    return await this.productService.find();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOneById(@Param('id') id: number): Promise<Product> {
    const result = await this.productService.findOneById(id);
    if (!result) {
      throw new NotFoundException('Product Not Found');
    }
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateProductDto): Promise<Product> {
    return await this.productService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateProductDto,
  ): Promise<void> {
    await this.productService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id);
  }

  @Delete(':id/soft-delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelte(@Param('id') id: number): Promise<void> {
    await this.productService.softDelte(id);
  }

  @Patch(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id') id: number): Promise<void> {
    await this.productService.restore(id);
  }
}
