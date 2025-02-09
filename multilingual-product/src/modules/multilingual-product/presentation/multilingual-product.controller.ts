import { PageDto, PageOptionsDto } from '@/common/dto/pagination.dto';
import {
  CreateMultilingualProductDto,
  SearchMultilingualProductDto,
} from '@/modules/multilingual-product/application/dto/multilingual-product.dto';
import { MultilingualProduct } from '@/modules/multilingual-product/domain/entities/multilingual-product.entity';
import { MultilingualProductService } from '@/modules/multilingual-product/domain/service/multilingual-product.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Multilingual Product')
@Controller('multilingual-product')
export class MultilingualProductController {
  constructor(
    private readonly multilingualProductService: MultilingualProductService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async searchMultilingualProduct(
    @Query() query: SearchMultilingualProductDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<MultilingualProduct>> {
    return await this.multilingualProductService.searchMultilingualProduct(
      query,
      pageOptionsDto,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMultilingualProduct(
    @Body() payload: CreateMultilingualProductDto,
  ): Promise<MultilingualProduct> {
    return await this.multilingualProductService.createMultilingualProduct(
      payload,
    );
  }
}
