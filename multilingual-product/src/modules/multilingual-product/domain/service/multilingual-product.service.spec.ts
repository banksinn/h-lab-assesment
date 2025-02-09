import { Language } from '@/modules/language/domain/entities/language.entity';
import { LanguageService } from '@/modules/language/domain/service/language.service';
import { CreateMultilingualProductDto } from '@/modules/multilingual-product/application/dto/multilingual-product.dto';
import { MultilingualProduct } from '@/modules/multilingual-product/domain/entities/multilingual-product.entity';
import { MultilingualProductService } from '@/modules/multilingual-product/domain/service/multilingual-product.service';
import { Product } from '@/modules/product/domain/entities/product.entity';
import { ProductService } from '@/modules/product/domain/service/product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MultilingualProductService', () => {
  let multilingualProductService: MultilingualProductService;
  let multilingualProductRepository: Repository<MultilingualProduct>;
  let productService: ProductService;
  let languageService: LanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MultilingualProductService,
        {
          provide: getRepositoryToken(MultilingualProduct),
          useClass: Repository,
        },
        {
          provide: ProductService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: LanguageService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    multilingualProductService = module.get<MultilingualProductService>(
      MultilingualProductService,
    );
    multilingualProductRepository = module.get<Repository<MultilingualProduct>>(
      getRepositoryToken(MultilingualProduct),
    );
    productService = module.get<ProductService>(ProductService);
    languageService = module.get<LanguageService>(LanguageService);
  });

  it('should be defined', () => {
    expect(multilingualProductService).toBeDefined();
  });

  describe('createMultilingualProduct', () => {
    it('should create a new multilingual product', async () => {
      const payload: CreateMultilingualProductDto = {
        name: 'Book',
        description: 'Mathemetic Book',
        language: 'English',
      };

      const mockProduct = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: payload.name,
        description: payload.description,
      } as Product;
      const mockLanguage: Language = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: payload.language,
      } as Language;
      const mockMultilingualProduct = {
        productId: mockProduct.id,
        languageId: mockLanguage.id,
      } as MultilingualProduct;

      jest.spyOn(productService, 'findOne').mockResolvedValue(null);
      jest.spyOn(productService, 'create').mockResolvedValue(mockProduct);
      jest.spyOn(languageService, 'findOne').mockResolvedValue(null);
      jest.spyOn(languageService, 'create').mockResolvedValue(mockLanguage);
      jest
        .spyOn(multilingualProductRepository, 'create')
        .mockReturnValue(mockMultilingualProduct);
      jest
        .spyOn(multilingualProductRepository, 'save')
        .mockResolvedValue(mockMultilingualProduct);

      const result =
        await multilingualProductService.createMultilingualProduct(payload);

      expect(productService.findOne).toHaveBeenCalledWith({
        where: { name: payload.name },
      });
      expect(productService.create).toHaveBeenCalledWith({
        name: payload.name,
        description: payload.description,
      });
      expect(languageService.findOne).toHaveBeenCalledWith({
        where: { name: payload.language },
      });
      expect(languageService.create).toHaveBeenCalledWith({
        name: payload.language,
      });
      expect(multilingualProductRepository.create).toHaveBeenCalledWith({
        productId: mockProduct.id,
        languageId: mockLanguage.id,
      });
      expect(multilingualProductRepository.save).toHaveBeenCalledWith(
        mockMultilingualProduct,
      );
      expect(result).toEqual(mockMultilingualProduct);
    });

    it('should update existing product if found', async () => {
      const payload: CreateMultilingualProductDto = {
        name: 'Book',
        description: 'Mathemetic Book',
        language: 'English',
      };

      const mockProduct = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: payload.name,
        description: payload.description,
      } as Product;
      const mockLanguage: Language = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        name: payload.language,
      } as Language;
      const mockMultilingualProduct = {
        productId: mockProduct.id,
        languageId: mockLanguage.id,
      } as MultilingualProduct;

      jest.spyOn(productService, 'findOne').mockResolvedValue(mockProduct);
      jest.spyOn(productService, 'save').mockResolvedValue({
        ...mockProduct,
        description: payload.description,
      });
      jest.spyOn(languageService, 'findOne').mockResolvedValue(mockLanguage);
      jest
        .spyOn(multilingualProductRepository, 'create')
        .mockReturnValue(mockMultilingualProduct);
      jest
        .spyOn(multilingualProductRepository, 'save')
        .mockResolvedValue(mockMultilingualProduct);

      const result =
        await multilingualProductService.createMultilingualProduct(payload);

      expect(productService.findOne).toHaveBeenCalledWith({
        where: { name: payload.name },
      });
      expect(productService.save).toHaveBeenCalledWith({
        ...mockProduct,
        description: payload.description,
      });
      expect(languageService.findOne).toHaveBeenCalledWith({
        where: { name: payload.language },
      });
      expect(multilingualProductRepository.create).toHaveBeenCalledWith({
        productId: mockProduct.id,
        languageId: mockLanguage.id,
      });
      expect(multilingualProductRepository.save).toHaveBeenCalledWith(
        mockMultilingualProduct,
      );
      expect(result).toEqual(mockMultilingualProduct);
    });
  });
});
