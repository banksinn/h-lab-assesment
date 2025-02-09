import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dto/pagination.dto';
import { Order } from '@/common/enums/pagination.enum';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@/modules/product/application/dto/product.dto';
import { Product } from '@/modules/product/domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    public readonly productRepository: Repository<Product>,
  ) {}

  async findWithPagination(
    pageOptionsDto?: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .orderBy('product."createdAt"', Order.ASC)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async find(options?: FindManyOptions<Product>): Promise<Product[]> {
    return await this.productRepository.find(options);
  }

  async findOne(options: FindOneOptions<Product>): Promise<Product | null> {
    return await this.productRepository.findOne(options);
  }

  async findOneById(id: number): Promise<Product | null> {
    return await this.productRepository.findOneBy({
      id,
    } as FindOptionsWhere<Product>);
  }

  async create(payload: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(
      this.productRepository.create(payload),
    );
  }

  async save(entity: Product): Promise<Product> {
    return await this.productRepository.save(entity);
  }

  async update(id: number, payload: UpdateProductDto): Promise<void> {
    await this.productRepository.update({ id }, payload);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete({ id });
  }

  async softDelte(id: number): Promise<void> {
    await this.productRepository.softDelete({ id });
  }

  async restore(id: number): Promise<void> {
    await this.productRepository.restore({ id });
  }
}
