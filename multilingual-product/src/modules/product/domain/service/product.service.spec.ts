import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '@/common/dto/pagination.dto';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@/modules/product/application/dto/product.dto';
import { Product } from '@/modules/product/domain/entities/product.entity';
import { ProductService } from '@/modules/product/domain/service/product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
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
              .mockImplementation((product) =>
                Promise.resolve({ id: 1, ...product }),
              ),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
            softDelete: jest.fn().mockResolvedValue(undefined),
            restore: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('findWithPagination', () => {
    it('should return paginated results', async () => {
      const pageOptions = { page: 1, take: 10 } as PageOptionsDto;
      const mockPageMetaDto = new PageMetaDto({
        pageOptionsDto: pageOptions,
        itemCount: 0,
      });
      const result = await productService.findWithPagination(pageOptions);

      expect(result).toEqual(new PageDto([], mockPageMetaDto));
      expect(productRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return an array of products', async () => {
      const result = await productService.find();
      expect(result).toEqual([]);
      expect(productRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await productService.findOne({ where: { id: 1 } });
      expect(result).toBeNull();
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('findOneById', () => {
    it('should return a single product by ID', async () => {
      const result = await productService.findOneById(1);
      expect(result).toBeNull();
      expect(productRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create a product and return it', async () => {
      const dto: CreateProductDto = {
        name: 'Book',
        description: 'Mathematic Book',
      };
      const result = await productService.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(productRepository.save).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('should save an existing product and return it', async () => {
      const entity = {
        id: 1,
        name: 'Updated Product name',
        description: 'Updated Description',
      } as Product;
      const result = await productService.save(entity);
      expect(result).toEqual(entity);
      expect(productRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto: UpdateProductDto = { name: 'Updated Name' };
      await productService.update(1, dto);
      expect(productRepository.update).toHaveBeenCalledWith({ id: 1 }, dto);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      await productService.delete(1);
      expect(productRepository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('softDelete', () => {
    it('should soft delete a product', async () => {
      await productService.softDelte(1);
      expect(productRepository.softDelete).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('restore', () => {
    it('should restore a soft-deleted product', async () => {
      await productService.restore(1);
      expect(productRepository.restore).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
