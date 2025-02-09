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
import { ProductController } from '@/modules/product/presentation/product.controller';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProductController', () => {
  let productController: ProductController;

  const mockPageOptionsDto = { page: 1, take: 10 } as PageOptionsDto;
  const mockPageMetaDto = new PageMetaDto({
    pageOptionsDto: mockPageOptionsDto,
    itemCount: 0,
  });

  const mockProductService = {
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
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  it('should return paginated products', async () => {
    const pageOptionsDto = { skip: 0, take: 10 };
    const result =
      await productController.getProductWithPagination(pageOptionsDto);
    expect(result).toEqual(new PageDto([], mockPageMetaDto));
    expect(mockProductService.findWithPagination).toHaveBeenCalledWith(
      pageOptionsDto,
    );
  });

  it('should return all products', async () => {
    const result = await productController.find();
    expect(result).toEqual([]);
    expect(mockProductService.find).toHaveBeenCalled();
  });

  it('should return a product by id', async () => {
    const mockProduct = {
      id: 1,
      name: 'Book',
      description: 'Mathematic Book',
    } as Product;
    mockProductService.findOneById.mockResolvedValue(mockProduct);

    const result = await productController.findOneById(1);
    expect(result).toEqual(mockProduct);
    expect(mockProductService.findOneById).toHaveBeenCalled();
  });

  it('should throw NotFoundException if product is not found', async () => {
    mockProductService.findOneById.mockResolvedValue(null);

    await expect(productController.findOneById(99)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create a new product', async () => {
    const productDto: CreateProductDto = {
      name: 'Book',
      description: 'Mathematic Book',
    };
    const result = await productController.create(productDto);

    expect(result).toEqual({ id: 1, ...productDto });
    expect(mockProductService.create).toHaveBeenCalledWith(productDto);
  });

  it('should update a product', async () => {
    const updateDto: UpdateProductDto = { name: 'Updated Product' };
    await productController.update(1, updateDto);
    expect(mockProductService.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a product', async () => {
    await productController.delete(1);
    expect(mockProductService.delete).toHaveBeenCalledWith(1);
  });

  it('should soft delete a product', async () => {
    await productController.softDelte(1);
    expect(mockProductService.softDelte).toHaveBeenCalledWith(1);
  });

  it('should restore a product', async () => {
    await productController.restore(1);
    expect(mockProductService.restore).toHaveBeenCalledWith(1);
  });
});
