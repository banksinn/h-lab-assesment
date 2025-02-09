import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dto/pagination.dto';
import { LanguageService } from '@/modules/language/domain/service/language.service';
import {
  CreateMultilingualProductDto,
  SearchMultilingualProductDto,
} from '@/modules/multilingual-product/application/dto/multilingual-product.dto';
import { MultilingualProduct } from '@/modules/multilingual-product/domain/entities/multilingual-product.entity';
import { ProductService } from '@/modules/product/domain/service/product.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MultilingualProductService {
  constructor(
    @InjectRepository(MultilingualProduct)
    public readonly multilingualProductRepository: Repository<MultilingualProduct>,
    private readonly productService: ProductService,
    private readonly languageService: LanguageService,
  ) {}

  async searchMultilingualProduct(
    query: SearchMultilingualProductDto,
    pageOptionsDto?: PageOptionsDto,
  ): Promise<PageDto<MultilingualProduct>> {
    // NOTE(To-H-Lab-Viewer): Product เป็น many to many กับ Language โดยมี MultilingualProduct เป็น Table Mapping ระหว่าง Product และ Language
    // NOTE(To-H-Lab-Viewer): query จาก table MultilingualProduct เพราะเป็น table ที่เก็บ Fk ของ Product และ Language แล้วเราก็สามารถ join ไปเพื่อ query หา product name, language name ได้
    const { name, language } = query;

    const queryBuilder = this.multilingualProductRepository
      .createQueryBuilder('multilingualproduct')
      .leftJoinAndSelect('multilingualproduct.language', 'language')
      .leftJoinAndSelect('multilingualproduct.product', 'product')
      .where('product.name = :name', { name: name })
      .andWhere('language.name = :language', { language })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async createMultilingualProduct(
    payload: CreateMultilingualProductDto,
  ): Promise<MultilingualProduct> {
    // NOTE(To-H-Lab-Viewer): เช็คว่ามี product หรือยังถ้ายังก็ create product ถ้ามีแล้วก็ update description ให้ product name อันนั้น
    let product = await this.productService.findOne({
      where: { name: payload.name },
    });
    if (!product) {
      product = await this.productService.create({
        name: payload.name,
        description: payload.description,
      });
    } else {
      product.description = payload.description;
      await this.productService.save(product);
    }
    // NOTE(To-H-Lab-Viewer): เช็คว่ามี language หรือยังถ้ายังก็ create language
    let language = await this.languageService.findOne({
      where: { name: payload.language },
    });
    if (!language) {
      language = await this.languageService.create({
        name: payload.language,
      });
    }
    // NOTE(To-H-Lab-Viewer): create multilingualProduct
    const multilingualProduct = await this.multilingualProductRepository.create(
      { productId: product.id, languageId: language.id },
    );
    return await this.multilingualProductRepository.save(multilingualProduct);
  }
}
