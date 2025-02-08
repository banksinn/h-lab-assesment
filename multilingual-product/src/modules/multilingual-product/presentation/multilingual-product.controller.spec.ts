import { MultilingualProductController } from '@/modules/multilingual-product/presentation/multilingual-product.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('MultilingualProductController', () => {
  let controller: MultilingualProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultilingualProductController],
    }).compile();

    controller = module.get<MultilingualProductController>(
      MultilingualProductController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
