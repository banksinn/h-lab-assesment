import { PageDto, PageOptionsDto } from '@/common/dto/pagination.dto';
import {
  CreateLanguageDto,
  UpdateLanguageDto,
} from '@/modules/language/application/dto/language.dto';
import { Language } from '@/modules/language/domain/entities/language.entity';
import { LanguageService } from '@/modules/language/domain/service/language.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getLanguageWithPagination(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Language>> {
    return this.languageService.findWithPagination(pageOptionsDto);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async find(): Promise<Language[]> {
    return await this.languageService.find();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOneById(@Param('id') id: number): Promise<Language> {
    const result = await this.languageService.findOneById(id);
    if (!result) {
      throw new NotFoundException('Language Not Found');
    }
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateLanguageDto): Promise<Language> {
    return await this.languageService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateLanguageDto,
  ): Promise<void> {
    await this.languageService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    await this.languageService.delete(id);
  }

  @Delete(':id/soft-delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelte(@Param('id') id: number): Promise<void> {
    await this.languageService.softDelte(id);
  }

  @Patch(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id') id: number): Promise<void> {
    await this.languageService.restore(id);
  }
}
