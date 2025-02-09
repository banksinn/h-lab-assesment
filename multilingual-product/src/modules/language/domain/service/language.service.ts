import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dto/pagination.dto';
import { Order } from '@/common/enums/pagination.enum';
import {
  CreateLanguageDto,
  UpdateLanguageDto,
} from '@/modules/language/application/dto/language.dto';
import { Language } from '@/modules/language/domain/entities/language.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    public readonly languageRepository: Repository<Language>,
  ) {}

  async findWithPagination(
    pageOptionsDto?: PageOptionsDto,
  ): Promise<PageDto<Language>> {
    const queryBuilder = this.languageRepository
      .createQueryBuilder('language')
      .orderBy('language.createdAt', Order.ASC)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async find(options?: FindManyOptions<Language>): Promise<Language[]> {
    return await this.languageRepository.find(options);
  }

  async findOne(options: FindOneOptions<Language>): Promise<Language | null> {
    return await this.languageRepository.findOne(options);
  }

  async findOneById(id: number): Promise<Language | null> {
    return await this.languageRepository.findOneBy({
      id,
    } as FindOptionsWhere<Language>);
  }

  async create(payload: CreateLanguageDto): Promise<Language> {
    return await this.languageRepository.save(
      this.languageRepository.create(payload),
    );
  }

  async save(entity: Language): Promise<Language> {
    return await this.languageRepository.save(entity);
  }

  async update(id: number, payload: UpdateLanguageDto): Promise<void> {
    await this.languageRepository.update({ id }, payload);
  }

  async delete(id: number): Promise<void> {
    await this.languageRepository.delete({ id });
  }

  async softDelte(id: number): Promise<void> {
    await this.languageRepository.softDelete({ id });
  }

  async restore(id: number): Promise<void> {
    await this.languageRepository.restore({ id });
  }
}
