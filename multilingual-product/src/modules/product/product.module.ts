import { Product } from '@/modules/product/domain/entities/product.entity';
import { ProductService } from '@/modules/product/domain/service/product.service';
import { ProductController } from '@/modules/product/presentation/product.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
