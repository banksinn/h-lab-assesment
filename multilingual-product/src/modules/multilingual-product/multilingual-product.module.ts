import { LanguageModule } from '@/modules/language/language.module';
import { MultilingualProduct } from '@/modules/multilingual-product/domain/entities/multilingual-product.entity';
import { MultilingualProductService } from '@/modules/multilingual-product/domain/service/multilingual-product.service';
import { MultilingualProductController } from '@/modules/multilingual-product/presentation/multilingual-product.controller';
import { ProductModule } from '@/modules/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MultilingualProduct]),
    ProductModule,
    LanguageModule,
  ],
  controllers: [MultilingualProductController],
  providers: [MultilingualProductService],
})
export class MultilingualProductModule {}
