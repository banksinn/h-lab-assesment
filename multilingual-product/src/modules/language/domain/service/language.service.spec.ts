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
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('LanguageService', () => {
  let languageService: LanguageService;
  let languageRepository: Repository<Language>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageService,
        {
          provide: getRepositoryToken(Language),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockResolvedValue(0),
              getRawAndEntities: jest.fn().mockResolvedValue({ entities: [] }),
            }),
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            findOneBy: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest
              .fn()
              .mockImplementation((language) =>
                Promise.resolve({ id: 1, ...language }),
              ),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
            softDelete: jest.fn().mockResolvedValue(undefined),
            restore: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    languageService = module.get<LanguageService>(LanguageService);
    languageRepository = module.get<Repository<Language>>(
      getRepositoryToken(Language),
    );
  });

  it('should be defined', () => {
    expect(languageService).toBeDefined();
  });

  describe('findWithPagination', () => {
    it('should return paginated results', async () => {
      const pageOptions = { page: 1, take: 10 } as PageOptionsDto;
      const mockPageMetaDto = new PageMetaDto({
        pageOptionsDto: pageOptions,
        itemCount: 0,
      });
      const result = await languageService.findWithPagination(pageOptions);

      expect(result).toEqual(new PageDto([], mockPageMetaDto));
      expect(languageRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return an array of languages', async () => {
      const result = await languageService.find();
      expect(result).toEqual([]);
      expect(languageRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single language', async () => {
      const result = await languageService.findOne({ where: { id: 1 } });
      expect(result).toBeNull();
      expect(languageRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('findOneById', () => {
    it('should return a single language by ID', async () => {
      const result = await languageService.findOneById(1);
      expect(result).toBeNull();
      expect(languageRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create a language and return it', async () => {
      const dto: CreateLanguageDto = {
        name: 'English',
      };
      const result = await languageService.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(languageRepository.save).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('should save an existing language and return it', async () => {
      const entity = {
        id: 1,
        name: 'Updated language',
      } as Language;
      const result = await languageService.save(entity);
      expect(result).toEqual(entity);
      expect(languageRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a language', async () => {
      const dto: UpdateLanguageDto = { name: 'Updated Language' };
      await languageService.update(1, dto);
      expect(languageRepository.update).toHaveBeenCalledWith({ id: 1 }, dto);
    });
  });

  describe('delete', () => {
    it('should delete a language', async () => {
      await languageService.delete(1);
      expect(languageRepository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('softDelete', () => {
    it('should soft delete a language', async () => {
      await languageService.softDelte(1);
      expect(languageRepository.softDelete).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('restore', () => {
    it('should restore a soft-deleted language', async () => {
      await languageService.restore(1);
      expect(languageRepository.restore).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
