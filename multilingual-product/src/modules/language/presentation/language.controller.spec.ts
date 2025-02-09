import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dto/pagination.dto';
import {
  CreateLanguageDto,
  UpdateLanguageDto,
} from '@/modules/language/application/dto/language.dto';
import { Language } from '@/modules/language/domain/entities/language.entity';
import { LanguageService } from '@/modules/language/domain/service/language.service';
import { LanguageController } from '@/modules/language/presentation/language.controller';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('LanguageController', () => {
  let languageController: LanguageController;

  const mockPageOptionsDto = { page: 1, take: 10 } as PageOptionsDto;
  const mockPageMetaDto = new PageMetaDto({
    pageOptionsDto: mockPageOptionsDto,
    itemCount: 0,
  });

  const mockLanguageService = {
    findWithPagination: jest
      .fn()
      .mockResolvedValue(new PageDto([], mockPageMetaDto)),
    find: jest.fn().mockResolvedValue([]),
    findOneById: jest.fn().mockResolvedValue(null),
    create: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
    softDelte: jest.fn().mockResolvedValue(undefined),
    restore: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguageController],
      providers: [
        {
          provide: LanguageService,
          useValue: mockLanguageService,
        },
      ],
    }).compile();

    languageController = module.get<LanguageController>(LanguageController);
  });

  it('should be defined', () => {
    expect(languageController).toBeDefined();
  });

  it('should return paginated languages', async () => {
    const pageOptionsDto = { skip: 0, take: 10 };
    const result = await languageController.findWithPagination(pageOptionsDto);
    expect(result).toEqual(new PageDto([], mockPageMetaDto));
    expect(mockLanguageService.findWithPagination).toHaveBeenCalledWith(
      pageOptionsDto,
    );
  });

  it('should return all languages', async () => {
    const result = await languageController.find();
    expect(result).toEqual([]);
    expect(mockLanguageService.find).toHaveBeenCalled();
  });

  it('should return a language by id', async () => {
    const mockLanguage = {
      id: 1,
      name: 'English',
    } as Language;
    mockLanguageService.findOneById.mockResolvedValue(mockLanguage);

    const result = await languageController.findOneById(1);
    expect(result).toEqual(mockLanguage);
    expect(mockLanguageService.findOneById).toHaveBeenCalled();
  });

  it('should throw NotFoundException if language is not found', async () => {
    mockLanguageService.findOneById.mockResolvedValue(null);

    await expect(languageController.findOneById(99)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create a new language', async () => {
    const languageDto: CreateLanguageDto = {
      name: 'English',
    };
    const result = await languageController.create(languageDto);

    expect(result).toEqual({ id: 1, ...languageDto });
    expect(mockLanguageService.create).toHaveBeenCalledWith(languageDto);
  });

  it('should update a language', async () => {
    const updateDto: UpdateLanguageDto = { name: 'Updated Language' };
    await languageController.update(1, updateDto);
    expect(mockLanguageService.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a language', async () => {
    await languageController.delete(1);
    expect(mockLanguageService.delete).toHaveBeenCalledWith(1);
  });

  it('should soft delete a language', async () => {
    await languageController.softDelte(1);
    expect(mockLanguageService.softDelte).toHaveBeenCalledWith(1);
  });

  it('should restore a language', async () => {
    await languageController.restore(1);
    expect(mockLanguageService.restore).toHaveBeenCalledWith(1);
  });
});
