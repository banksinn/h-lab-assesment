import { Language } from '@/modules/language/domain/entities/language.entity';
import { LanguageService } from '@/modules/language/domain/service/language.service';
import { LanguageController } from '@/modules/language/presentation/language.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
