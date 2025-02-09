import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dto/pagination.dto';
import {
  CreateMultilingualProductDto,
  SearchMultilingualProductDto,
} from '@/modules/multilingual-product/application/dto/multilingual-product.dto';
import { MultilingualProductService } from '@/modules/multilingual-product/domain/service/multilingual-product.service';
import { MultilingualProductController } from '@/modules/multilingual-product/presentation/multilingual-product.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('MultilingualProductController', () => {
  let multilingualProductController: MultilingualProductController;

  const mockPageOptionsDto = { page: 1, take: 10 } as PageOptionsDto;
  const mockPageMetaDto = new PageMetaDto({
    pageOptionsDto: mockPageOptionsDto,
    itemCount: 0,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultilingualProductController],
      providers: [
        {
          provide: MultilingualProductService,
          useValue: {
            searchMultilingualProduct: jest
              .fn()
              .mockResolvedValue(new PageDto([], mockPageMetaDto)),
            createMultilingualProduct: jest
              .fn()
              .mockResolvedValue({ languageId: 1, productId: 1 }),
          },
        },
      ],
    }).compile();

    multilingualProductController = module.get<MultilingualProductController>(
      MultilingualProductController,
    );
  });

  it('should be defined', () => {
    expect(multilingualProductController).toBeDefined();
  });

  describe('searchMultilingualProduct', () => {
    it('should return paginated results', async () => {
      const query: SearchMultilingualProductDto = {
        name: 'Book',
        language: 'English',
      };
      const pageOptionsDto = { page: 1, take: 10 } as PageOptionsDto;

      const result =
        await multilingualProductController.searchMultilingualProduct(
          query,
          pageOptionsDto,
        );
      expect(result).toEqual(new PageDto([], mockPageMetaDto));
    });
  });

  describe('createMultilingualProduct', () => {
    it('should create and return a multilingual product', async () => {
      const payload: CreateMultilingualProductDto = {
        name: 'Book',
        description: 'Mathemetic Book',
        language: 'English',
      };

      const result =
        await multilingualProductController.createMultilingualProduct(payload);
      expect(result).toEqual({ languageId: 1, productId: 1 });
    });
  });
});
