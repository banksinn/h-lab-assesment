import { MultilingualProductService } from '@/modules/multilingual-product/domain/service/multilingual-product.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MultilingualProductService', () => {
  let service: MultilingualProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultilingualProductService],
    }).compile();

    service = module.get<MultilingualProductService>(
      MultilingualProductService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
