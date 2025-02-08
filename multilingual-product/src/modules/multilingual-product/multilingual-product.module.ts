import { MultilingualProduct } from '@/modules/multilingual-product/domain/entities/multilingual-product.entity';
import { MultilingualProductService } from '@/modules/multilingual-product/domain/service/multilingual-product.service';
import { MultilingualProductController } from '@/modules/multilingual-product/presentation/multilingual-product.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MultilingualProduct])],
  controllers: [MultilingualProductController],
  providers: [MultilingualProductService],
})
export class MultilingualProductModule {}
